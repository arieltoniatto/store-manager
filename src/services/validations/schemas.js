const Joi = require('joi');

// const nameLength = 5;

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  addProductSchema,
};
