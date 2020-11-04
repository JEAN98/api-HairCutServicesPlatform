const scheduleRepository = require('../repositories/schedule.repository');
const {setCamelCaseStandardInList} = require('../utils/cleanEntity.helper');
const haidresserServiceRepository = require('../repositories/hairdresserService.repository');
const appoimentRepository = require('../repositories/appoiment.repository');
const appoimentServiceRepository =  require('../repositories/appoimentService.repository');
const {BadRequest, GeneralError} = require('../middleware/error/error');
const  { format } = require('date-fns');
const { DateTime } = require("luxon");
const {areValidDates} = require('../utils/dateTime.helper');
const {cleanEntity} = require('../utils/cleanEntity.helper');


exports.getAppoimentListBetweenDates = async(reqQuery) => {
    if(reqQuery.dateFrom !== undefined && reqQuery.dateTo  !== undefined && reqQuery.hairdressingSalonID)
    {
        let firstDate = DateTime.fromFormat(reqQuery.dateFrom,"yyyy-MM-dd HH:mm:ss"); 
        let secondDate = DateTime.fromFormat(reqQuery.dateTo,"yyyy-MM-dd HH:mm:ss");

        areValidDates([firstDate, secondDate])

        if(firstDate > secondDate )
        {
            //throw new BadRequest('The dateFrom should be lower than dateTo');
            throw new BadRequest('La fecha de inicio debe ser menor a la final final');
        }
            
        
        let appoimentList = await appoimentRepository.getAppoimentListBetweenDates(reqQuery.hairdressingSalonID,
                                                                                reqQuery.dateFrom,reqQuery.dateTo);
        appoimentList =  setCamelCaseStandardInList(appoimentList);

        return  setDateFormatForHSResult(appoimentList);
    } 
    //throw new BadRequest('The dateFrom or dateTo are undefined');
    throw new BadRequest('Alguna de las fechas no se encuentra definida');
}

const setDateFormatForHSResult = (appoimentList) => {
    for (let index = 0; index < appoimentList.length; index++) {
        console.log( appoimentList[index].shiftStarts );
        appoimentList[index].shiftStarts = applyDateFormat(new Date(appoimentList[index].shiftStarts));
        appoimentList[index].shiftEnds = applyDateFormat(new Date(  appoimentList[index].shiftEnds));
    }
    return appoimentList;
}


exports.getAppoimentsByClient = async(clientID)=> {
    let appoimentsList = await appoimentRepository.getAppoimentsByClient(clientID);
    console.log(appoimentsList, 'AppoimentListByClient');
    for (let index = 0; index < appoimentsList.length; index++) {

        //FIXME: This could be tackle by one single query
        appoimentsList[index] = await createAppoimentBodyResponse(appoimentsList[index]);        
    }

    console.log(appoimentsList,'AppoimentListByClientResponse');
    return appoimentsList;
}


exports.createAppoiment = async(reqQuery) => {
    
        let servicesList = reqQuery.servicesList;
        let workerID = reqQuery.workerID;
        let shiftStarts = reqQuery.shiftStarts;
        let clientID = reqQuery.clientID; 

      
        verifyTheShiftStartsOnFuture(shiftStarts);

        await areTheServicesActiveAndExist(servicesList,workerID);

        let totalList =  await getTotalTimeAndCost(servicesList);
        let shiftEnds = calculateShiftEnds(shiftStarts,totalList.total_time);

        await verifyAvailabityAccordingToSchedule(workerID,shiftStarts,shiftEnds);

        await verifyNewAppointmentDoesNotAffectTheLunchTime(workerID,shiftStarts,shiftEnds);

        await verifyNewAppointmentDoesNotAffectExistingOnes(workerID,shiftStarts,shiftEnds);
          
        let newAppoiment = {
            servicesList:servicesList,
            workerID: workerID,
            shiftStarts: shiftStarts,
            shiftEnds: shiftEnds,
            clientID: clientID,
            totalTime: totalList.total_time,
            totalCost: totalList.total_cost
        };
        let appoimentCreated = await appoimentRepository.create(newAppoiment);
       
        await createAppoimentServices(servicesList,appoimentCreated.id);
        
        return createAppoimentBodyResponse(appoimentCreated);
}



