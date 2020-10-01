const { Joi } = require('express-validation')

exports.createValidator = {
    body: Joi.object({
        code: Joi.string().min(2).max(100).required(),
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(2).max(250).required(),
        cost: Joi.number().strict().optional(),
        timeDuration: Joi.number().strict().integer().optional(),
        genderID: Joi.number().strict().integer().required(),
        isMeasurable: Joi.boolean().required()
    }),
}

exports.getServicesByHairdressingSalonValidator = {
    query:Joi.object({
        isActive:  Joi.boolean().optional(),
        hairdressingSalonID:  Joi.number().required()
    }),
}
