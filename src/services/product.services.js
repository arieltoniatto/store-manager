const { productModel } = require('../models');
const { validateNewProduct } = require('./validations/validations');

const findAll = async () => {
  const result = await productModel.findAll();

  return result;
};

const findById = async (productId) => {
  const result = await productModel.findById(productId);

  return result[0];
};

const newProduct = async (name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;

  const newProd = await productModel.insert({ name });
  return { type: null, message: newProd };
};

const updateProduct = async (info) => {
  const error = await validateNewProduct(info.name);

  if (error.type) return error;

  const updatedProd = await productModel.updateProduct(info);

  return { message: updatedProd };
};

const deleteProduct = async (id) => {
  await productModel.deleteProd(id);

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProduct,
  deleteProduct,
};
