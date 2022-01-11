const pool = require('../../config/connection');

const turnsGetDB = () => {
    const sqlSelect = 'SELECT * FROM COMPOUND_TURNS';

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

module.exports = { turnsGetDB }