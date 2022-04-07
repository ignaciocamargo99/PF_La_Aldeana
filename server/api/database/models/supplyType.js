const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class SupplyType extends Model { }

SupplyType.init({
    // Model attributes are defined here
    id_supply_type: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    tableName: 'SUPPLY_TYPES',
    sequelize, // We need to pass the connection instance
    modelName: 'SupplyType' // We need to choose the model name
});

module.exports = SupplyType;
