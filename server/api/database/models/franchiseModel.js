const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Franchise extends Model {}

Franchise.init(
    {
        id_franchise: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        name_manager: {
            type: DataTypes.STRING
        },
        last_name_manager: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'FRANCHISES',
        sequelize,
        modelName: 'franchise'
    }
);

module.exports = Franchise;
