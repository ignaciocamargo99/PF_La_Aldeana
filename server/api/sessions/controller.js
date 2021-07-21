const db = require("../../config/connection");

// [HTTP:GET]
async function getSessions(req, res) {

    const sqlSelect = `SELECT s.nick_user FROM SESSIONS s WHERE s.ending_date IS NULL`;

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

async function postSession (req, res) {
    
    const nick_user = req.body.nick_user;
    const start_date = new Date()

    const sqlInsert = `INSERT INTO SESSIONS (start_date,nick_user) VALUES (${start_date.getTime()},'${nick_user}')`

    await db.query(sqlInsert, [req.body], (err, result) => {
        if (result != null) res.send(result);
        else res.send(err);
})
};

async function updateSession (req, res) {

    const ending_date = new Date()

    const sqlUpdate = `UPDATE SESSIONS s SET s.ending_date = ${ending_date.getTime()} WHERE s.ending_date IS NULL AND s.nick_user = ?`

    await db.query(sqlUpdate, [req.params.nick], (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    })
};

module.exports = { getSessions, postSession, updateSession};