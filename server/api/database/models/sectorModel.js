const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class SectorModel extends Model { }

SectorModel.init({
    // Model attributes are defined here
    id_sector: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
}, {
    // Other model options go here
    tableName: 'SECTORS',
    sequelize, // We need to pass the connection instance
    modelName: 'SectorModel' // We need to choose the model name
});

module.exports = SectorModel;
