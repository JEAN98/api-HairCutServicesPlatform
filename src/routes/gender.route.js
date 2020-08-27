'use strict'
module.exports = function(app) {
    const controller = require('../controllers/gender.controller');
 
    // Retrieve a single debit by Id
    app.get('/api/gender/',controller.findAll);

    
    
}
