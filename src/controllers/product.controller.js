const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const findAll = async (req, res) => {
  const allProducts = await productService.findAll();

  res.status(200).json(allProducts);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const result = await productService.findById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.newProduct(name);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
