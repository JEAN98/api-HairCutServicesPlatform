'use strict'
const { validate } = require('express-validation')
const session = require('../controllers/hairdressingSalonSession.controller');
const sessionValidator = require('../middleware/validators/session.validator');

module.exports = function(app) {
   
    app.post('/api/hairdressingSalon/session',  validate(sessionValidator, {}, {}), session.createSession);
}
