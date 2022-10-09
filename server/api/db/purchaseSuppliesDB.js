const pool = require("../../config/connection");

const purchasesGetDB = (from, to) => {
  const sqlSelect = from != null && to != null?`SELECT * FROM PURCHASES_SUPPLIES WHERE purchase_date <= "${to}" AND purchase_date >= "${from}"`: "SELECT * FROM PURCHASES_SUPPLIES";
console.log(sqlSelect)
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

const lastPurchaseGetDB = () => {
  const sqlSelect = `SELECT MAX(p.purchase_number) AS last_number FROM PURCHASES_SUPPLIES p`;

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

const purchaseSuppliesPostDB = (newPurchase) => {
  const date_purchase = newPurchase.date_purchase;
  const supplier = newPurchase.supplier;
  const total = newPurchase.total;
  const arrDetails = newPurchase.details;

  const sqlInsertPurchase = `INSERT INTO PURCHASES_SUPPLIES VALUES (${arrDetails[0].purchase_number},'${date_purchase}',?,${total})`;

  //console.log(sqlInsertPurchase)
  return new Promise((resolve, reject) => {
    pool.getConnection((error, db) => {
      if (error) {
        console.log("error en conexión");
        reject(error);
      }
      db.beginTransaction((error) => {
        if (error) {
          console.log("error en inicio de transacción");
          reject(error);
        }

        db.query(sqlInsertPurchase, [supplier], (error, result) => {
          if (error) {
            console.log("1: ", error);
            return db.rollback(() => reject(error));
          }

          let sqlUpdateDetailsPurchase;

          for (var i = 0; i < arrDetails.length; i++) {
            sqlUpdateDetailsPurchase = `INSERT INTO DETAIL_PURCHASE_SUPPLIES(detail_number,purchase_number,id_supply,quantity,subtotal) 
            VALUES 
            (${i + 1},${arrDetails[i].purchase_number},${
              arrDetails[i].id_supply
            },${arrDetails[i].quantity},${arrDetails[i].subtotal})`;
            db.query(sqlUpdateDetailsPurchase, (error) => {
              if (error) {
                console.log("1.5: ", error);
                db.rollback(() => reject(error));
              }
              db.commit((error) => {
                if (error) {
                  console.log("2-", i, ": ", error);
                  return db.rollback(() => reject(error));
                } else resolve();
              });
            });
          }

          let sqlUpdate;

          for (var i = 0; i < arrDetails.length; i++) {
            //if(arrDetails[i].stock){ //acá esta el tema
            sqlUpdate = `UPDATE SUPPLIES SET stock_unit = (stock_unit + ${arrDetails[i].quantity})
                        WHERE id_supply = ${arrDetails[i].id_supply}`;

            //console.log(sqlUpdate)
            db.query(sqlUpdate, (error) => {
              if (error) {
                console.log("3-", i, ": ", error);
                db.rollback(() => reject(error));
              }
              db.commit((error) => {
                if (error) {
                  console.log("4-", i, ": ", error);
                  return db.rollback(() => reject(error));
                } else resolve();
              });
            });
            //}
            //else resolve();
          }
        });
        db.release();
      });
    });
  });
};

module.exports = { purchasesGetDB, lastPurchaseGetDB, purchaseSuppliesPostDB };
