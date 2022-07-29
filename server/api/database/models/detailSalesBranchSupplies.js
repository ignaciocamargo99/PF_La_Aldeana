const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const SalesBranches = require('./salesBranchesModel');
const Supplies = require('./suppliesModel');

class DetailSalesBranchSupplies extends Model {}

DetailSalesBranchSupplies.init(
    {
        id_detail_sale_supply: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.NUMBER
        },
        subtotal: {
            type: DataTypes.FLOAT
        },
        id_sale_branch: {
            type: DataTypes.NUMBER,
            primaryKey: true
        }
    },
    {
        tableName: 'DETAIL_SALES_SUPPLIES',
        sequelize,
        modelName: 'DetailSalesSupplies'
    }
);

DetailSalesBranchSupplies.belongsTo(SalesBranches, {
    foreignKey: 'id_sale_branch'
});

SalesBranches.hasMany(DetailSalesBranchSupplies, {
    foreignKey: 'id_sale_branch'
});

DetailSalesBranchSupplies.belongsTo(Supplies, {
    foreignKey: 'id_supply'
});

Supplies.hasMany(DetailSalesBranchSupplies, {
    foreignKey: 'id_supply'
});

module.exports = DetailSalesBranchSupplies;
