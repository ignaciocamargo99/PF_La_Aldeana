const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class SalesBranches extends Model {}

Flavor.init(
    {},
    {
        tableName: 'SALES_BRANCHES',
        sequelize,
        modelName: 'SalesBranches'
    }
);
