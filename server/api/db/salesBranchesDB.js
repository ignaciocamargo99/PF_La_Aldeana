const sequelize = require('../database/db');
const { Op } = require('sequelize');
const SalesBranches = require('../database/models/salesBranchesModel');
const Franchise = require('../database/models/franchiseModel');
const DetailSalesBranchFlavor = require('../database/models/detailSalesBranchFlavorsModel');
const DetailSalesBranchTypeFlavor = require('../database/models/detailSalesBranchTypeFlavorsModel');
const Flavor = require('../database/models/flavor');
const Supplies = require('../database/models/suppliesModel');

const readSalesBranchDB = async (params) => {
    const { startDate, endDate, status: statusSale } = params;

    let whereExpresion = {
        status: {
            [Op.eq]: statusSale
        }
    };
    if (statusSale === 'FINISH') {
        whereExpresion.date = {
            [Op.gte]: startDate,
            [Op.lte]: endDate
        };
    }

    const sale = await SalesBranches.findAll({
        include: Franchise,
        where: whereExpresion,
        attributes: ['id_sale_branch', 'date', 'status', 'amount']
    });

    return sale;
};

const readSalesBranchByIdDB = async (id) => {
    const sale = await SalesBranches.findOne({
        include: [
            Franchise,
            DetailSalesBranchFlavor,
            DetailSalesBranchTypeFlavor
        ],
        where: { id_sale_branch: id }
    });
    if (!sale) throw 'La venta no existe';
    return sale;
};

const saveSalesBranchDB = async (salesData) => {
    const {
        date,
        amount,
        charter,
        status,
        id_franchise,
        flavors,
        type_flavors,
        supplies
    } = salesData;

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

        await asyncForeachFlavors(flavors, id_sale_branch, status, transaction);

        await asyncForeachTypeFlavors(
            type_flavors,
            id_sale_branch,
            transaction
        );

        // falta esta funcion
        await asyncForeachSupplies(supplies, id_sale_branch, transaction);

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

const putSalesBranchDB = async (id_sale_branch, body) => {
    const { amount, charter, status, flavors, type_flavors, supplies } = body;
    let transaction;

    try {
        transaction = await sequelize.transaction();

        await SalesBranches.update(
            {
                amount,
                charter,
                status
            },
            { where: { id_sale_branch } },
            { transaction }
        );

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

// -------------------------------------- Funciones usadas por los endpoints --------------------------------------
const asyncForeachFlavors = async (
    flavors,
    id_sale_branch,
    status,
    transaction
) => {
    for (let i = 0; i < flavors.length; i++) {
        const { id_flavor, quantity } = flavors[i];
        await DetailSalesBranchFlavor.create(
            { id_sale_branch, id_flavor, quantity },
            { transaction }
        );
    }
    if (status === 'READY') {
        for (let i = 0; i < flavors.length; i++) {
            const { id_flavor, quantity } = flavors[i];
            const flavor = await Flavor.findOne({
                where: { id_flavor }
            });
            console.log(flavor);
            const newStock = flavor.stock - quantity;
            console.log('nuevo stock: ', newStock);
            await Flavor.update(
                { stock: newStock },
                { where: { id_flavor } },
                { transaction }
            );
        }
    }
};

const asyncForeachTypeFlavors = async (
    type_flavors,
    id_sale_branch,
    transaction
) => {
    for (let i = 0; i < type_flavors.length; i++) {
        const { id_type_flavor, weight, subtotal } = type_flavors[i];
        await DetailSalesBranchTypeFlavor.create(
            { id_sale_branch, id_type_flavor, weight, subtotal },
            { transaction }
        );
    }
};

// falta definir esta funcion
const asyncForeachSupplies = async (
    supplies,
    id_sale_branch,
    transaction
) => {};
// -------------------------------------- Funciones usadas por los endpoints --------------------------------------

module.exports = {
    readSalesBranchDB,
    readSalesBranchByIdDB,
    saveSalesBranchDB,
    putSalesBranchDB
};
