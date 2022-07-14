const pool = require('../../config/connection');

const clientGetDB = (cellphone) => {
    console.log(cellphone)
    let sqlSelect;
    if (cellphone !== undefined) {
        sqlSelect = `SELECT * FROM CLIENTS WHERE cellphone = ${cellphone}`;
    }
    else {
        sqlSelect = `SELECT * FROM CLIENTS`;
    }

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

const clientPostDB = (newClient) => {
    const { cellphone, names, street_name, street_number, observation } = newClient

    const sqlInsertClient = `INSERT INTO CLIENTS(cellphone,names,street_name,street_number,observation) VALUES(${cellphone},'${names}','${street_name}',${street_number},'${observation}')`

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);

            db.query(sqlInsertClient, (error, result) => {
                if (error) reject('1:' + error);

                else resolve(result)
            });
            db.release();
        });
    });
};

const clientPutDB = (cellphone, address) => {

    const { street_name, street_number, observation } = address

    const sqlUpdateClient = `UPDATE CLIENTS SET street_name = '${street_name}', street_number = ${street_number}, observation = '${observation}' WHERE cellphone = ${cellphone}`

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);

            db.query(sqlUpdateClient, (error, result) => {
                if (error) reject('1:' + error);

                else resolve(result)
            });
            db.release();
        });
    });
};

module.exports = { clientGetDB, clientPostDB, clientPutDB };
