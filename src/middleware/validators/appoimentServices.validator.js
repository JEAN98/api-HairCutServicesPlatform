const { Joi } = require('express-validation')
exports.getAppoimentServices = {
    query: Joi.object({
        appoimentID:  Joi.number()
    }),
  }
  