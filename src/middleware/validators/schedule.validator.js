const { Joi } = require('express-validation')
const {regexTimeValidation} = require('../../utils/validator.helper');


const scheduleObject = Joi.object({
    weekDayID:  Joi.number().strict().integer().required(),
    hairdressingSalonID: Joi.number().strict().integer().required(),
    shiftStarts: Joi.string().regex(regexTimeValidation).required(),
    shiftEnds: Joi.string().regex(regexTimeValidation).required(),
  }).required();

const createSchedule = {
    body: Joi.array().items(scheduleObject).min(1).unique().required(),
}


module.exports = createSchedule;