'use strict';
const Worker = require('../config/db.config').worker;

exports.getWorkersByHairdressingSalon = async(query) => {
    let res = await Worker.findAll(
        { where: 
            { 
                hairdressing_salon_id: query.hairDressingSalonID,
                is_active: query.isActive != undefined ? query.isActive : true
            }
	});
    return res;
}