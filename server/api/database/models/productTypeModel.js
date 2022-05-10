const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const SectorModel = require('./sectorModel');

class ProductTypeModel extends Model { }

ProductTypeModel.init({
    // Model attributes are defined here
    id_product_type: {
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
    send_delivery: {
        type: DataTypes.TINYINT
        // allowNull defaults to true
    },
    active: {
        type: DataTypes.BOOLEAN
        // allowNull defaults to true
    },
}, {
    // Other model options go here
    tableName: 'PRODUCT_TYPES',
    sequelize, // We need to pass the connection instance
    modelName: 'ProductTypeModel' // We need to choose the model name
});

ProductTypeModel.belongsTo(SectorModel, {
    foreignKey: 'id_sector',
});

SectorModel.hasMany(ProductTypeModel, {
    foreignKey: 'id_sector',
});

module.exports = ProductTypeModel;
