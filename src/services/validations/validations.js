const { addProductSchema, addSaleSchema } = require('./schemas');
const { findAll } = require('../../models/product.model');

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (error) {
    if (error.message === '"name" length must be at least 5 characters long') {
      return { type: 'INVALID_LENGTH', message: error.message };
    }
    return { type: 'MISSING_FIELD', message: error.message };
  }

  return { type: null, message: '' };
};

const validateProductId = async (salesDetail) => {
  const newArr = [];
  const allProducts = await findAll();

  allProducts.forEach(({ id }) => newArr.push(id));

  const salesArr = Object.values(salesDetail);

  const result = salesArr.every((ele) => newArr.includes(ele.productId));

  if (!result) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateNewSales = async (salesDetails) => {
  // const { type, message } = await validateProductId(salesDetails);

  // if (type) return { type, message };

  const { error } = await addSaleSchema.validate(salesDetails);

  console.log(error);

  if (error) {
    if (error.message.includes('is required')) {
      return { type: 'MISSING_PRODUCTID', message: error.message.replace('[0].', '') };
    }
    return { type: 'INVALID_QUANTITY', message: error.message.replace('[0].', '') };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
  validateNewSales,
  validateProductId,
};
