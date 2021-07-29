const db = require("../../config/connection");

// [HTTP:GET]
async function getPurchases(req, res) {

    const sqlSelect = `SELECT * FROM PURCHASES_SUPPLIES`;

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

async function getLastPurchase(req, res) {

    const sqlSelect = `SELECT MAX(p.purchase_number) AS last_number FROM PURCHASES_SUPPLIES p`;
    
    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}

async function postPurchase(req, res) {
    
    const datePurchase = req.body.date_purchase;
    const supplier = req.body.supplier;
    const total = req.body.total;
    const detailsPurchase = req.body.details;

    //INSERT compra
    const sqlInsertPurchase = `INSERT INTO PURCHASES_SUPPLIES (purchase_date,supplier,total) VALUES ('${datePurchase}','${supplier}',${total})`

    // Obtenemos la conexión contra la base de datos...
    db.getConnection(function (error, transactConnection) {

        // Inicia la transacción
        transactConnection.beginTransaction(function (error) {
            if (error) { throw error; }
            transactConnection.query(sqlInsertPurchase, function (error, results) {
                if (error) {
                    return transactConnection.rollback(function () {
                        throw error;
                    });
                }
                
                let sqlUpdateDetailsPurchase

                // INSERT details_purchase
                for (var i = 0; i < detailsPurchase.length; i++) {
                    sqlUpdateDetailsPurchase = `INSERT INTO DETAIL_PURCHASE_SUPPLIES(detail_number,purchase_number,id_supply,quantity,subtotal) VALUES (${i+1},${detailsPurchase[i].purchase_number},${detailsPurchase[i].id_supply},${detailsPurchase[i].quantity},${detailsPurchase[i].subtotal})`
                    transactConnection.query(sqlUpdateDetailsPurchase, function (error, results) {
                        if (error) {
                            transactConnection.rollback(function () {
                                throw error;
                            });
                        }
                    })
                }

                //UPDATE tabla Supplies con aumento de stock
                let sqlUpdate;

                for (var i = 0; i < detailsPurchase.length; i++) {

                    sqlUpdate = `UPDATE SUPPLIES SET stock_lot = stock_lot + ${detailsPurchase[i].quantity}, stock_unit = stock_unit + (${detailsPurchase[i].quantity} * unit_x_lot) WHERE id_supply = ${detailsPurchase[i].id_supply}`

                    transactConnection.query(sqlUpdate, function (error, results) {
                        if (error) {
                            transactConnection.rollback(function () {
                                throw error;
                            });
                        }
                        transactConnection.commit(function (error) {
                            if (error) {
                                return transactConnection.rollback(function () {
                                    throw error;
                                });
                            }
                            //res.send("Transacción correcta");
                        })
                    })
                
                }
            })
        })
    })
}

module.exports = { getPurchases, getLastPurchase, postPurchase};