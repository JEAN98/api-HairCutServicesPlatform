'use strict'
const { validate } = require('express-validation')
const controller = require('../controllers/hairdressingSalon.controller');
const auth =  require('../middleware/token/aut');
const hairdressinSalonValidator = require('../middleware/validators/hairdressingSalon.validator');

module.exports = function(app) {

  app.post('/api/hairdressingSalon', validate(hairdressinSalonValidator, {}, {}),controller.create)
  app.get('/api/hairdressingSalon/', auth.autentication ,controller.findAll);
  app.get('/api/hairdressingSalon/:id', auth.autentication ,controller.findByID);
}
