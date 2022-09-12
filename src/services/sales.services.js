const { insertSales } = require('../models/sales.model');
const { validateNewSales, validateProductId } = require('./validations/validations');

const newSale = async (saleDetails) => {
  const error = await validateNewSales(saleDetails);
  if (error.type) return error;

  const idError = await validateProductId(saleDetails);
  if (idError.type) return idError;

  const newSales = await insertSales(saleDetails);

  return { type: null, message: { id: newSales, itemsSold: saleDetails } };
};

module.exports = {
  newSale,
};
