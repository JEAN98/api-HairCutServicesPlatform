'use strict';
const Worker = require('../config/db.config').worker;

exports.getWorkersByHairdressingSalon = async(query) => {
    let workerList = await Worker.findAll(
        { where: 
            { 
                hairdressing_salon_id: query.hairdressingSalonID,
                is_active: query.isActive != undefined ? query.isActive : true
            },
	});
    return cleanListEntity(workerList);
}

exports.create = async(newWorker) => {
    let worker = await Worker.create(newWorker);
    return cleanEntity(worker);
}

const cleanListEntity = (workerList) => {
    if(workerList.length > 0 )
    {
        for (let index = 0; index < workerList.length; index++) {
            workerList[index] = cleanEntity(workerList[index] );
        }
    }
    return workerList;
}

const cleanEntity = (newWorker) => {
    newWorker = newWorker.toJSON();
    delete newWorker.gender_id;
    delete newWorker.createdAt;
    delete newWorker.updatedAt;
    delete newWorker.hairdressing_salon_id;
    return newWorker;
}