const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const FlavorFamily = require('./flavorFamily');
const FlavorType = require('./flavorType');

class Flavor extends Model { }

Flavor.init({
    // Model attributes are defined here
    idFlavor: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id_flavor'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    stock: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    reorderStock: {
        type: DataTypes.NUMBER,
        field: 'reorder_stock'
        // allowNull defaults to true
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    // Other model options go here
    tableName: 'FLAVORS',
    sequelize, // We need to pass the connection instance
    modelName: 'Flavor' // We need to choose the model name
});

Flavor.belongsTo(FlavorFamily, {
    foreignKey: 'family_flavor',
});

FlavorFamily.hasMany(Flavor, {
    foreignKey: 'family_flavor',
});

Flavor.belongsTo(FlavorType, {
    foreignKey: 'type_flavor',
});

FlavorType.hasMany(Flavor, {
    foreignKey: 'type_flavor',
});

module.exports = Flavor;
