'use strict';
const HaircutPlatformAccount = require('../config/db.config').haircutPlatformAccount;
exports.create = async(newAccount) => {
    let account = await HaircutPlatformAccount.create(newAccount);
    return cleanAccountEntity(account); 
}

exports.findByID = async(accountID) => {
    let account = await HaircutPlatformAccount.findById(accountID);
    return cleanAccountEntity(account);
}

const cleanAccountEntity = (account) => {
    account = account.toJSON();
    delete account.password;
    delete account.updatedAt;
    delete account.createdAt;

    return account;
}