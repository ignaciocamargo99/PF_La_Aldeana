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

/*
// [HTTP:POST]
async function postProductions(req, res) {
    try {
        const dateProduction = req.body.dateProduction;
        const jsonFlavors = req.body.flavors;
        let flavors = JSON.parse(jsonFlavors);

        await db.getConnection((error, transaction) => {

            transaction.beginTransaction((error) => {
                if (error) throw error;
                const sqlSelect =  "SELECT * FROM FLAVORS";

                transaction.query(sqlSelect, (error, result) => {
                    if (error) {
                        return transaction.rollback(() => { throw error; })
                    }
                    const sqlInsert = "INSERT INTO PRODUCTIONS " +
                                            "VALUES (?, ?, ?)";

                    for (let i = 0; i < flavors.length; i++) {
                        transaction.query(sqlInsert, [dateProduction, flavors[i].id_flavor, flavors[i].amount], (error, result) => {
                            if (error) {
                                transaction.rollback(() => { throw error; })
                            }
                            transaction.commit((error) => {
                                if (error) {
                                    return transaction.rollback(() => { throw error; })
                                }
                            })
                        })
                    }
                })
            })
        }
    )}
    catch {
        res.send("Faltan datos obligatorios o se produjo un error"); 
    }
};
*/

module.exports = { postProductions };   