
//let products = require("../data/dummyDB");
const db = require("../connection");


async function getProducts(req, res) {

    const sqlSelect = "SELECT * FROM PRODUCTS";
    
    // Get connection
    await db.getConnection()
        .then(conn => {
            conn.query(sqlSelect, (err, result) => {
                if (err) throw err;
                else res.send(result);
            })
            .then(rows => {
                console.log(rows)
            })
        })
};

module.exports = { getProducts };
