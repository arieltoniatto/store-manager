const connection = require('./connection');

const findAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id',
  );

  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [productId],
  );

  return result;
};

const insertSales = async (salesDetails) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  salesDetails.forEach(async (item) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [result.insertId, item.productId, item.quantity],
    );
  });

  return result.insertId;
};

const salesReport = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, sa.date, sp.product_id AS productId, sp.quantity
FROM StoreManager.sales AS sa
INNER JOIN StoreManager.sales_products AS sp
ON sa.id = sp.sale_id
ORDER BY sp.sale_id ASC, sp.product_id ASC;`,
  );

  return result;
};

const saleReportById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id AS productId, sp.quantity
FROM StoreManager.sales AS sa
INNER JOIN StoreManager.sales_products AS sp
ON sa.id = sp.sale_id
WHERE sp.sale_id = ?
ORDER BY sp.sale_id ASC, sp.product_id ASC;`,
    [id],
  );

  return result;
};

const deleteSales = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.sales
  WHERE id = ?;`, [id],
  );
  return result;
};

const updateSales = async (newData, id) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
  SET quantity = ?
  WHERE product_id = ? AND sale_id = ?;`,
    [newData.quantity, newData.productId, id],
  );

  console.log('newdata', newData);
  console.log('result', result);

  return result;
};

module.exports = {
  findAllSales,
  findById,
  insertSales,
  salesReport,
  saleReportById,
  deleteSales,
  updateSales,
};
