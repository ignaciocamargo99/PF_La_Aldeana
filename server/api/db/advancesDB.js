const pool = require('../../config/connection');

const advancesGetDB = () => {
    const sqlSelect = "SELECT a.nroDNI, a.`date`, a.amount, a.pay, e.name, e.last_name  FROM ADVANCES a  left join EMPLOYEES e on a.nroDNI = e.dni";

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

const advancesDeleteDB = (dniEmployee) => {
    const sqlUpdate = 'UPDATE EMPLOYEES SET active = 0 WHERE dni = ?';
    let dni;
    if (dniEmployee) dni = dniEmployee
    else throw Error('El dni es null');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlUpdate, [dni], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const advancesCreateDB = (newEmployee) => {
    const sqlInsert = 'INSERT INTO EMPLOYEES VALUES(?,?,?,?,?,?,?)';
    let { dni, nameEmployee, lastName, id_charge, date, employmentRelationship } = newEmployee;
    if (dni && nameEmployee && lastName && id_charge && date && employmentRelationship && dni.length === 8) {
        dni = newEmployee.dni;
        nameEmployee = newEmployee.nameEmployee;
        lastName = newEmployee.lastName;
        id_charge = newEmployee.id_charge;
        date = newEmployee.date;
        employmentRelationship = newEmployee.employmentRelationship;
    }
    else throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [dni, nameEmployee, lastName, date, employmentRelationship, id_charge, 1], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const advancesUpdateDB = (dniEmployee, updateEmployee) => {
    const sqlUpdate = `UPDATE EMPLOYEES SET dni = ?, name = ?, last_name = ?, date_admission = ?, 
                        employment_relationship = ?, charge = ?
                        WHERE dni = ?`;

    let { dni, nameEmployee, lastName, id_charge, date, employmentRelationship, previousDni } = updateEmployee;
    if (dni && nameEmployee && lastName && id_charge && date && employmentRelationship && dni.length === 8) {
        dni = updateEmployee.dni;
        nameEmployee = updateEmployee.nameEmployee;
        lastName = updateEmployee.lastName;
        id_charge = updateEmployee.id_charge;
        date = updateEmployee.date;
        employmentRelationship = updateEmployee.employmentRelationship;
    }
    else throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate, [dni, nameEmployee, lastName, date, employmentRelationship, id_charge, dniEmployee], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = { advancesGetDB, advancesDeleteDB, advancesCreateDB, advancesUpdateDB };