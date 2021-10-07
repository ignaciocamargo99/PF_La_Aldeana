const { advancesGetDB, installmentsGetDB, advancesDeleteDB, advancesCreateDB, advancesUpdateDB } = require('../db/advancesDB');

const readAdvances = async () => {
    try {
        let res = await advancesGetDB();
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const readInstallments = async (dniEmployee, date) => {
    try {
        let res = await installmentsGetDB(dniEmployee, date);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

const deleteAdvance = async (dniEmployee, date) => {
    try {
        let res = await advancesDeleteDB(dniEmployee, date);
        return res;
    }
    catch(error){
        throw Error(error)
    };
};

const createAdvances = async (newAdvance) => {
    try {
        let res = await advancesCreateDB(newAdvance);
        return res;
    }
    catch(error) {
        console.log(newAdvance)
        console.log(error);
        throw Error(error);
    };
};

const modifyAdvances = async (dniEmployee, date, updateAdvance) => {
    try {
        let res = await advancesUpdateDB(dniEmployee, date, updateAdvance);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

module.exports = { readAdvances, readInstallments, deleteAdvance, createAdvances, modifyAdvances };