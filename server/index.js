const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const port = process.env.PORT || 3001;
app.use(logger('dev'));
app.use(cors());

const productController = require("./controllers/product");
app.use("/api", productController);

app.listen(port, function () {
    console.log("Running on " + port);
});

module.exports = app;