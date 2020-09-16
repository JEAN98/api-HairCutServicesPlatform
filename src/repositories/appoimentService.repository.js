'use strict';
const AppoimentService = require('../config/db.config').appoimentService;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.get = async() => {
    let res = await AppoimentService.findAll();
    return res;
}


exports.create = async(servicesList) => {
    let newServicesCreated = await AppoimentService.bulkCreate(servicesList);
    return cleanHelper.cleanEntityList(newServicesCreated,attributesToBeRemoved);
}