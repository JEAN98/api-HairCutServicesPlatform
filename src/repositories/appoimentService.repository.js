'use strict';
const AppoimentService = require('../config/db.config').appoimentService;

exports.get = async() => {
    let res = await AppoimentService.findAll();
    return res;
}