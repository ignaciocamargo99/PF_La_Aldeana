const pool = require('../../config/connection');

const turnsGetDB = () => {
    const sqlSelect = `SELECT 
                            ct.id AS id, 
                            ct.name AS name, 
                            ct.abbreviation AS abbreviation, 
                            t.id AS id_turn, 
                            t.name AS turn_name, 
                            t.abbreviation AS turn_abbreviation,
                            t.init_time,
                            t.finish_time
                        FROM 
                            COMPOUND_TURNS ct 
                            INNER JOIN COMPOUND_TURNS_X_TURNS ctxt ON ct.id = ctxt.id_compound_turn
                            INNER JOIN TURNS t ON ctxt.id_turn = t.id`;

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