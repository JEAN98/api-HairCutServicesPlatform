'use strict'
module.exports = function(app) {
    const controller = require('../controllers/hairdressingSalon.controller');
 
    // Retrieve a single debit by Id
    app.get('/api/hairdressingSalon/',controller.findAll);
}
