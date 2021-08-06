const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require("path");
const app = express();
const productsRouter = require('./api/products/router');
const usersRouter = require('./api/users/router');
const permissionsRouter = require('./api/permissions/router');
const sessionsRouter = require('./api/sessions/router');
const middleware = require('./middleware/index');
const franchiseRouter = require('./api/franchise/router');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('web_client/build'));
app.use(express.static(path.join(__dirname, './api/products/dbImages')));


app.get("/app/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../web_client/build/index.html"));
});

/** Routes apis and errors */
app.use('/api', productsRouter);
app.use('/api', usersRouter);
app.use('/api', permissionsRouter);
app.use('/api', sessionsRouter);
app.use('/api', franchiseRouter);

app.use(middleware.error404);
app.use(middleware.error500);

module.exports = app;