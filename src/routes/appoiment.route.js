'use strict'
const auth =  require('../middleware/token/aut');
const controller = require('../controllers/appoiment.controller');
module.exports = function(app) {
    // Retrieve a single debit by Id
    app.post('/api/appoiment/' , controller.verifyAvailabity);
}
