'use strict';
const HairdressersService = require('../config/db.config').hairdressersService;

exports.getByHairdressingSalon = async(params) => {
    let servicesList = await HairdressersService.findAll({
        where: {
            is_active: params.isActive == undefined ? true : params.isActive,
            hairdressingSalonID: params.hairdressingSalonID
        }
    });
    return cleanListEntity(servicesList);
}

exports.create = async(newService) => {
    let service = await HairdressersService.create(newService);
    return cleanEntity(service);
}


const cleanListEntity = (serviceList) => {
    if(serviceList.length > 0 )
    {
        for (let index = 0; index < serviceList.length; index++) {
            serviceList[index] = cleanEntity(serviceList[index] );
        }
    }
    return serviceList;
}

const cleanEntity = (newService) => {
    newService = newService.toJSON();
    delete newService.createdAt;
    delete newService.updatedAt;

    return newService;
}