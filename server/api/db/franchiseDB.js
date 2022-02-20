const pool = require('../../config/connection');

const franchiseGetDB = () => {
    const sqlSelect = 'SELECT * FROM FRANCHISES';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    })
}

const franchisePostDB = (newFranchise) => {
    const sqlInsert = 'INSERT INTO FRANCHISES VALUES(?,?,?,?,?,?,?,?,?,?)';

    const { name, start_date, address, address_number, city, province, name_manager, last_name_manager, dni_manager } = newFranchise;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [
                null,
                name,
                city,
                address,
                address_number,
                province,
                name_manager,
                last_name_manager,
                dni_manager,
                start_date
            ], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    })
}

const franchisePutDB = (idFranchise, franchise) => {
    const sqlUpdate = `UPDATE FRANCHISES SET name = ?, city = ?, address = ?, 
                        address_number = ?, province = ?, name_manager = ?, last_name_manager = ?, 
                        dni_manager = ?, start_date = ?
                        WHERE id_franchise = ?`;

    const { name, start_date, address, address_number, city, province, name_manager, last_name_manager, dni_manager } = franchise;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate, [name, city, address, address_number, province, name_manager, last_name_manager, dni_manager, start_date, idFranchise], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    })
}

const franchiseDeleteDB = (franchiseDeleteID) => {
    const sqlDelete = "DELETE FROM FRANCHISES WHERE id_franchise = ?"

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDelete, [franchiseDeleteID], (error) => {
                if (error) reject(error);
                else resolve();
            });
            db.release();
        })
    });
};

module.exports = { franchisePostDB, franchiseGetDB, franchisePutDB, franchiseDeleteDB }