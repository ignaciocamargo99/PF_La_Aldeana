
const pool = require('../../config/connection');

const licenseGetDB = () => {
    const sqlSelect = `SELECT l.id_license AS id_license, l.date_init AS date_init, l.date_finish AS date_finish, l.reason AS reason,
                    e.dni AS dni, e.name AS name, e.last_name AS last_name
                    FROM LICENSES l INNER JOIN EMPLOYEES e ON l.dni_employee = e.dni
                    WHERE l.active = 1
                    ORDER BY l.date_finish DESC
                    `;

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

const licenseCreateDB = (newLicense) => {
    let { date_init, date_finish, dni_employee, reason, active } = newLicense;

    const sqlInsert = `INSERT INTO LICENSES(date_init,date_finish,dni_employee,reason,active) VALUES('${date_init}','${date_finish}',${dni_employee},'${reason}',${active})`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const licenseUpdateDB = (idLicense, updateLicense) => {
    let { date_init, date_finish, dni_employee, reason} = updateLicense;

    const sqlUpdate = `UPDATE LICENSES SET date_init = '${date_init}', date_finish = '${date_finish}', 
                                dni_employee = ${dni_employee}, reason = '${reason}' WHERE id_license = '${idLicense}'`;


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const licenseDeleteDB = (idLicense) => {
    const sqlUpdate = `UPDATE LICENSES SET active = 0 WHERE id_license = ${idLicense}`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlUpdate, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = { licenseGetDB, licenseCreateDB, licenseUpdateDB, licenseDeleteDB};