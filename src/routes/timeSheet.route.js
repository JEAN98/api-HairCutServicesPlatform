'use strict'
const auth =  require('../middleware/token/aut');
const { validate } = require('express-validation');
const {getTimeSheetAvailable} = require('../middleware/validators/timeSheet.validator');
const controller = require('../controllers/timeSheet.controller');

module.exports = function(app) {
    // Retrieve a single debit by Id
    app.get('/api/timeSheet/' ,auth.autentication, validate(getTimeSheetAvailable, {}, {}), controller.getTimeSheetsAvailableByWorker);
}
