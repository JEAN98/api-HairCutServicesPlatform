'use strict';
const Gender = require('../config/db.config').gender;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.get = async() => {
    let genderList = await Gender.findAll();
    return cleanHelper.cleanEntityList(genderList,attributesToBeRemoved);
}