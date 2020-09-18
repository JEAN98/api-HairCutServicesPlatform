'use strict';
const dbContext = require('../config/db.config');
const HaircutPlatformAccount = dbContext.haircutPlatformAccount;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt','password'];

exports.create = async(newAccount) => {
    let account = await HaircutPlatformAccount.create(newAccount);
    return cleanHelper.cleanEntity(account,attributesToBeRemoved); 
}

exports.findByID = async(accountID) => {
    let account = await HaircutPlatformAccount.findById(accountID);
    return cleanHelper.cleanEntity(account,attributesToBeRemoved);
}


exports.findByEmail = async(newEmail) => {
    let account = await HaircutPlatformAccount.findAll({
        where: {email: newEmail},
        include: [{
            model: dbContext.client,
            // specifies how we want to be able to access our joined rows on the returned data
          }]
    });
    return account;
}