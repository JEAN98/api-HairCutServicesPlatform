'use strict';
const Worker = require('../config/db.config').worker;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt','gender_id','hairdressing_salon_id'];

exports.getWorkersByHairdressingSalon = async(query) => {
    let workerList = await Worker.findAll(
        { where: 
            { 
                hairdressing_salon_id: query.hairdressingSalonID,
                is_active: query.isActive != undefined ? query.isActive : true
            },
	}); 
    return cleanHelper.cleanEntityList(workerList,attributesToBeRemoved);
}

exports.create = async(newWorker) => {
    let worker = await Worker.create(newWorker);
    return cleanHelper.cleanEntity(worker,attributesToBeRemoved);
}
