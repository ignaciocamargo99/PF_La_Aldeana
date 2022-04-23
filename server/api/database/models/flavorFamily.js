const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class FlavorFamily extends Model { }

FlavorFamily.init({
    // Model attributes are defined here
    idFlavorFamily: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id_family_flavor'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    // Other model options go here
    tableName: 'FLAVOR_FAMILIES',
    sequelize, // We need to pass the connection instance
    modelName: 'FlavorFamily' // We need to choose the model name
});

module.exports = FlavorFamily;
