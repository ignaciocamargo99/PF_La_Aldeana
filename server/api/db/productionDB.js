const pool = require('../../config/connection');

const productionPostDB = (newProduction) => {
    const dateProduction = newProduction.dateProduction;
    const flavors = newProduction.flavors;

    const sqlInsert = "INSERT INTO PRODUCTIONS VALUES (?, ?, ?)";
    const sqlUpdate = "UPDATE FLAVORS SET stock = stock + ? WHERE id_flavor = ?";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) reject(error);

                for (let i = 0; i < flavors.length; i++) {
                    db.query(sqlInsert, [dateProduction, flavors[i].id_flavor, flavors[i].amount], (error) => {
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
                db.release();
            }); 
        });
    });
};

const productionGetDB = () => {
    const sqlSelect = `SELECT p.*, f.name, f.description 
                        FROM PRODUCTIONS p
                        JOIN FLAVORS f ON f.id_flavor = p.id_flavor`;

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

module.exports = { productionPostDB, productionGetDB};