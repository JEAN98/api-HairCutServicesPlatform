'use strict'
const controller   = require('../controllers/hairdresserService.controller');
const { validate } = require('express-validation')
const auth =  require('../token/aut');
const {createValidator,getServicesByHairdressingSalonValidator} = require('../middleware/validators/hairdresserService.validator');

module.exports = function(app) {

    // Retrieve a single debit by Id
    app.post('/api/hairdresserService', validate(createValidator, {}, {}),controller.create);
    
    app.get('/api/hairdresserService', auth.autentication, validate(getServicesByHairdressingSalonValidator, {}, {}), controller.findByHairdressingSalon);
}
