'use strict';
const Client = require('../config/db.config').client;

exports.create = async(clientData) => {
    let newClient = await Client.create(clientData);
    return cleanClientEntity(newClient);
}

exports.findByID = async(clientID) => {
    let client = await Client.findById(clientID);
    return cleanClientEntity(client);
}


const cleanClientEntity = (client) => {
    client = client.toJSON();
    delete client.updatedAt;
    delete client.createdAt;

    return client;
}