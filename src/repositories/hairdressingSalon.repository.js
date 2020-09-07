'use strict';
const HairdressingSalon = require('../config/db.config').hairdressingSalon;
const {BadRequestSequelizeError}  = require('../utils/error');

exports.get = async(params) => {
    console.log(params)
    let res = await HairdressingSalon.findAll({
        where: {is_active: params.isActive == undefined ? true : params.isActive}
    });
    return res;
}

exports.create = async(newHairdressingSalon) => {
    let res = await HairdressingSalon.create(newHairdressingSalon);
    console.log(res);
    return res;    
}

//exports.findByEmail