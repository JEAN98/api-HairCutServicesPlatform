'use strict'
module.exports = function(app) {
    const controller = require('../controllers/appoimentService.controller');
 
    // Retrieve a single debit by Id
    app.get('/api/appoimentService/',controller.findAll);
    
}
