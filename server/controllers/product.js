const express = require("express");
const router = express.Router();

let products = require("../data/dummyDB");

router.get("/products", async (req, res) => {
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
});

module.exports = router;
