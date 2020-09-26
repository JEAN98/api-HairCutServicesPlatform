const scheduleRepository = require('../repositories/schedule.repository');
const {setCamelCaseStandardInList} = require('../utils/cleanEntity.helper');
const haidresserServiceRepository = require('../repositories/hairdresserService.repository');
const appoimentRepository = require('../repositories/appoiment.repository');
const appoimentServiceRepository =  require('../repositories/appoimentService.repository');
const {BadRequest, GeneralError} = require('../middleware/error/error');
const  { format } = require('date-fns');
const { DateTime } = require("luxon");
const {cleanEntity} = require('../utils/cleanEntity.helper');


exports.getAppoimentListBetweenDates = async(reqBody) => {
    if(reqBody.dateFrom !== undefined && reqBody.dateTo  !== undefined && reqBody.hairdressingSalonID)
    {
        let firstDate = DateTime.fromFormat(reqBody.dateFrom,"yyyy-MM-dd HH:mm:ss"); //TODO: INVALID DATES MUST BE HANDLE, LIKE FEBRAURY 31
        let secondDate = DateTime.fromFormat(reqBody.dateTo,"yyyy-MM-dd HH:mm:ss");
        
        if(firstDate > secondDate )
        {
            throw new BadRequest('The dateFrom should be lower than dateTo');
        }

        let appoimentList = await appoimentRepository.getAppoimentListBetweenDates(reqBody.hairdressingSalonID,
                                                                                reqBody.dateFrom,reqBody.dateTo);
        return setCamelCaseStandardInList(appoimentList);
    } 
    throw new BadRequest('The dateFrom or dateTo are undefined');
}

exports.createAppoiment = async(reqBody) => {
    
        let servicesList = reqBody.servicesList;
        let workerID = reqBody.workerID;
        let shiftStarts = reqBody.shiftStarts;
        let clientID = reqBody.clientID; 

        verifyTheShiftStartsOnFuture(shiftStarts);

        await areTheServicesActiveAndExist(servicesList,workerID);

        let totalList =  await getTotalTimeAndCost(servicesList);
        let shiftEnds = calculateShiftEnds(shiftStarts,totalList.total_time);

        await verifyAvailabityAccordingToSchedule(workerID,shiftStarts,shiftEnds);

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
       // console.log(appoimentCreated)
        await createAppoimentServices(servicesList,appoimentCreated.id);

        return appoimentCreated;
    
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
        throw new BadRequest("The services list is empty and it cannot be used to create entries AppoimentServices");
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
    if(shiftStarts < currentDateTime)
    {
        throw new BadRequest("The shiftStarts cannot be a past time!")
    }

    currentDateTime = currentDateTime.plus({minute: 15})
    //console.log(currentDateTime)
    if(shiftStarts < currentDateTime)
    {
        throw new BadRequest("An appointment needs to be scheduled with 15 min as anticipation!")
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
        throw new BadRequest('Some of the services requested does not exist or they aren\'t active for HairdressingSalon' );
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
        throw new BadRequest('Not able to calculate the total time and cost, since \
        some of the services requested does not exist or they aren\'t active for the HairdressingSalon selected' );
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
     throw new BadRequest('The time requested does not match with the schedule of HairdressingSalon. Please refer to a new time');
}


/*
In order to verify that the current appoiment  does not affect existing appoiments
Level 5 
*/
const verifyNewAppointmentDoesNotAffectExistingOnes = async(workerID,shiftStarts,shiftEnds) => {
    let matchList = await appoimentRepository.verifyAppoimentAvailability(workerID,shiftStarts,shiftEnds);
    if(matchList.length > 0)
    {
        throw new BadRequest('The total time requested matches with an existing appoiment. Please refer to a new time or a new date');
    }
}