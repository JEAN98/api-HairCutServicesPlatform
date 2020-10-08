const dbContext = require('../config/db.config');
const TwitterAccount = dbContext.twitterAccount;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt','twitter_id','token','username'];

exports.create = async(newAccount) => {
    
    let account = await TwitterAccount.create(newAccount);
    return cleanHelper.cleanEntity(account,attributesToBeRemoved); 
}

exports.findByID = async(accountID) => {
    let account = await TwitterAccount.findById(accountID);
    return cleanHelper.cleanEntity(account,attributesToBeRemoved);
}

exports.findBytwitterID = async(twitterID) => {
    let account = await TwitterAccount.findAll({
        where: {twitterID: twitterID},
        include: [{
            model: dbContext.client,
            // specifies how we want to be able to access our joined rows on the returned data
          }]
    });
    return account;
}