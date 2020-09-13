'use strict';
const Schedule = require('../config/db.config').schedule;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];


exports.create = async(scheduleData) => {
    let newScheduleList = await Schedule.bulkCreate(scheduleData);
    return cleanHelper.cleanEntityList(newScheduleList,attributesToBeRemoved)
}