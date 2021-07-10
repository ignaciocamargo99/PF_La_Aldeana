const cors = require('cors');
const express = require('express');
const indexRouter = require('./routes/index');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

module.exports = app;