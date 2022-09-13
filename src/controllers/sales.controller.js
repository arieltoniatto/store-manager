const { newSale, salesInfo, salesById } = require('../services/sales.services');
const { mapError } = require('../utils/errorMap');

const createSale = async (req, res) => {
  const salesDetails = req.body;

  const { type, message } = await newSale(salesDetails);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const findAllSales = async (req, res) => {
  const result = await salesInfo();

  return res.status(200).json(result);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;

  const result = await salesById(id);
  if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(result);
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
};
