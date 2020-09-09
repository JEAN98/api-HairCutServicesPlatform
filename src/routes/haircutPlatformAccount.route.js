'use strict'
const { validate } = require('express-validation');
const createPlatformAccount = require('../middleware/validators/haircutPlatformAccount.validator');
const controller = require('../controllers/haircutPlatformAccount.controller');
module.exports = function(app) {
    // Retrieve a single debit by Id
    app.post('/api/haircutPlatformAccount/', validate(createPlatformAccount, {}, {}), controller.create);
    
}
