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
    let newObject = res.toJSON();
    delete newObject.password;
    return newObject;    
}

exports.findByEmail = async(email) => {
    let res = await HairdressingSalon.findAll({
        where: {email: email}
    });
    return res;
}

//exports.findByEmail