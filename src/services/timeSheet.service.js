const {BadRequest, GeneralError} = require('../middleware/error/error');
const appoimentRepository = require('../repositories/appoiment.repository');
const scheduleRepository = require('../repositories/schedule.repository');


exports.getTimeSheetsAvailableByWorker = async(workerID,date) => {
    if(workerID != undefined && date != undefined)
    {
        let result = await appoimentRepository.getAppointmentListByWorkerOnADate(workerID,date);
    }
    else{
        throw new BadRequest('Any of the value is not defined');
    }
}