'use strict';
const Schedule = require('../config/db.config').schedule;


exports.create = async(scheduleData) => {
    let newSchedule = await Schedule.bulkCreate(scheduleData);
    return newSchedule
}


const cleanScheduleEntity = (Schedule) => {
    Schedule = Schedule.toJSON();
    delete Schedule.updatedAt;
    delete Schedule.createdAt;

    return Schedule;
}


