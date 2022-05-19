const sequelize = require('../database/db');
const { Op } = require('sequelize');
const SalesBranches = require('../database/models/salesBranchesModel');
const Franchise = require('../database/models/franchiseModel');
const DetailSalesBranchFlavor = require('../database/models/detailSalesBranchFlavorsModel');

const readSalesBranchDB = async (params) => {
    const { startDate, endDate } = params;

    const sale = await SalesBranches.findAll({
        include: Franchise,
        where: {
            date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        }
    });

    return sale;
};

const saveSalesBranchDB = async (salesData) => {
    const { date, amount, charter, status, id_franchise, flavors } = salesData;
    console.log(flavors);

    let transaction;
    try {
        transaction = await sequelize.transaction();

        const sale = await SalesBranches.create(
            {
                date,
                amount,
                charter,
                id_franchise,
                status
            },
            { transaction }
        );

        const { id_sale_branch } = sale.dataValues;

        await asyncForeach(flavors, id_sale_branch, transaction);

        console.log('success');
        await transaction.commit();
    } catch (error) {
        console.log('error');
        console.log(error);
        if (transaction) {
            await transaction.rollback();
        }
        throw 'Se produjo un error al realizar la transacción.';
    }
};

const asyncForeach = async (flavors, id_sale_branch, transaction) => {
    for (let i = 0; i < flavors.length; i++) {
        const { id_flavor, quantity } = flavors[i];
        await DetailSalesBranchFlavor.create(
            { id_sale_branch, id_flavor, quantity },
            { transaction }
        );
    }
};

module.exports = {
    readSalesBranchDB,
    saveSalesBranchDB
};
