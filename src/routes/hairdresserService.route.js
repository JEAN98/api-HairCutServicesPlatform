'use strict'
const controller   = require('../controllers/hairdresserService.controller');
const { validate } = require('express-validation')
const hairdresserServiceValidator = require('../middleware/validators/hairdresserService.validator');

module.exports = function(app) {

    // Retrieve a single debit by Id
    app.post('/api/hairdresserService', validate(hairdresserServiceValidator, {}, {}),controller.create)
    
}
