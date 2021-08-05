const db = require('../../config/connection');

const franchisePostDB = (newFranchise) => {
    const sqlInsert = 'INSERT INTO FRANCHISE VALUES(?,?,?,?,?,?,?,?,?,?)';

    const { name, start_date, address, address_number, city, province, name_manager, last_name_manager, dni_manager } = newFranchise;

    return new Promise((resolve, reject) => {
        db.query(sqlInsert, [
            null,
            name,
            start_date,
            address,
            address_number,
            city,
            province,
            name_manager,
            last_name_manager,
            dni_manager
        ], (error) => {
            if (error) {
                console.log(error.sqlMessage);
                reject(error);
            }

            resolve();
        });
    })
}

const franchiseGetDB = () => {
    const sqlSelect = 'SELECT id_franchise, name FROM FRANCHISE';

    return new Promise((resolve, reject) => {
        db.query(sqlSelect,
            (error) => {
            if (error) {
                console.log(error.sqlMessage);
                reject(error);
            }

            resolve();
        });
    })
}

module.exports = { franchisePostDB, franchiseGetDB }