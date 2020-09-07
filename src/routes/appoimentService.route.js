'use strict'
const auth =  require('../token/aut');
const controller = require('../controllers/appoimentService.controller');
module.exports = function(app) {
    // Retrieve a single debit by Id
    app.get('/api/appoimentService/',auth.autentication , controller.findAll);
    
}
