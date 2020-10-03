'use strict'
const { validate } = require('express-validation');
const createFacebookAccount = require('../middleware/validators/facebookAccount.validator');
const controller = require('../controllers/facebookAccount.controller');
module.exports = function(app) {
    // Retrieve a single debit by Id
    app.post('/api/facebookAccount/', validate(createFacebookAccount, {}, {}), controller.create);
    
}
