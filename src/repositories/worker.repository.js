'use strict';
const Worker = require('../config/db.config').worker;

exports.getWorkersByHairdressingSalon = async(query) => {
    console.log(query)
    let res = await Worker.findAll(
        { where: 
            { 
                hairdressing_salon_id: query.hairdressingSalonID,
                is_active: query.isActive != undefined ? query.isActive : true
            },
	});
    return res;
}