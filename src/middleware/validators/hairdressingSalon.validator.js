const { Joi } = require('express-validation')

const loginValidation = {
    body: Joi.object({
      name: Joi.string().alphanum().max(100).required(),
      description: Joi.string().alphanum().max(500).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }),
}

module.exports = loginValidation;