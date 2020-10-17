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
    if(hSScheduleByWokerOnADate === undefined)
    {
        throw new BadRequest('The date selected does not match with an exsiting schedule or the worker selected does not exist')
    }

    let timeSheetsAvailableList = [];
    let lastTimeRequested = getHourMin(hSScheduleByWokerOnADate.shiftStarts);
    appoimentList.forEach(appoiment => {
        let currentTime = getHourMin(appoiment.shiftStarts);
        let substracionResult = currentTime - lastTimeRequested;
        if( substracionResult > 0)
        {
            let from = getDateTime(lastTimeRequested);
            let to =  getDateTime(lastTimeRequested + substracionResult);
            timeSheetsAvailableList.push(
                {
                    from:setTimeFormat(from),
                    to:setTimeFormat(to)
                }
            );
        }
        lastTimeRequested = getHourMin(appoiment.shiftEnds);
    });

    if(appoimentList.length - 1 >= 0)
    {
        let lastIndex = appoimentList.length - 1;
        timeSheetsAvailableList = calculateFinalTime(hSScheduleByWokerOnADate.shiftEnds,appoimentList[lastIndex],timeSheetsAvailableList);
    }
    console.log(appoimentList,'List of Shift Appoiments Created');
    console.log(timeSheetsAvailableList,'timeSheetsAvailableList');
    return timeSheetsAvailableList;
}

calculateFinalTime = (shiftEnds, lastAppoiment,timeSheetsAvailableList) => {
    let shiftEndsTime = getHourMin(shiftEnds);
    let appoimentEnds = getHourMin(lastAppoiment.shiftEnds);
    let substracionResult = shiftEndsTime - appoimentEnds;
    if( substracionResult > 0)
    {
        let from = getDateTime(appoimentEnds);
        let to =  getDateTime(shiftEndsTime);
        timeSheetsAvailableList.push(
            {
                from:setTimeFormat(from),
                to:setTimeFormat(to)
            }
        );
    }
    return timeSheetsAvailableList;
}


setTimeFormat = (date) => {
    let minute = date.minute.toString();
    let hour = date.hour.toString();
    
    if( minute.length == 1)
        minute = '0'+date.minute.toString();

    if( hour.length == 1)
        hour = '0'+date.hour.toString();

    return hour + ':' + minute;
}

getDateTime = (newTime) => {
    var date = DateTime.utc(2020, 01, 01,0, 0, 0);
    return date.plus({hours: newTime})
}

getHourMin = (timeSelected) => {
    let timeWithOutMilleSeconds = (timeSelected.split('.'))[0]
    let [hours, minutes, seconds] = timeWithOutMilleSeconds.split(':'); 
    
    return parseFloat(hours) + ( parseFloat( minutes) / 60)
}