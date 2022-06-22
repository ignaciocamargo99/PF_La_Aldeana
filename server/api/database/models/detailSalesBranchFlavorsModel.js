const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const SalesBranches = require('./salesBranchesModel');
const Flavor = require('./flavor');

class DetailSalesBranchFlavor extends Model {}

DetailSalesBranchFlavor.init(
    {
        id_detail_sale_flavor: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        id_sale_branch: {
            type: DataTypes.NUMBER,
            primaryKey: true
        }
    },
    {
        tableName: 'DETAIL_SALES_FLAVORS',
        sequelize,
        modelName: 'DetailSalesFlavors'
    }
);

DetailSalesBranchFlavor.belongsTo(SalesBranches, {
    foreignKey: 'id_sale_branch'
});

SalesBranches.hasMany(DetailSalesBranchFlavor, {
    foreignKey: 'id_sale_branch'
});

DetailSalesBranchFlavor.belongsTo(Flavor, {
    foreignKey: 'id_flavor'
});

Flavor.hasMany(DetailSalesBranchFlavor, {
    foreignKey: 'id_flavor'
});

module.exports = DetailSalesBranchFlavor;
