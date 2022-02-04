const pool = require('../../config/connection');

const productionPostDB = (newProduction) => {
    const dateProduction = newProduction.dateProduction;
    const flavors = newProduction.flavors;

    const sqlInsertProduction = `INSERT INTO PRODUCTIONS VALUES (?, ?)`;
    const sqlInsertProductions_x_Flavors = `INSERT INTO PRODUCTIONS_X_FLAVORS VALUES (?, ?, ?)`
    const sqlUpdate = "UPDATE FLAVORS SET stock = stock + ? WHERE id_flavor = ?";


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            // Get last id production to insert into PRODUCTIONS_X_FLAVORS
            const selectMaxIdProduction = 'SELECT MAX(id_production) AS last_id_production FROM PRODUCTIONS';
            let id_production;
            db.query(selectMaxIdProduction, (error, row) => {
                if (error) reject(error)
                else id_production = row[0].last_id_production + 1;
            });

            db.beginTransaction((error) => {
                if (error) reject(error);

                db.query(sqlInsertProduction, [null, dateProduction], (err, result) => {
                    if (error) {
                        return db.rollback(() => reject(error))
                    };
                    for (let i = 0; i < flavors.length; i++) {
                        db.query(sqlInsertProductions_x_Flavors, [id_production, flavors[i].id_flavor, flavors[i].amount], (error) => {
                            if (error) {
                                return db.rollback(() => reject(error));
                            }
                            db.query(sqlUpdate, [flavors[i].amount, flavors[i].id_flavor], (error) => {
                                if (error) {
                                    return db.rollback(() => reject(error));
                                }
                                db.commit((error) => {
                                    if (error) {
                                        return db.rollback(() => reject(error));
                                    }
                                    else resolve();
                                });
                            });
                        });
                    };
                    db.commit((error) => {
                        if (error) {
                            return db.rollback(() => reject(error));
                        }
                        else resolve();
                    });
                });
                db.release();
            });
        });
    });
};


const productionGetDB = () => {
    const sqlSelect = `SELECT p.*, pf.id_flavor, pf.quantity, f.name, f.description, SUM(pf.quantity) AS 'total_quantity'
                        FROM PRODUCTIONS p
                        JOIN PRODUCTIONS_X_FLAVORS pf ON pf.id_production = p.id_production
                        JOIN FLAVORS f ON f.id_flavor = pf.id_flavor
                        GROUP BY p.date_production
                        ORDER BY p.date_production DESC`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    })
}


const productionGetFlavorsDB = (id_production) => {
    const sqlSelect = `SELECT p.*, pf.id_flavor, pf.quantity, f.name, f.description
                        FROM PRODUCTIONS p
                        JOIN PRODUCTIONS_X_FLAVORS pf ON pf.id_production = p.id_production
                        JOIN FLAVORS f ON f.id_flavor = pf.id_flavor
                        WHERE p.id_production = ?`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [id_production] ,(error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    })
}


module.exports = { productionPostDB, productionGetDB, productionGetFlavorsDB };