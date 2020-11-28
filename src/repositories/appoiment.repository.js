'use strict';
const { response } = require('express');
const dbContext             = require('../config/db.config');
const Appoiment             = dbContext.appoiment;
const cleanHelper           = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = [,'createdAt','updatedAt','client_id','worker_id'];

exports.create = async(appoiment) => {
    //appoiment.shiftStarts = '2017-03-11T11:30:00';
    console.log(appoiment,'Appoiment object before to be stored');
    let newAppoiment = await Appoiment.create(appoiment);
    return cleanHelper.cleanEntity(newAppoiment,attributesToBeRemoved);
}

exports.getAppoimentListBetweenDates = async(hairdressingSalonID,dateFrom,dateTo) => {
 
    let appoimentList = await dbContext.sequelize.query(
            'select ap.id as appoiment_id,ap.shift_starts,ap.shift_ends, \
            ap.total_time,ap.total_cost, \
            (wk.first_name||\' \'||wk.last_name) as worker_name, wk.id as worker_id, \
            (cl.first_name||\' \'||cl.last_name) as client_name, cl.id as client_id \
            from appoiments as ap	\
            left join clients as cl on ap.client_id = cl.id \
            left join workers as wk on wk.id = ap.worker_id \
            left join hairdressing_salons as hs on hs.id = wk.hairdressing_salon_id \
            where hs.id = :hairdressingSalonID and \
            shift_starts between :dateFrom and :dateTo \
            order by \
	        case when date(ap.shift_starts) >= CURRENT_DATE then ap.shift_starts END asc, \
	        case when date(ap.shift_starts) < CURRENT_DATE then ap.shift_starts END desc' , 
            {
                replacements: { 
                    hairdressingSalonID: hairdressingSalonID,
                    dateFrom: dateFrom,
                    dateTo: dateTo
                },
                type: dbContext.sequelize.QueryTypes.SELECT 
            }
         // pass true here if you have any mapped fields
   
      );

    return appoimentList;
}

exports.getAppoimentEstablishmentData = async(workerID) => 
{
    let names = await dbContext.sequelize.query(
        'select hs.name as hairdressing_salon_name , hs.latitud, hs.longitud, hs.id, \
        CONCAT(wk.first_name,\' \',wk.last_name) as worker_name \
        from  hairdressing_salons as hs \
        inner join workers as wk on wk.hairdressing_salon_id = hs.id \
        where wk.id = :workerID '  ,
        {
            replacements: { 
                workerID: workerID,
            },
            type: dbContext.sequelize.QueryTypes.SELECT
        },
    );
    return names;
}

exports.verifyConfilctWithLunch = async(workerID, shiftStarts,shiftEnds) => {
    let conflictLunch = await dbContext.sequelize.query('Select  * \
        from \
        ( \
            select * from \
            hairdressing_salons as hs\
            inner join workers as wk on wk.hairdressing_salon_id = hs.id \
            where wk.id = :workerID \
        ) as auxTable \
        where \
        :shiftStarts >= auxTable.lunch_starts and  \
        :shiftStarts < auxTable.lunch_ends \
                    or :shiftEnds   < auxTable.lunch_starts and \
                    :shiftEnds  >= auxTable.lunch_ends \
                    or auxTable.lunch_starts >=  :shiftStarts and   \
                    auxTable.lunch_starts < :shiftEnds  \
                    or auxTable.lunch_ends <  :shiftStarts and   \
                    auxTable.lunch_ends >= :shiftEnds' ,
            {
                replacements: { 
                    workerID: workerID,
                    shiftStarts: shiftStarts,
                    shiftEnds: shiftEnds
                },
                type: dbContext.sequelize.QueryTypes.SELECT
            },
        );
    return conflictLunch;
} 


exports.delete = async(appoimentID) => {
 let result =   await Appoiment.destroy({
        where: {id: appoimentID}
    })

    return result;
}

exports.getAppoimentsByClient = async(clientID) =>{
    let appoimentList = await Appoiment.findAll({
        where:{
            client_id:clientID,
        },
    });

    return cleanHelper.cleanEntityList(appoimentList,attributesToBeRemoved);
}

exports.verifyAppoimentAvailability = async(workerID, shiftStarts,shiftEnds) => {
    let availability = await dbContext.sequelize.query(
             'select * \
                    from (  \
                        select shift_starts, shift_ends \
                        from appoiments as ap \
                        where ap.worker_id = :workerID \
                        and DATE(ap.shift_starts) = DATE(:shiftStarts) \
                    ) as workerAuxTable \
                where \
                :shiftStarts >= workerAuxTable.shift_starts and  \
                :shiftStarts < workerAuxTable.shift_ends \
                or :shiftEnds < workerAuxTable.shift_starts and  \
                :shiftEnds >= workerAuxTable.shift_ends \
                or workerAuxTable.shift_starts >=  :shiftStarts and  \
                workerAuxTable.shift_starts < :shiftEnds \
                or workerAuxTable.shift_ends < :shiftStarts and  \
                workerAuxTable.shift_ends >= :shiftEnds ;' 
             ,
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


 