'use strict'
const auth =  require('../middleware/token/aut');
const controller = require('../controllers/appoimentService.controller');
module.exports = function(app) {
    // Retrieve a single debit by Id
    app.get('/api/appoimentService/',auth.autentication , controller.getAppoimentServiceList);
    
}
