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
    console.log(hSScheduleByWokerOnADate);

    let timeSheetsAvailableList = [];
    let lastTimeRequested = getHourMin(hSScheduleByWokerOnADate.shiftStarts);
    appoimentList.forEach(appoiment => {
        let currentTime = getHourMin(appoiment.shiftStarts);
        let substracionResult = currentTime - lastTimeRequested;
        if( substracionResult > 0)
        {
            console.log(substracionResult,'subStractionResult')
            //console.log(getDateTime(lastTimeRequested), getDateTime(lastTimeRequested + substracionResult))
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
        //  let appoimentStarts =  getDateTime(appoiment.shiftStarts);
    });
    let lastIndex = appoimentList.length - 1;

    let finalTimeSheetAvialables = calculateFinalTime(hSScheduleByWokerOnADate.shiftEnds,appoimentList[lastIndex],timeSheetsAvailableList);
    console.log(finalTimeSheetAvialables);
    return appoimentList;
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
    let minute = date.minute;
    if( minute.toString().length == 1)
        minute = '0'+date.minute.toString();
    
    return date.hour + ':' + minute;
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