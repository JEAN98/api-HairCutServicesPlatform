const { Joi } = require('express-validation')

const createPlatformAccount = {
    body: Joi.object({
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).required(),
    birthday: Joi.date().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),  
    genderID: Joi.number().strict().integer().required(),  
    }),
}

module.exports = createPlatformAccount;