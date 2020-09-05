const { Joi } = require('express-validation')

const regexTimeValidation = new RegExp(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/);
const hairdressinSalonValidator = {
    body: Joi.object({
      name: Joi.string().max(100).required(),
      description: Joi.string().max(500).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      shiftStarts: Joi.string().regex(regexTimeValidation).required(),
      shiftEnds: Joi.string().regex(regexTimeValidation).required(),
      lunchTime: Joi.string().regex(regexTimeValidation).required(),
      latitud: Joi.number().strict().required(),
      longitud: Joi.number().strict().required(),
      photo: Joi.array().items(Joi.string()).min(1).optional(),
      website: Joi.string().uri().optional(),
      genderID: Joi.number().strict().integer().required()
    }),
}

module.exports = hairdressinSalonValidator;