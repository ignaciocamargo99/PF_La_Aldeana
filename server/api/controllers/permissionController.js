const db = require("../../config/connection");

// [HTTP:GET]
async function getPermissions(req, res) {

    const sqlSelect = "SELECT p.name FROM PERMISSIONS p";

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

// [HTTP:GET:nick]
async function getPermissionsRol(req, res) {

    const sqlSelect = "SELECT p.name FROM ROL_X_PERMISSION rp INNER JOIN PERMISSIONS p ON rp.id_permission=p.id_permission WHERE rp.id_rol= ?" /*"SELECT u.nick_user, u.first_name, u.last_name, u.password, r.name as Rol " + 
    "FROM USERS u " + 
    "INNER JOIN ROLES r ON u.id_rol = r.id_rol " + 
    "WHERE u.nick_user = ?"*/;

    await db.query(sqlSelect, [req.params.rol], (err, result) => {
        if (result != null) res.send(result);
        else res.send(err);
    })
};

module.exports = { getPermissions, getPermissionsRol};