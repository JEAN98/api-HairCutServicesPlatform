const { Joi } = require('express-validation')

const hairdresserServiceValidator = {
    body: Joi.object({
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(2).max(250).required(),
        cost: Joi.number().strict().optional(),
        timeDuration: Joi.number().strict().integer().optional(),
        hairdressingSalonID: Joi.number().strict().integer().required(),
        genderID: Joi.number().strict().integer().required(),
        isMeasurable: Joi.boolean().required()
    }),
}

module.exports = hairdresserServiceValidator;