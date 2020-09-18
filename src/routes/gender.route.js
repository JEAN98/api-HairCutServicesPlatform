'use strict'
const controller = require('../controllers/gender.controller');
const auth =  require('../middleware/token/aut');

module.exports = function(app) {
    // Retrieve a single debit by Id
    app.get('/api/gender/', auth.autentication,controller.findAll);   
}
