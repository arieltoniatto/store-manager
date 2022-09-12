const { addProductSchema } = require('./schemas');

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

module.exports = {
  validateNewProduct,
};
