'use strict'
const { validate } = require('express-validation')
const controller = require('../controllers/schedule.controller');
const auth =  require('../middleware/token/aut');
const createSchedule = require('../middleware/validators/schedule.validator');

module.exports = function(app) {

  app.post('/api/schedule', auth.autentication,validate(createSchedule, {}, {}),controller.create)
  app.get('/api/schedule', auth.autentication ,controller.getByHairdressingSalon);
  app.get('/api/schedule/:id', auth.autentication ,controller.getSchedulesByHairdressingSalon);
}
