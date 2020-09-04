'use strict'
const controller                 = require('../controllers/hairdressingSalon.controller');
 const loginValidation = require('../middleware/validators/hairdressingSalon.validator');
 const { validate,Joi} = require('express-validation')

module.exports = function(app) {


   app.post('/api/hairdressingSalon/', validate(loginValidation, {}, {}), (req, res) => {
        res.json(200)
      })
  
   // app.post('/api/hairdressingSalon/', validate(loginValidation, {}, {}), controller.create);

      
    // Retrieve a single debit by Id
    app.get('/api/hairdressingSalon/', controller.findAll);
}
