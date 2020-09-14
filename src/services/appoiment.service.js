const scheduleRepository = require('../repositories/schedule.repository');
const haidresserServiceRepository = require('../repositories/hairdresserService.repository');
const {BadRequest} = require('../middleware/error/error');

exports.createAppoiment = async(reqBody) => {
    try {
       let result = await areTheServicesActiveAndExist(reqBody.servicesList,reqBody.workerID)
       return result;
    } catch (error) {
        console.log(error)
        throw new BadRequest(error);
    }
}


//In order to verify the services requested are active and they exist
const areTheServicesActiveAndExist = async(servicesList,workerID) => {
    let servicesActiveList = await haidresserServiceRepository.getServicesListRequested(servicesList,workerID);
    if(servicesActiveList.length != servicesList.length)
    {
        throw new BadRequest('Some of the services requested does not exist or they aren\'t active ' );
    }
    return;
}

//In order to review the appoiment matches with schedule of the hairdressing salon
const verifyAvailabityAccordingToSchedule = async(workerID,shiftStarts,shiftEnds) => {
    let availabityList = await scheduleRepository.verifyAvailability(workerID,shiftStarts,shiftEnds);
    if(availabityList.length > 0)
    {
        return {message: 'Available to work' };
    }
     throw new BadRequest('The time selected does not match with the schedule of HairdressingSalon. Please refer to a new time');
}


//In order to get the total time and cost based on the services requested by the client
const getTotalTimeAndCost = async(servicesList) => {
    let totalTimeAndCost = await haidresserServiceRepository.getTotalCostAndTimeByServicesResquested(servicesList);
    return totalTimeAndCost;
 };