'use strict';
const Schedule = require('../config/db.config').schedule;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];
const dbContext       = require('../config/db.config');

exports.create = async(scheduleData) => {
    let newScheduleList = await Schedule.bulkCreate(scheduleData);
    return cleanHelper.cleanEntityList(newScheduleList,attributesToBeRemoved)
}


exports.verifyAvailability = async(hSalonID, shiftStarts,shiftEnds) => {
   let availability = await dbContext.sequelize.query(
            'select weekdays.weekday from \
            schedules as sch \
            inner join weekdays on sch.weekday_id = weekdays.id \
            where sch.hairdressing_salon_id = :hSalonID and \
            extract(dow from date :shiftStarts) + 1  = sch.weekday_id \
            and :shiftStarts between sch.shift_starts and sch.shift_ends \
            and :shiftEnds between sch.shift_starts and sch.shift_ends;'
            ,
            {
                replacements: { 
                    hSalonID: hSalonID,
                    shiftStarts: shiftStarts,
                    shiftEnds: shiftEnds
                },
                type: dbContext.sequelize.QueryTypes.SELECT
            },
          
        );
    return availability ;
}