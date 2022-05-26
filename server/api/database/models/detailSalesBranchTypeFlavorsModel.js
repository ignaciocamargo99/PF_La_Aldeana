const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const SalesBranches = require('./salesBranchesModel');
const FlavorType = require('./flavorType');

class DetailSalesBranchTypeFlavor extends Model {}

DetailSalesBranchTypeFlavor.init(
    {
        id_detail_sale_type_flavor: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT
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
        tableName: 'DETAIL_SALES_TYPE_FLAVORS',
        sequelize,
        modelName: 'DetailSalesTypeFlavors'
    }
);

DetailSalesBranchTypeFlavor.belongsTo(SalesBranches, {
    foreignKey: 'id_sale_branch'
});

SalesBranches.hasMany(DetailSalesBranchTypeFlavor, {
    foreignKey: 'id_sale_branch'
});

DetailSalesBranchTypeFlavor.belongsTo(FlavorType, {
    foreignKey: 'id_type_flavor'
});

FlavorType.hasMany(DetailSalesBranchTypeFlavor, {
    foreignKey: 'id_type_flavor'
});

module.exports = DetailSalesBranchTypeFlavor;
