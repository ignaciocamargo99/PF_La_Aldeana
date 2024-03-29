const pool = require("../../config/connection");

const PayTypesGetDB = () => {
  const sqlSelect = "SELECT * FROM PAY_TYPES";

  return new Promise((resolve, reject) => {
    pool.getConnection((error, db) => {
      if (error) reject(error);

      db.query(sqlSelect, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      db.release();
    });
  });
};
const OnSiteSalesGetDB = (day) => {
  const sqlSelect = `SELECT
                        TIME(s.date_hour) AS hour, s.total_amount, p.name  
                    FROM 
                        SALES s INNER JOIN PAY_TYPES p ON s.id_pay_type = p.id_pay_type 
                    WHERE 
                        ISNULL(cellphone_client)
                    AND
                        s.date_hour LIKE '${day}%'`;

  return new Promise((resolve, reject) => {
    pool.getConnection((error, db) => {
      if (error) reject(error);

      db.query(sqlSelect, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      db.release();
    });
  });
};

const SalesGetDB = (dayInit, dayFinish) => {
  const sqlSelectSales = `
  SELECT COUNT(*) AS quantity_sales, ISNULL(cellphone_client) isOnsite , SUM(total_amount) total
  FROM SALES WHERE DATE(date_hour) 
  BETWEEN '${dayInit.split("-").join()}' 
  AND '${dayFinish.split("-").join()}'
  GROUP BY ISNULL(cellphone_client)`;

  const sqlSelectSalesBranches = `
  SELECT COUNT(*) AS quantity_sales, NULL AS isOnsite, SUM(amount) total 
  FROM SALES_BRANCHES 
  WHERE STATUS = 'FINISH' 
  AND DATE 
  BETWEEN '${dayInit.split("-").join()}' 
  AND '${dayFinish.split("-").join()}'
`;
  let response = [];
  return new Promise((resolve, reject) => {
    pool.getConnection((error, db) => {
      if (error) reject(error);
      db.query(sqlSelectSales, (error, result) => {
        if (error) reject(error);
        else {
          if (result.length === 0) {
            result = [
              { quantity_sales: 0, isOnsite: 0, total: 0 },
              { quantity_sales: 0, isOnsite: 1, total: 0 },
            ];
          } else if (result.length === 1) {
            result[0].isOnsite === 0
              ? result.push({ quantity_sales: 0, isOnsite: 1, total: 0 })
              : result.push({ quantity_sales: 0, isOnsite: 0, total: 0 });
          }
          response = [...response, ...result];
          db.query(sqlSelectSalesBranches, (error, result) => {
            if (error) reject(error);
            else {
              if (!result[0].total) result[0].total = 0;
              response = [...response, ...result];
              resolve(response);
            }
          });
        }
      });
      db.release();
    });
  });
};

const salePostDB = (newSale) => {
  const { date_hour, total_amount, id_pay_type, details } = newSale;
  let id_sale;
  let arrDetails = JSON.parse(details);

  const selectMaxIdSale = "SELECT MAX(id_sale) AS last_id_sale FROM SALES";
  const sqlInsertSale =
    "INSERT INTO SALES(id_sale, date_hour, total_amount, id_pay_type) VALUES(?, ?,?,?)";

  return new Promise((resolve, reject) => {
    pool.getConnection((error, db) => {
      if (error) reject("0:" + error);

      db.query(selectMaxIdSale, (error, row) => {
        if (error) reject("1:" + error);
        else id_sale = row[0].last_id_sale + 1;
      });
      db.beginTransaction((error) => {
        if (error) reject(error);
        db.query(
          sqlInsertSale,
          [id_sale, date_hour, total_amount, id_pay_type],
          (error) => {
            if (error) return db.rollback(() => reject(error));
            for (let i = 0; i < arrDetails.length; i++) {
              const sqlInsertSaleDetailSale = `INSERT INTO DETAIL_SALES VALUES(${
                i + 1
              },${id_sale},${arrDetails[i].id_product},${
                arrDetails[i].quantity
              },${arrDetails[i].subtotal})`;
              db.query(sqlInsertSaleDetailSale, (error) => {
                if (error) return db.rollback(() => reject(error));
                db.commit((error) => {
                  if (error) db.rollback(() => reject(error));
                  else resolve(id_sale);
                });
              });
            }
          }
        );
        db.release();
      });
    });
  });
};

const saleDeliveryPostDB = (newSale) => {
  const { date_hour, total_amount, id_pay_type, details, cellphone_client } =
    newSale;
  let id_sale;
  let arrSuppliesToDiscount;
  let arrDetails = JSON.parse(details);

  const selectMaxIdSale = "SELECT MAX(id_sale) AS last_id_sale FROM SALES";

  return new Promise((resolve, reject) => {
    pool.getConnection((error, db) => {
      if (error) reject("0:" + error);

      db.query(selectMaxIdSale, (error, row) => {
        if (error) reject("1:" + error);
        else id_sale = row[0].last_id_sale + 1;
      });
      db.beginTransaction((error) => {
        if (error) reject("1,5:" + error);

        const sqlInsertSale = `INSERT INTO SALES(id_sale, date_hour, total_amount, id_pay_type, cellphone_client) VALUES(${id_sale}, '${date_hour}',${total_amount},${id_pay_type},${cellphone_client})`;

        db.query(sqlInsertSale, (error, result) => {
          if (error) {
            return db.rollback(() => reject("2:" + error));
          }
          for (let i = 0; i < arrDetails.length; i++) {
            const sqlSelectSuppliesToDiscount = `SELECT pxs.id_supply AS id_supply, pxs.number_supply AS quantity FROM PRODUCT_X_SUPPLY pxs WHERE pxs.id_product = ${arrDetails[i].id_product}`;

            db.query(
              sqlSelectSuppliesToDiscount,
              (error, suppliesQuantities) => {
                if (error) reject("3:" + error);
                else arrSuppliesToDiscount = suppliesQuantities;
              }
            );

            const sqlInsertSaleDetailSale = `INSERT INTO DETAIL_SALES VALUES(${
              i + 1
            },${id_sale},${arrDetails[i].id_product},${
              arrDetails[i].quantity
            },${arrDetails[i].subtotal})`;

            db.query(sqlInsertSaleDetailSale, (error) => {
              if (error) {
                return db.rollback(() => reject("4:" + error));
              }
              for (let j = 0; j < arrSuppliesToDiscount.length; j++) {
                let discountTotal =
                  parseInt(arrDetails[i].quantity) *
                  parseInt(arrSuppliesToDiscount[j].quantity);

                const sqlUpdateSupply = `UPDATE SUPPLIES s SET s.stock_unit=(s.stock_unit - ${discountTotal})  WHERE id_supply=${arrSuppliesToDiscount[j].id_supply}`;

                db.query(sqlUpdateSupply, (error) => {
                  if (error) {
                    return db.rollback(() => reject("5:" + error));
                  }
                  db.commit((error) => {
                    if (error) {
                      return db.rollback(() => reject("6:" + error));
                    } else resolve();
                  });
                });
              }
              db.commit((error) => {
                if (error) {
                  return db.rollback(() => reject("6:" + error));
                } else resolve();
              });
            });
          }
        });
        db.release();
      });
    });
  });
};

module.exports = {
  PayTypesGetDB,
  salePostDB,
  saleDeliveryPostDB,
  OnSiteSalesGetDB,
  SalesGetDB,
};
