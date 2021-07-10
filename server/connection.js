require('dotenv').config();

const mariadb = require('mysql');


const data_base = mariadb.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    port: process.env.PORT_DB,
})

module.exports = data_base;