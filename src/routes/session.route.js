'use strict'
const { validate } = require('express-validation')
const session = require('../controllers/sesion.controller');
const sessionValidator = require('../middleware/validators/session.validator');

module.exports = function(app) {
   
    app.post('/api/session',  validate(sessionValidator, {}, {}), session.createSession);
}
