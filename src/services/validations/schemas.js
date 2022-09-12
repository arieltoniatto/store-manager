const Joi = require('joi');

// const nameLength = 5;

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const addSaleSchema = Joi.array().items({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  addProductSchema,
  addSaleSchema,
};