const createAppoimentServices = async(servicesList,appoimentID) => {
    let newList = [];
    for (let index = 0; index < servicesList.length; index++) {
        let appoimentService = {
            appoimentID: appoimentID,
            serviceID: servicesList[index],
        };
        newList.push(appoimentService);     
    }
    
    if(newList.length == 0)
    {
        //throw new BadRequest("The services list is empty and it cannot be used to create entries AppoimentServices");
        throw new BadRequest("La lista de servicios está vacía y no puede ser utilizada para los servicios de la cita");
    }
    else{
        await appoimentServiceRepository.create(newList);
    }
}

/*
In order to verify the new appoiment has at least 15 min as anticipation to be created
Level 0
*/
const verifyTheShiftStartsOnFuture =  (shiftStarts) => {
    var currentDateTime = DateTime.local().setZone("utc-6");

    shiftStarts = DateTime.fromFormat(shiftStarts,"yyyy-MM-dd HH:mm:ss");
    areValidDates([shiftStarts]);

    if(shiftStarts < currentDateTime)
    {
        //throw new BadRequest("The shiftStarts cannot be a past time!")
        throw new BadRequest("La hora de inicio de la cita no puede ser en pasado")
    }

    currentDateTime = currentDateTime.plus({minute: 15})
    //console.log(currentDateTime)
    if(shiftStarts < currentDateTime)
    {
        //throw new BadRequest("An appointment needs to be scheduled with 15 min as anticipation!")
        throw new BadRequest("Una cita debe ser programada mínimo con 15 min de anticipación");
    }
}

/*
In order to verify the services requested are active and they exist 
Level 1 
*/

const areTheServicesActiveAndExist = async(servicesList,workerID) => {
    let servicesActiveList = await haidresserServiceRepository.getServicesListRequested(servicesList,workerID);
    if(servicesActiveList.length != servicesList.length)
    {
        //throw new BadRequest('Some of the services requested does not exist or they aren\'t active for HairdressingSalon' );
        throw new BadRequest('Algunos de los servicios solicitados no existen o están inactivos');
    }
    return;
}


/*
In order to get the total time and cost based on the services requested by the client
Level 2
 */
const getTotalTimeAndCost = async(servicesList) => {
    let totalTimeAndCostList = await haidresserServiceRepository.getTotalCostAndTimeByServicesResquested(servicesList);
    if(totalTimeAndCostList.length == 0 )
    {
        /*
        throw new BadRequest('Not able to calculate the total time and cost, since \
        some of the services requested does not exist or they aren\'t active for the HairdressingSalon selected' );*/
        throw new BadRequest('No se pudo calcular el tiempo total y el costo, debido a que algunos de los servicios solicitados no existen o no están activos' );
    }
    return totalTimeAndCostList[0];
 };

/*
Calculate total shiftEnds
Level 3
*/
const calculateShiftEnds = (shiftStarts,totalTimeMinutes) => {

    var shiftEnds = new Date(shiftStarts);
    //console.log(shiftEnds,totalTimeMinutes)
    shiftEnds.setMinutes(shiftEnds.getMinutes() + parseInt(totalTimeMinutes));
    var string_date = format(shiftEnds, 'yyyy-MM-dd HH:mm:ss').toString();
    console.log(string_date)
    return string_date;
};

 /*
In order to review the appoiment matches with schedule of the hairdressing salon
Level 4
*/
const verifyAvailabityAccordingToSchedule = async(workerID,shiftStarts,shiftEnds) => {
    let availabityList = await scheduleRepository.verifyAvailability(workerID,shiftStarts,shiftEnds);
    if(availabityList.length > 0)
    {
        return;
    }
     //throw new BadRequest('The time requested does not match with the schedule of HairdressingSalon. Please refer to a new time');
     throw new BadRequest('La fecha o tiempo solicitado no coinciden con alguno de los horarios del establecimiento. Por favor intentarlo con alguna otra fecha u horario');
}


