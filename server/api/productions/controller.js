const db = require("../../config/connection");

async function postProductions(req, res) {
    const dateProduction = req.body.dateProduction;
    const flavors = req.body.flavors;

    const sqlInsert = "INSERT INTO PRODUCTIONS " +
                      "VALUES (?, ?, ?)";

    for (let i = 0; i < flavors.length; i++) {
        if (flavors[i].id_flavor) {
            await db.query(sqlInsert, [dateProduction, flavors[i].id_flavor, flavors[i].amount], (err, result) => {
                
            }) 
        }   
    } 
}

module.exports = { postProductions };   