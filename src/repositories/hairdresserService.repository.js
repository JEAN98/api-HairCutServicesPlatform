'use strict';
const HairdressersService = require('../config/db.config').hairdressersService;

exports.getByHairdressingSalon = async(params) => {
    let res = await HairdressersService.findAll({
        where: {
            is_active: params.isActive == undefined ? true : params.isActive,
            hairdressingSalonID: params.hairdressingSalonID
        }
    });
    return cleanEntity(res);
}

exports.create = async(newService) => {
    let res = await HairdressersService.create(newService);
    return cleanEntity(res);
}


const cleanEntity = (newService) => {
    newService = newService.toJSON();
    delete newService.createdAt;
    delete newService.updatedAt;

    return newService;
}