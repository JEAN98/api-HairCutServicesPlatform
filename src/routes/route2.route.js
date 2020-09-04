'use strict'
const { validate, ValidationError, Joi } = require('express-validation')
const controller = require('../controllers/hairdressingSalon.controller');
const loginValidation3 = require('../middleware/validators/hairdressingSalon.validator');
module.exports = function(app) {

    app.post('/api/hairdressingSalon', validate(loginValidation3, {}, {}),controller.create)
}
