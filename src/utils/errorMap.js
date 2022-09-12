const errorMap = {
  INVALID_LENGTH: 422,
  MISSING_FIELD: 400,
  MISSING_PRODUCTID: 400,
  MISSING_QUANTITY: 400,
  INVALID_QUANTITY: 422,
  NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
