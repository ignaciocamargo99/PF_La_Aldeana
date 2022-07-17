const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const SupplyType = require('./supplyType');

class Supplies extends Model { }

Supplies.init(
    {
        id_supply: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        price_wholesale: {
            type: DataTypes.NUMBER,
            // allowNull defaults to true
        },
        stock_unit: {
            type: DataTypes.NUMBER,
            // allowNull defaults to true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
    },
    { tableName: 'SUPPLIES', sequelize, modelName: 'Supplies' }
);

Supplies.belongsTo(SupplyType, {
    foreignKey: 'id_supply_type',
});

SupplyType.hasMany(Supplies, {
    foreignKey: 'id_supply_type',
});

module.exports = Supplies;
