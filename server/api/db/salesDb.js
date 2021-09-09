const pool = require('../../config/connection');

const PayTypesGetDB = () => {
    const sqlSelect = "SELECT * FROM PAY_TYPES"

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();    
        })
    });
};

const salePostDB = (newSale) => {
    const { date_hour, total_amount, id_pay_type, details, cellphone_client } = newSale;
    let id_sale;
    let arrDetails = JSON.parse(details);

    const selectMaxIdSale = 'SELECT MAX(id_sale) AS last_id_sale FROM SALES';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);

            db.query(selectMaxIdSale, (error, row) => {
                if (error) reject('1:' + error);

                else id_sale = row[0].last_id_sale + 1;
            }) 
            db.beginTransaction((error) => {
                if (error) reject('1,5:' + error);
                const sqlInsertSale = `INSERT INTO SALES(id_sale, date_hour, total_amount, id_pay_type) VALUES(${id_sale}, '${date_hour}',${total_amount},${id_pay_type})`;

                db.query(sqlInsertSale, (error, result) => {
                    if (error) {
                        return db.rollback(() => reject('2:' + error))
                    }
                    for (let i = 0; i < arrDetails.length; i++) {

                        const sqlInsertSaleDetailSale = `INSERT INTO DETAIL_SALES VALUES(${i+1},${id_sale},${arrDetails[i].id_product},${arrDetails[i].quantity},${ arrDetails[i].subtotal})`;

                        db.query(sqlInsertSaleDetailSale, (error) => {
                            if (error) {
                                return db.rollback(() => reject('3:' + error));
                            }
                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() => reject('4:' + error));
                                }
                                else resolve();
                            });
                        });
                    };
                });
                db.release();
            });
            
        });
    });
};

const ProductXSupplyGetDB = () => {
    const sqlSelect = "SELECT * FROM PRODUCT_X_SUPPLY"

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


module.exports = { PayTypesGetDB, salePostDB, ProductXSupplyGetDB }