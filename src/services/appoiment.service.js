const scheduleRepository = require('../repositories/schedule.repository');
const haidresserServiceRepository = require('../repositories/hairdresserService.repository');
const {BadRequest} = require('../middleware/error/error');
const  { format } = require('date-fns') 

exports.createAppoiment = async(reqBody) => {
    try {
        let servicesList = reqBody.servicesList;
        let workerID = reqBody.workerID;
        let shiftStarts = reqBody.shiftStarts;

        await areTheServicesActiveAndExist(servicesList,workerID);

        let totalList =  await getTotalTimeAndCost(servicesList);
        let shiftEnds = calculateShiftEnds(shiftStarts,totalList.total_time);

       await verifyAvailabityAccordingToSchedule(workerID,shiftStarts,shiftEnds);

       return {result:"ok"};
    } catch (error) {
        console.log(error)
        throw new BadRequest(error);
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
        some of the services requested does not exist or they aren\'t active for HairdressingSalon' );
    }
    return totalTimeAndCostList[0];
 };

/*
Calculate total shiftEnds
Level 4
*/
const calculateShiftEnds = (shiftStarts,totalTimeMinutes) => {
    var shiftEnds = new Date(shiftStarts);
    console.log(shiftEnds,totalTimeMinutes)
    shiftEnds.setMinutes(shiftEnds.getMinutes() + parseInt(totalTimeMinutes))
    var string_date = format(shiftEnds, 'yyyy-MM-dd hh:mm:ss').toString()
    return string_date;
};

 /*
In order to review the appoiment matches with schedule of the hairdressing salon
Level 5
*/
const verifyAvailabityAccordingToSchedule = async(workerID,shiftStarts,shiftEnds) => {
    let availabityList = await scheduleRepository.verifyAvailability(workerID,shiftStarts,shiftEnds);
    if(availabityList.length > 0)
    {
        return {message: 'Available to work' };
    }
     throw new BadRequest('The total time requested does not match with the schedule of HairdressingSalon. Please refer to a new time');
}
