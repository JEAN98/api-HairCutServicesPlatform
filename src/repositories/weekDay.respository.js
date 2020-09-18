'use strict';
const WeekDay = require('../config/db.config').weekDay;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];



exports.findAll = async() => {
    let weekDayList = await WeekDay.findAll();
    return cleanHelper.cleanEntityList(weekDayList,attributesToBeRemoved);
}

