const pool = require('../../config/connection');

const assistanceEmployeeCreateDB = (newAssistance) => {
    const sqlInsert = 'INSERT INTO ASSISTANCE_EMPLOYEES VALUES(?,?,?,?)';

    if (!newAssistance.date_entry || !newAssistance.employee) throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlInsert, [null, newAssistance.date_entry, newAssistance.date_egress, newAssistance.employee], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const allEmployeeAssistancesGetDB = () => {
    const sqlSelect = `
            SELECT ae.id_assistance, CONVERT_TZ(ae.date_entry,'-00:00','-03:00') AS date_entry, CONVERT_TZ(ae.date_egress,'-00:00','-03:00') AS date_egress, ae.employee, e.name, e.last_name
            FROM ASSISTANCE_EMPLOYEES ae
            JOIN EMPLOYEES e ON ae.employee = e.dni `

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

const employeeAssistanceGetDB = () => {
    const sqlSelect = `
            SELECT ae.id_assistance, CONVERT_TZ(ae.date_entry,'-00:00','-03:00') AS date_entry, CONVERT_TZ(ae.date_egress,'-00:00','-03:00') AS date_egress, ae.employee, e.name, e.last_name
            FROM ASSISTANCE_EMPLOYEES ae
            JOIN EMPLOYEES e ON ae.employee = e.dni
            WHERE (CAST(ae.date_entry AS DATE) = CURDATE() - 1) `

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


const assistanceDeleteDB = (dniEmployee, date_entry) => {
    const sqlDelete = 'DELETE FROM ASSISTANCE_EMPLOYEES WHERE employee = ? AND date_entry = ?';
    let dni, date;
    if (dniEmployee && date_entry) {
        dni = dniEmployee
        date = date_entry
    }
    else throw Error('El dni o la fecha es null');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDelete, [dni, date], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const employeeAssistanceUpdateDB = (dniEmployee, updateAssistanceEmployee) => {
    const sqlUpdate = `UPDATE ASSISTANCE_EMPLOYEES SET date_entry = ?, date_egress = ?
                        WHERE employee = ? AND date_entry = ?`;

    let { date_entry, date_egress, dni, lastDateEntry } = updateAssistanceEmployee;

    if (!date_entry && !dniEmployee) {
        throw Error('Faltan datos obligatorios');
    }

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate, [date_entry, date_egress, dni, lastDateEntry], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = {
    assistanceEmployeeCreateDB, employeeAssistanceGetDB,
    assistanceDeleteDB, employeeAssistanceUpdateDB, allEmployeeAssistancesGetDB
};