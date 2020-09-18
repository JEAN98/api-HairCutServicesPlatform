'use strict'
const auth =  require('../middleware/token/aut');
const controller = require('../controllers/appoimentService.controller');
const { validate } = require('express-validation');
const {getAppoimentServices} = require('../middleware/validators/appoimentServices.validator');

module.exports = function(app) {
    // Retrieve a single debit by Id
    app.get('/api/appoimentService/',auth.autentication , validate(getAppoimentServices, {}, {}),controller.getAppoimentServiceList);
}
