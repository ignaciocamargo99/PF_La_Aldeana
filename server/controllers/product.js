
let products = require("../data/dummyDB");

async function getProducts(req, res) {
    try {
        res.status(200).json({
            data: products
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
};

module.exports = {getProducts};
