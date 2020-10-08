'use strict'
const { validate } = require('express-validation');
const createTwitterAccount = require('../middleware/validators/twitterAccount.validator');
const controller = require('../controllers/twitterAccount.controller');
module.exports = function(app) {
    // Retrieve a single debit by Id
    app.post('/api/twitterAccount/', validate(createTwitterAccount, {}, {}), controller.create);
    
}
