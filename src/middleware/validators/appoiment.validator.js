const { Joi } = require('express-validation')

const hairdressinSalonValidator = {
    body: Joi.object({
      shiftStarts: Joi.date().required(),
      clientID: Joi.number().strict().integer().required(),
      workerID: Joi.number().strict().integer().required(),
      services: Joi.array().items(Joi.number().strict().integer()).min(1).required(),  
    }),
}

module.exports = hairdressinSalonValidator;