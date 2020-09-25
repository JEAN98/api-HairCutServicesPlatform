const { Joi } = require('express-validation')

const createAppoiment = {
    body: Joi.object({
      shiftStarts: Joi.date().required(),
      workerID: Joi.number().strict().integer().required(),
      servicesList: Joi.array().items(Joi.number().strict().integer()).min(1).required(),  
    }),
}

const getAppoimentList = {
  body: Joi.object({
    dateTo: Joi.date().required(),
    dateFrom: Joi.date().required()
  }),
}

module.exports = {
  createAppoiment,
  getAppoimentList
};