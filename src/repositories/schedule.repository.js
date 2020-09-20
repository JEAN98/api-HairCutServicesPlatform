'use strict';
const Schedule = require('../config/db.config').schedule;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt','weekday_id','hairdressing_salon_id'];
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


exports.getByHairdressingSalon = async(hairdressingSalonID) => {
    let scheduleList = await Schedule.findAll({
        where:{
            hairdressing_salon_id:hairdressingSalonID,
        },
        include: [{
            model: dbContext.weekDay,
        }]
    });
    scheduleList = setWeekdayToScheduleList(scheduleList);

    return cleanHelper.cleanEntityList(scheduleList,attributesToBeRemoved);
}

function setWeekdayToScheduleList(scheduleList) {
    for (let index = 0; index < scheduleList.length; index++) {
        let schedule = scheduleList[index].toJSON();
        let weekDay = schedule.weekday.weekday;
        delete schedule.weekday;

        schedule.weekDay = weekDay;
        scheduleList[index] =  schedule;
    }
    return scheduleList;
}