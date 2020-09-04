'use strict';
const HairdressingSalon = require('../config/db.config').hairdressingSalon;


exports.get = async(params) => {
    console.log(params)
    let res = await HairdressingSalon.findAll({
        where: {is_active: params.isActive == undefined ? true : params.isActive}
    });
    return res;
}