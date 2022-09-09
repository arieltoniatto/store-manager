const { productModel } = require('../models');

const findAll = async () => {
  const result = await productModel.findAll();

  return result;
};

const findById = async (productId) => {
  const result = await productModel.findById(productId);

  return result[0];
};

module.exports = {
  findAll,
  findById,
};
