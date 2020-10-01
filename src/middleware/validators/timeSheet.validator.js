const { Joi } = require('express-validation')
const {regexDateValidation} = require('../../utils/validator.helper');

exports.getTimeSheetAvailable = {
    query: Joi.object({
        workerID:  Joi.number(),
        date: Joi.string().regex(regexDateValidation).required(),
    }),
}
  