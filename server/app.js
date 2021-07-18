const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const app = express();
const productsRouter = require('./api/products/router');
const usersRouter = require('./api/users/router');
const permissionsRouter = require('./api/permissions/router');
const middleware = require('./middleware/index');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('web_client/build'));

/** Routes apis and errors */
app.use('/api', productsRouter);
app.use('/api', usersRouter);
app.use('/api', permissionsRouter);

app.use(middleware.error404);
app.use(middleware.error500);

module.exports = app;