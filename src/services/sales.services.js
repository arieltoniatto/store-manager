const { insertSales, salesReport, saleReportById } = require('../models/sales.model');
const { validateNewSales, validateProductId } = require('./validations/validations');

const newSale = async (saleDetails) => {
  const error = await validateNewSales(saleDetails);
  if (error.type) return error;

  const idError = await validateProductId(saleDetails);
  if (idError.type) return idError;

  const newSales = await insertSales(saleDetails);

  return { type: null, message: { id: newSales, itemsSold: saleDetails } };
};

const salesInfo = async () => {
  const result = await salesReport();

  return result;
};

const salesById = async (id) => {
  const result = await saleReportById(id);

  return result;
};

module.exports = {
  newSale,
  salesInfo,
  salesById,
};
