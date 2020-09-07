const { Joi } = require('express-validation')

const createValidator = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
}

module.exports = createValidator;