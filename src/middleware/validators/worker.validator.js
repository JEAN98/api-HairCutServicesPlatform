const { Joi } = require('express-validation')

exports.createWorker = {
    body: Joi.object({
      identificationCard: Joi.string().min(5).max(100).required(),
      firstName: Joi.string().min(5).max(100).required(),
      lastName: Joi.string().min(5).max(100).required(),
      hairdressingSalonID: Joi.number().strict().integer().required(),
      genderID: Joi.number().strict().integer().required(),
    }),
}

exports.getWorkersByHairdressingSalon = {
  query: Joi.object({
    hairdressingSalonID: Joi.number().required(),
    isActive:  Joi.boolean().optional()
  }),
}

