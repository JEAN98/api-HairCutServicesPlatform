'use strict'
const controller = require('../controllers/worker.controller');
const {createWorker,getWorkersByHairdressingSalon} = require('../middleware/validators/worker.validator');
const { validate } = require('express-validation')
const auth =  require('../middleware/token/aut');

module.exports = (app) => {
    // Retrieve a single debit by Id
    app.get('/api/worker/',auth.autentication, validate(getWorkersByHairdressingSalon, {}, {}), controller.findByHairDressingSalon);

    app.post('/api/worker/',auth.autentication, validate(createWorker, {}, {}), controller.create)
}
 
