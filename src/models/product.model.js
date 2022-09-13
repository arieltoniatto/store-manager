const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );

  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return result;
};

const insert = async ({ name }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return { id: result.insertId, name };
};

const updateProduct = async ({ id, name }) => {
  await connection.execute(
    `UPDATE StoreManager.products
SET name = ?
WHERE id = ?`,
    [name, id],
  );

  return { id, name };
};

const deleteProd = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products
WHERE id = ?;`,
    [id],
  );

  return null;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
  deleteProd,
};
