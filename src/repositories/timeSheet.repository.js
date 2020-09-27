const dbContext             = require('../config/db.config');
const Appoiment             = dbContext.appoiment;
const {setCamelCaseStandardInList} = require('../utils/cleanEntity.helper');

exports.getAppointmentListByWorkerOnADate = async(workerID, date) => {
    //This list includes also the lunch_starts and lunch_ends
    let appoimentList = await dbContext.sequelize.query(
        ' ( \
            Select hs.lunch_starts as shift_starts , hs.lunch_ends as shift_ends \
            from hairdressing_salons as hs \
            left join workers as wk on hs.id = wk.hairdressing_salon_id \
            where wk.id = :workerID \
        ) \
        UNION  \
        ( \
            SELECT cast(ap.shift_starts::timestamp as time),cast(ap.shift_ends::timestamp as time) \
            from appoiments as ap \
            left join workers as wk on wk.id = ap.worker_id \
            left join hairdressing_salons as hs on hs.id = wk.hairdressing_salon_id \
            where wk.id = :workerID \
            and Date(ap.shift_starts) = :date \
            order by ap.shift_starts asc \
        )   order by shift_starts ASC' , 
            {
                replacements: { 
                    workerID: workerID,
                    date: date
                },
                type: dbContext.sequelize.QueryTypes.SELECT 
            }
    );
    return setCamelCaseStandardInList(appoimentList);
}


 exports.getHSScheduleByWokerOnADate = async(workerID,dateSelected) => {
    let schedule = await dbContext.sequelize.query(
        'select wd.weekday,sch.shift_starts,sch.shift_ends, hs.lunch_starts,hs.lunch_ends \
            from schedules as sch  \
            left join weekdays as wd on sch.weekday_id = wd.id \
            left join hairdressing_salons as hs on hs.id = sch.hairdressing_salon_id \
            left join workers as wk on wk.hairdressing_salon_id = sch.hairdressing_salon_id \
            where wk.id = :workerID  and  \
            extract(dow from date :dateSelected) = wd.day_number' , 
            {
                replacements: { 
                    workerID: workerID,
                    dateSelected: dateSelected
                },
                type: dbContext.sequelize.QueryTypes.SELECT 
            }
      );

    return setCamelCaseStandardInList(schedule);
}