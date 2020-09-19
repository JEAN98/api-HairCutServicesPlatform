'use strict';
const Schedule = require('../config/db.config').schedule;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];
const dbContext       = require('../config/db.config');

exports.create = async(scheduleData) => {
    let newScheduleList = await Schedule.bulkCreate(scheduleData);
    return cleanHelper.cleanEntityList(newScheduleList,attributesToBeRemoved)
}

exports.verifyAvailability = async(workerID, shiftStarts,shiftEnds) => {
   let availability = await dbContext.sequelize.query(
            'select weekdays.weekday from \
            schedules as sch \
            inner join weekdays on sch.weekday_id = weekdays.id \
            left join workers on sch.hairdressing_salon_id = workers.hairdressing_salon_id \
            where workers.id = :workerID  and \
            extract(dow from date :shiftStarts)   = weekdays.day_number \
            and :shiftStarts between sch.shift_starts and sch.shift_ends \
            and :shiftEnds between sch.shift_starts and sch.shift_ends;',
            {
                replacements: { 
                    workerID: workerID,
                    shiftStarts: shiftStarts,
                    shiftEnds: shiftEnds
                },
                type: dbContext.sequelize.QueryTypes.SELECT
            },
          
        );
    return availability ;
}