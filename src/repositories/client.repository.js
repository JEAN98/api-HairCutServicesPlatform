'use strict';
const Client = require('../config/db.config').client;

exports.create = async(clientData) => {
    let newClient = await Client.create(clientData);
    newClient = newClient.toJSON();
    return newClient;
}

exports.findByID = async(clientID) => {
    let client = await Client.findById(clientID);
    client = client.toJSON();
    return client;
}