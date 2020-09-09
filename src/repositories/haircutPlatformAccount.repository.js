'use strict';
const HaircutPlatformAccount = require('../config/db.config').haircutPlatformAccount;
exports.create = async(newAccount) => {
    let account = await HaircutPlatformAccount.create(newAccount);
    account = account.toJSON();
    return account; 
}

exports.findByID = async(accountID) => {
    let account = await HaircutPlatformAccount.findById(accountID);
    account = account.toJSON();
    return account;
}