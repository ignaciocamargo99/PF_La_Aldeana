const pool = require('../../config/connection');

const fingerPrintsGetDB = () => {
    const sqlSelect = `SELECT fp.dniEmployee, e.name, e.last_name, fp.finger_print
                    FROM FINGER_PRINTS fp
                    INNER JOIN EMPLOYEES e ON e.dni = fp.dniEmployee`;

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

const fingerPrintsByDniGetDB = (dniEmployee) => {
    const sqlSelect = `SELECT dniEmployee, finger
                    FROM FINGER_PRINTS WHERE dniEmployee = ${dniEmployee}`;

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

const fingerPrintCreateDB = (newFingerPrint) => {
    let {dni, finger, fingerPrint} = newFingerPrint;

    const sqlInsert = 'INSERT INTO FINGER_PRINTS (dniEmployee, finger, finger_print) VALUES(?,?,?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [dni, finger, fingerPrint], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const fingerPrintDeleteDB = (fingerPrint) => {
    let {dniEmployee, finger} = fingerPrint
    const sqlUpdate = 'DELETE FROM FINGER_PRINTS WHERE finger = ? AND dniEmployee = ?';
    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlUpdate, [finger, dniEmployee], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = { fingerPrintCreateDB, fingerPrintsGetDB, fingerPrintsByDniGetDB, fingerPrintDeleteDB };