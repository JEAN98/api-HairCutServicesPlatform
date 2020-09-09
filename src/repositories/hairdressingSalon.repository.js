'use strict';
const HairdressingSalon = require('../config/db.config').hairdressingSalon;
const {BadRequestSequelizeError}  = require('../utils/error');

exports.get = async(params) => {
    let res = await HairdressingSalon.findAll({
        attributes: {exclude: ['genderID','password','createdAt','updatedAt']},
        where: {is_active: params.isActive == undefined ? true : params.isActive}
    });
    return res;
}

exports.create = async(newHairdressingSalon) => {
    let res = await HairdressingSalon.create(newHairdressingSalon);
    return cleanEntity(res);    
}

exports.findByEmail = async(email) => {
    let res = await HairdressingSalon.findAll({
        where: {email: email}
    });
    return res;
}

const cleanEntity = (hairdressingSalon) => {
    hairdressingSalon = hairdressingSalon.toJSON();
    delete hairdressingSalon.password;
    delete hairdressingSalon.createdAt;
    delete hairdressingSalon.updatedAt;
    return hairdressingSalon;
}
//exports.findByEmail