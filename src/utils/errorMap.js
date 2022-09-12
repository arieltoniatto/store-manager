const errorMap = {
  INVALID_LENGTH: 422,
  MISSING_FIELD: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
