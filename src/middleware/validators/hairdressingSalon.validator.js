const { Joi } = require('express-validation')

const regexTimeValidation = new RegExp(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/);
const loginValidation = {
    body: Joi.object({
      name: Joi.string().alphanum().max(100).required(),
      description: Joi.string().alphanum().max(500).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      shiftStarts: Joi.string().regex(regexTimeValidation).required(),
      shiftEnds: Joi.string().regex(regexTimeValidation).required(),
      lunchTime: Joi.string().regex(regexTimeValidation).required()
    }),
}

module.exports = loginValidation;