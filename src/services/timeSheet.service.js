const {BadRequest, GeneralError} = require('../middleware/error/error');
const appoimentRepository = require('../repositories/appoiment.repository');
const scheduleRepository = require('../repositories/schedule.repository');


exports.getTimeSheetsAvailableByWorker = async(workerID,date) => {
    let result = await appoimentRepository.getAppointmentListByWorkerOnADate(workerID,date);
}