
const pool = require('../../config/connection');

const clientGetDB = () => {
    const sqlSelect = `SELECT * FROM CLIENTS c INNER JOIN ADDRESS a ON c.cellphone = a.cellphone_number`;

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


module.exports = { clientGetDB};