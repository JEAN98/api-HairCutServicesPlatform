'use strict'
const controller = require('../controllers/weekDay.controller');
const auth =  require('../token/aut');
module.exports = function(app) {
    // Retrieve a single debit by Id
    app.get('/api/weekDay/', auth.autentication, controller.findAll);
}
