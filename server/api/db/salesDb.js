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
                            for (let j = 0; j < arrDetails[i].listSupplies.length; j++) {
                                
                                let menos = parseInt(arrDetails[i].quantity) * arrDetails[i].listSupplies[j][0];
                                let resultado = arrDetails[i].listSupplies[j][1].stock_unit - parseInt(menos);
                                console.log(arrDetails[i].listSupplies[j][1].stock_unit); 
                                console.log(menos);
                                console.log(resultado); 
                                const sqlUpdateSupply = `UPDATE SUPPLIES SET stock_unit=${resultado} WHERE id_supply=${arrDetails[i].listSupplies[j][1].id_supply}`;
   
                                db.query(sqlUpdateSupply, (error) => {
                                    if (error) {
                                        return db.rollback(() => reject('4:' + error));
                                    }    
                                    db.commit((error) => {
                                        if (error) {
                                            return db.rollback(() => reject('5:' + error));
                                        }
                                        else resolve();
                                    });  
                                })        
                            }        
                        });
                    }; 
                });
                db.release();
            });
            
        });
    });
};

const saleDeliveryPostDB = (newSale) => {
    const { date_hour, total_amount, id_pay_type, details, cellphone_client } = newSale;
    let id_sale;
    let arrSuppliesToDiscount;
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
                
                const sqlInsertSale = `INSERT INTO SALES(id_sale, date_hour, total_amount, id_pay_type, cellphone_client) VALUES(${id_sale}, '${date_hour}',${total_amount},${id_pay_type},${cellphone_client})`;

                db.query(sqlInsertSale, (error, result) => {
                    if (error) {
                        return db.rollback(() => reject('2:' + error))
                    }
                    for (let i = 0; i < arrDetails.length; i++) {

                        const sqlSelectSuppliesToDiscount = `SELECT pxs.id_supply AS id_supply, pxs.number_supply AS quantity FROM PRODUCT_X_SUPPLY pxs WHERE pxs.id_product = ${arrDetails[i].id_product}`

                        db.query(sqlSelectSuppliesToDiscount, (error, suppliesQuantities) => {
                            if (error) reject('3:' + error);
            
                            else arrSuppliesToDiscount = suppliesQuantities
                        })

                        const sqlInsertSaleDetailSale = `INSERT INTO DETAIL_SALES VALUES(${i+1},${id_sale},${arrDetails[i].id_product},${arrDetails[i].quantity},${ arrDetails[i].subtotal})`;

                        db.query(sqlInsertSaleDetailSale, (error) => {
                            if (error) {
                                return db.rollback(() => reject('4:' + error));
                            }
                            for (let j = 0; j < arrSuppliesToDiscount.length; j++) {
                                
                                let discountTotal = parseInt(arrDetails[i].quantity) * parseInt(arrSuppliesToDiscount[j].quantity)
                                
                                const sqlUpdateSupply = `UPDATE SUPPLIES s SET s.stock_unit=(s.stock_unit - ${discountTotal})  WHERE id_supply=${arrSuppliesToDiscount[j].id_supply}`;
   
                                db.query(sqlUpdateSupply, (error) => {
                                    if (error) {
                                        return db.rollback(() => reject('5:' + error));
                                    }    
                                    db.commit((error) => {
                                        if (error) {
                                            return db.rollback(() => reject('6:' + error));
                                        }
                                        else resolve();
                                    });  
                                })        
                            }
                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() => reject('6:' + error));
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


module.exports = { PayTypesGetDB, salePostDB, saleDeliveryPostDB , ProductXSupplyGetDB }