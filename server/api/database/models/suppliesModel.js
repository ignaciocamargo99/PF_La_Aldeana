const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Supplies extends Model {}

Supplies.init(
    {
        id_supply: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    },
    { tableName: 'SUPPLIES', sequelize, modelName: 'Supplies' }
);

module.exports = Supplies;
