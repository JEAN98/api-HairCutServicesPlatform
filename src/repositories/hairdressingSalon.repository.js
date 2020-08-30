'use strict';
const HairdressingSalon = require('../config/db.config').hairdressingSalon;


exports.get = async() => {
    let res = await HairdressingSalon.findAll();
    return res;
}