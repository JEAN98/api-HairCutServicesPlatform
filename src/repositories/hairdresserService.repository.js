'use strict';
const HairdressersService = require('../config/db.config').hairdressersService;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.getByHairdressingSalon = async(params) => {
    let servicesList = await HairdressersService.findAll({
        where: {
            is_active: params.isActive == undefined ? true : params.isActive,
            hairdressingSalonID: params.hairdressingSalonID
        }
    });
    return cleanHelper.cleanEntityList(servicesList,attributesToBeRemoved);
}

exports.create = async(newService) => {
    let service = await HairdressersService.create(newService);
    return cleanHelper.cleanEntity(service,attributesToBeRemoved);
}
