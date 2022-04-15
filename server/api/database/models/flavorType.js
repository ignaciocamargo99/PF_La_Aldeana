const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class FlavorType extends Model { }

FlavorType.init({
    // Model attributes are defined here
    idFlavorType: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id_type_flavor'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
}, {
    // Other model options go here
    tableName: 'FLAVOR_TYPES',
    sequelize, // We need to pass the connection instance
    modelName: 'FlavorType' // We need to choose the model name
});

module.exports = FlavorType;
