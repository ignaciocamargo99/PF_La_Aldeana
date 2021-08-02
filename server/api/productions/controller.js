const db = require("../../config/connection");

// [HTTP:POST]
async function postProductions(req, res) {
    const dateProduction = req.body.dateProduction;
    const flavors = req.body.flavors;
    
    const sqlInsert =
        "INSERT INTO PRODUCTIONS " +
        "VALUES (?, ?, ?)";
    
    await db.query(sqlInsert, [dateProduction, flavors[0].id_flavor, flavors[0].amount], (err, result) => {
        if (result != null) res.send(result);
        else res.send(err);
    })
};

module.exports = { postProductions };   