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

// const salesReport = async (saleId) => {
//   const [result] = await connection.execute(
//     'SELECT product_id AS productId, quantity FROM StoreManager.sales_products WHERE sale_id = ?',
//     [saleId],
//   );
//   console.log(result);
//   return {
//     id: saleId,
//     itemsSold: result,
//   };
// };

module.exports = {
  findAllSales,
  findById,
  insertSales,
  // salesReport,
};
