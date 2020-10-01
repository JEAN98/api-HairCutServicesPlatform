'use strict'
const auth =  require('../middleware/token/aut');
const controller = require('../controllers/report.controller');
const { validate } = require('express-validation');

module.exports = function(app) {
    // Retrieve a single debit by Id
    app.get('/api/percentageOfServices/', auth.autentication,controller.getReportAppoimentServiceList);   
}
