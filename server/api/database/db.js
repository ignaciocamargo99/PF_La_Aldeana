const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_DB,
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        dialect: 'mariadb',
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;
