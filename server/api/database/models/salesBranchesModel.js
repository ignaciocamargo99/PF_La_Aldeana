const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Franchise = require('./franchiseModel');

class SalesBranches extends Model {}

SalesBranches.init(
    {
        id_sale_branch: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        charter: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.BIGINT
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'SALES_BRANCHES',
        sequelize,
        modelName: 'SalesBranches'
    }
);

SalesBranches.belongsTo(Franchise, {
    foreignKey: 'id_franchise'
});

Franchise.hasMany(SalesBranches, {
    foreignKey: 'id_franchise'
});

module.exports = SalesBranches;
