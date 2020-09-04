'use strict';
const AppoimentServices = require('../config/db.config').appoimentServices;

exports.get = async() => {
    let res = await AppoimentServices.findAll();
    return res;
}