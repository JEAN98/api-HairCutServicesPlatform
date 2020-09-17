'use strict'
const { validate } = require('express-validation')
const session = require('../controllers/session.controller');
const {createJWTPlatformAccounts} = require('../middleware/validators/session.validator');

module.exports = function(app) {
    app.post('/api/hairdressingSalon/session',  validate(createJWTPlatformAccounts, {}, {}), session.createHairdressingSalonSession);

    app.post('/api/clientPlatformAccount/session',  validate(createJWTPlatformAccounts, {}, {}), session.createHaircutPlatformAccountSession);
}
