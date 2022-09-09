const { productService } = require('../services');

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

module.exports = {
  findAll,
  findById,
};
