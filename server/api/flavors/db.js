const pool = require('../../config/connection');

const flavorsGetDB = () => {
    const sqlSelect = 'SELECT id_flavor, name, stock FROM FLAVORS ' +
        'WHERE active = 1';

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

module.exports = { flavorsGetDB };