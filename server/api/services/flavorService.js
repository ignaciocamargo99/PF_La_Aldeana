const { flavorsGetDB, typeFlavorGetDB, familyFlavorGetDB, chamberFlavorsDispatchPostDB } = require('../db/flavorDb');


const readFlavor = async () => {
    try {
        let res = await flavorsGetDB();
        return res;
    }
    catch {
        throw Error('Error. No se han podido leer los sabores de helado.')
    };
};

const readTypeFlavor = async () => {
    try {
        let res = await typeFlavorGetDB();
        return res;
    }
    catch {
        throw Error('Error. No se han podido leer los tipos de sabores de helado.')
    };
};

const readFamilyFlavor = async () => {
    try {
        let res = await familyFlavorGetDB();
        return res;
    }
    catch {
        throw Error('Error. No se han podido leer las familias de sabores de helado.')
    };
};

const createChamberFlavorsDispatch = async (newFlavorsToDispatch) => {
    try {
        let res = await chamberFlavorsDispatchPostDB(newFlavorsToDispatch);
        return res;
    }
    catch {
        throw Error('Error. No se han podido registrar las salidas de helados.')
    };
};


module.exports = { readFlavor, readTypeFlavor, readFamilyFlavor, createChamberFlavorsDispatch };