const db = require("../../config/connection");

// [HTTP:GET]
async function getUsers(req, res) {

    const sqlSelect = "SELECT u.nick_user, u.first_name, u.last_name, u.password, r.name as Rol " + 
    "FROM USERS u " + 
    "INNER JOIN ROLES r ON u.id_rol = r.id_rol";

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

// [HTTP:GET:nick]
async function getUsersByNick(req, res) {

    const sqlSelect = "SELECT u.nick_user, u.first_name, u.last_name, u.password, r.name as Rol " + 
    "FROM USERS u " + 
    "INNER JOIN ROLES r ON u.id_rol = r.id_rol " + 
    "WHERE u.nick_user = ?";

    await db.query(sqlSelect, [req.params.nick], (err, result) => {
        if (result != null) res.send(result);
        else res.send(err);
    })
};

async function postUser(req, res) {
    const nick = req.body.nick_user;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const id_rol = req.body.id_rol;

    const sqlInsert =
        "INSERT INTO USERS (nick_user, first_name, last_name, password, id_rol) " +
        "VALUES ('"+ nick +"','"+ first_name +"','"+ last_name +"','"+ password +"',"+ id_rol + ")";
        //"VALUES (?)";

    await db.query(sqlInsert, [req.body], (err, result) => {
        if (result != null) res.send(result);
        else res.send(err);
})
};

async function getLogin(req, res) {

    const sqlSelect =
        "SELECT nick_user, password, id_rol " +
        "FROM USERS " + 
        "WHERE condicion AND condicion";


}



module.exports = { getUsers, getUsersByNick, postUser};




