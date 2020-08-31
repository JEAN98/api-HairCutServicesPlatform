'use strict'
module.exports = (app) => {
    const controller = require('../controllers/worker.controller');
 
    // Retrieve a single debit by Id
    app.get('/api/worker/',controller.findByHairDressingSalon);
    
}
