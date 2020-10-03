const FacebookAccount = require('../config/db.config').facebookAccount;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.create = async(newAccount) => {
    let account = await FacebookAccount.create(newAccount);
    return cleanHelper.cleanEntity(account,attributesToBeRemoved); 
}

exports.findByID = async(accountID) => {
    let account = await FacebookAccount.findById(accountID);
    return cleanHelper.cleanEntity(account,attributesToBeRemoved);
}