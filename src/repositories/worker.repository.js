'use strict';
const Worker = require('../config/db.config').worker;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.getWorkersByHairdressingSalon = async(query) => {
    let workerList = await Worker.findAll(
        { where: 
            { 
                hairdressing_salon_id: query.hairdressingSalonID,
                is_active: query.isActive != undefined ? query.isActive : true
            },
	}); //TODO: Review this json result, since gender_id and genderID are being displayed
    return cleanHelper.cleanEntityList(workerList,attributesToBeRemoved);
}

exports.create = async(newWorker) => {
    let worker = await Worker.create(newWorker);
    return cleanHelper.cleanEntity(worker,attributesToBeRemoved);
}
