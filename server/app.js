const cors = require('cors');
const express = require('express');
const indexRouter = require('./routes/index');
const logger = require('morgan');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('web_client/build'));

app.use('/api', indexRouter);

module.exports = app;