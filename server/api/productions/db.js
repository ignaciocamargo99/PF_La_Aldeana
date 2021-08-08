const pool = require('../../config/connection');

const productionPostDB = (newProduction) => {
    const dateProduction = newProduction.dateProduction;
    const flavors = newProduction.flavors;

    const sqlInsert = "INSERT INTO PRODUCTIONS VALUES (?, ?, ?)";

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
                        db.commit((error) => {
                            if (error) {
                                return db.rollback(() => reject(error));
                            }
                            else resolve();
                        });
                    });
                };
                db.release();
            }); 
        });
    });
};

module.exports = { productionPostDB };