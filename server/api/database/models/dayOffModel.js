const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class DayOffModel extends Model { }

DayOffModel.init({
    // Model attributes are defined here
    id_day_off: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    dni_employee: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    tableName: 'DAYS_OFF',
    sequelize, // We need to pass the connection instance
    modelName: 'DayOff' // We need to choose the model name
});

module.exports = DayOffModel;
