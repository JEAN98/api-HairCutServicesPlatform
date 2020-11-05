const { Joi } = require('express-validation')
const {regexTimeValidation} = require('../../utils/validator.helper');

const hairdressinSalonValidator = {
    body: Joi.object({
      name: Joi.string().max(100).required(),
      description: Joi.string().max(500).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      lunchStarts: Joi.string().regex(regexTimeValidation).required(),
      lunchEnds: Joi.string().regex(regexTimeValidation).required(),
      latitud: Joi.number().strict().required(),
      longitud: Joi.number().strict().required(),
      photo: Joi.string().min(500).required().optional(),
      website: Joi.string().uri().optional(),
      genderID: Joi.number().strict().integer().required()
    }),
}

module.exports = hairdressinSalonValidator;