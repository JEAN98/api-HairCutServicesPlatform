const {BadRequest, GeneralError} = require('../middleware/error/error');
const timeSheet = require('../repositories/timeSheet.repository');
const scheduleRepository = require('../repositories/schedule.repository');
const {areValidDates} = require('../utils/dateTime.helper');
const { DateTime } = require("luxon");
const { getTime } = require('date-fns');


exports.getTimeSheetsAvailableByWorker = async(reqQuery) => {
    let dateSelected = DateTime.fromFormat(reqQuery.date,"yyyy-MM-dd"); 
    areValidDates([dateSelected]);
    let result = await calculateTimeSheetsAvailable(reqQuery.workerID,reqQuery.date);
   

    return result;
}

calculateTimeSheetsAvailable = async(workerID,date) => {
    let appoimentList = await timeSheet.getAppointmentListByWorkerOnADate(workerID,date);
    let hSScheduleByWokerOnADate = (await timeSheet.getHSScheduleByWokerOnADate(workerID,date))[0];
    let timeSheetsAvailableList = [];
    //console.log(getHourMinSec(hSScheduleByWokerOnADate.shiftStarts));
    appoimentList.forEach(appoiment => {

    });

    return appoimentList;
}


getHourMinSec = (timeSelected) => {
    let timeWithOutMilleSeconds = (timeSelected.split('.'))[0]
    let [hours, minutes, seconds] = timeWithOutMilleSeconds.split(':'); 
    return {
        hours:hours,
        minutes: minutes,
        seconds: seconds
    }
}