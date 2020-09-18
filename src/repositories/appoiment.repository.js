'use strict';
const dbContext       = require('../config/db.config');
const Appoiment = dbContext.appoiment;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = [,'createdAt','updatedAt'];

exports.create = async(appoiment) => {
    let newAppoiment = await Appoiment.create(appoiment);
    return cleanHelper.cleanEntity(newAppoiment,attributesToBeRemoved);
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


