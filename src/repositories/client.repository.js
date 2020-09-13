'use strict';
const Client = require('../config/db.config').client;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.create = async(clientData) => {
    let newClient = await Client.create(clientData);
    return cleanHelper.cleanEntity(newClient,attributesToBeRemoved);
}

exports.findByID = async(clientID) => {
    let client = await Client.findById(clientID);
    return cleanHelper.cleanEntity(client,attributesToBeRemoved);
}
