const dbContext = require('../config/db.config');
const FacebookAccount = dbContext.facebookAccount;
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

exports.findByEmail = async(newEmail) => {
    let account = await FacebookAccount.findAll({
        where: {email: newEmail},
        include: [{
            model: dbContext.client,
            // specifies how we want to be able to access our joined rows on the returned data
          }]
    });
    return account;
}