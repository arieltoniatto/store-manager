const { newSale } = require('../services/sales.services');
const { mapError } = require('../utils/errorMap');

const createSale = async (req, res) => {
  const salesDetails = req.body;

  const { type, message } = await newSale(salesDetails);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSale,
};