/*
In order to verify that the current appoiment  does not affect lunch time
Level 5 
*/
const verifyNewAppointmentDoesNotAffectTheLunchTime = async(workerID,shiftStarts,shiftEnds) => 
{
    let list = await appoimentRepository.verifyConfilctWithLunch(workerID,shiftStarts,shiftEnds);
    if(list.length > 0)
    {
        throw new BadRequest('El total tiempo solicitado coincide con el horario del almuerzo, por favor intentarlo con otra hora');
    }
}

/*
In order to verify that the current appoiment  does not affect existing appoiments
Level 6
*/
const verifyNewAppointmentDoesNotAffectExistingOnes = async(workerID,shiftStarts,shiftEnds) => {
    let matchList = await appoimentRepository.verifyAppoimentAvailability(workerID,shiftStarts,shiftEnds);
    if(matchList.length > 0)
    {
       // throw new BadRequest('The total time requested matches with an existing appoiment. Please refer to a new time or a new date');
       throw new BadRequest('El total de tiempo solicitado coincide con una cita existente. Por favor intentarlo con un horario o fecha diferente');
    }
}


/*
Apply Custom date Format
 Level 7
*/
const createAppoimentBodyResponse = async (newAppoiment) => {
    newAppoiment = await setAppoimentEstablishmentData(newAppoiment);

    newAppoiment.shiftStarts = applyDateFormat(newAppoiment.shiftStarts);
    newAppoiment.shiftEnds = applyDateFormat(newAppoiment.shiftEnds);
    
    newAppoiment.servicesList = await getAppoimentServicesNames(newAppoiment.id);
    
    return newAppoiment;
}


/*
 Apply custom date format
*/
const applyDateFormat = (date) =>{
    var dateFormated = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd HH:mm:ss');
    //console.log(dateFormated,'DateFormated');
    return dateFormated;
}

/*
Set names to hairdresssing salons and worker
*/
const setAppoimentEstablishmentData = async(appoimentCreated) => {
    let appoimentEstablishmentData = await appoimentRepository.getAppoimentEstablishmentData(appoimentCreated.workerID);
    //console.log(appoimentEstablishmentData, 'NameList');
    if(appoimentEstablishmentData.length == 0)
    {
        throw new BadRequest('Los nombres de la babería y el establecimiento no se pudieron establecer, por favor intentarlo de nuevo');
    }
   

    appoimentCreated.appoimentEstablishmentData = {
        hsName: appoimentEstablishmentData[0].hairdressing_salon_name,
        workerName: appoimentEstablishmentData[0].worker_name,
        latitud:appoimentEstablishmentData[0].latitud,
        longitud: appoimentEstablishmentData[0].longitud,
        hairdressingSalonID: appoimentEstablishmentData[0].id
    }

    return appoimentCreated;
}


/*
Read the services name selected for the new appoiment
*/
const getAppoimentServicesNames = async(appoimentID)=>{
    let servicesNameList = [];
    const appoimentServicesList = await appoimentServiceRepository.getAppoimentServiceList(appoimentID);
    //console.log(appoimentServicesList, 'appoimentServicesList');
    if(appoimentServicesList.length == 0)
    {
        throw new BadRequest('Se presentaron problemas a la hora de leer los nombres de los servicios, por favor intentarlo de nuevo');
    }

    for (let index = 0; index < appoimentServicesList.length; index++) {
        servicesNameList.push(appoimentServicesList[index].title);
    }
    //console.log(servicesNameList, 'servicesNameList created');
    return servicesNameList;
}

exports.deleteAppoiment = async(appoimentID)  => {
    let appimentServicesDeletedResult = await appoimentServiceRepository.delete(appoimentID);
    let appimentDeletedResult = await appoimentRepository.delete(appoimentID);
    if(appimentDeletedResult == 0)
    {
        console.log(appimentServicesDeletedResult, '  appimentServicesDeletedResult');
        console.log(appimentDeletedResult, '  appimentDeletedResult');
        throw new BadRequest('No se pudo elimar la cita por favor intentarlo de nuevo. Puede que la cita selecionada también ya haya sido eliminada o el id no existe');
    }
}