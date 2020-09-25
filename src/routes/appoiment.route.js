'use strict'
const auth =  require('../middleware/token/aut');
const { validate } = require('express-validation');
const createAppoiment = require('../middleware/validators/appoiment.validator');
const controller = require('../controllers/appoiment.controller');

module.exports = function(app) {
    // Retrieve a single debit by Id
    app.post('/api/appoiment/' ,auth.autentication, validate(createAppoiment, {}, {}), controller.createAppoiment);

    app.get('/api/appoiment/' ,auth.autentication, controller.getAppoimentListBetweenDates);
}
