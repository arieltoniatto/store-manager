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

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const info = { id, name };

  const result = await productService.findById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  const { type, message } = await productService.updateProduct(info);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await productService.findById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  await productService.deleteProduct(id);

  return res.status(204).json();
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
