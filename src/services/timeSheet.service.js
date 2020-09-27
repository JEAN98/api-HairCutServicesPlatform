const {BadRequest, GeneralError} = require('../middleware/error/error');
const timeSheet = require('../repositories/timeSheet.repository');
const scheduleRepository = require('../repositories/schedule.repository');
const {areValidDates} = require('../utils/dateTime.helper');
const { DateTime,Duration } = require("luxon");
const { getTime } = require('date-fns');


exports.getTimeSheetsAvailableByWorker = async(reqQuery) => {
    let dateSelected = DateTime.fromFormat(reqQuery.date,"yyyy-MM-dd"); 
    areValidDates([dateSelected]);
    let result = await calculateTimeSheetsAvailable(reqQuery.workerID,reqQuery.date);
   

    return result;
}

calculateTimeSheetsAvailable = async(workerID,date) => {
    //This list includes also the lunch_starts and lunch_ends
    let appoimentList = await timeSheet.getAppointmentListByWorkerOnADate(workerID,date);   
    let hSScheduleByWokerOnADate = (await timeSheet.getHSScheduleByWokerOnADate(workerID,date))[0];
    let timeSheetsAvailableList = [];

    appoimentList.forEach(appoiment => {


    });
    getDateTime("09:05:37.345597");

    return appoimentList;
}


getDateTime = (timeSelected) => {
    let hourMinSec = getHourMinSec(timeSelected);
    var date = DateTime.utc(2020, 01, 01, hourMinSec.hours, hourMinSec.minutes, hourMinSec.seconds);
    return date;    
}

getHourMinSec = (timeSelected) => {
    let timeWithOutMilleSeconds = (timeSelected.split('.'))[0]
    let [hours, minutes, seconds] = timeWithOutMilleSeconds.split(':'); 
    return {
        hours:parseInt(hours),
        minutes:parseInt( minutes),
        seconds:parseInt(seconds)
    }
}