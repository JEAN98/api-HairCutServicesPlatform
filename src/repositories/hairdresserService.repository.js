'use strict';
const HairdressersService = require('../config/db.config').hairdressersService;

exports.get = async() => {
    let res = await HairdressersService.findAll();
    return res;
}

exports.create = async(newService) => {
    let res = await HairdressersService.create(newService);
    return res;
}