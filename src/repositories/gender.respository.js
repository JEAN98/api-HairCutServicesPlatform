'use strict';
const Gender = require('../config/db.config').gender;


exports.get = async() => {
    let res = await Gender.findAll();
    return res;
}