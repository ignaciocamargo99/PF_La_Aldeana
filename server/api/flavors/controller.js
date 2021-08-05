const db = require("../../config/connection");

// [HTTP:GET]
async function getFlavors(req, res) {

    const sqlSelect = "SELECT id_flavor, name FROM FLAVORS";

    await db.query(sqlSelect, (err, result) => { 
        if (result != null) res.send(result);
        else res.send(err);
    })
};  


module.exports = { getFlavors };  