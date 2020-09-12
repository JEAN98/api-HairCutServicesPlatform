'use strict';
const WeekDay = require('../config/db.config').weekDay;

exports.findAll = async() => {
    let weekDayList = await WeekDay.findAll();
    return cleanListEntity(weekDayList);
}


const cleanListEntity = (weekDayList) => {
    if(weekDayList.length > 0 )
    {
        for (let index = 0; index < weekDayList.length; index++) {
            weekDayList[index] = cleanEntity(weekDayList[index] );
        }
    }
    return weekDayList;
}

const cleanEntity = (weekDay) => {
    weekDay = weekDay.toJSON();
    delete weekDay.updatedAt;
    delete weekDay.createdAt;

    return weekDay;
}