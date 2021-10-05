const { advancesGetDB, advancesDeleteDB, advancesCreateDB, advancesUpdateDB } = require('../db/advancesDB');

const readAdvances = async () => {
    try {
        let res = await advancesGetDB();
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const deleteAdvance = async (dniEmployee) => {
    try {
        let res = await advancesDeleteDB(dniEmployee);
        return res;
    }
    catch(error){
        throw Error(error)
    };
};

const createAdvances = async (newEmployee) => {
    try {
        let res = await advancesCreateDB(newEmployee);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

const modifyAdvances = async (dniEmployee, updateEmployee) => {
    try {
        let res = await advancesUpdateDB(dniEmployee, updateEmployee);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

module.exports = { readAdvances, deleteAdvance, createAdvances, modifyAdvances };