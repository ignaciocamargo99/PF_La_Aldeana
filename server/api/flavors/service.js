const { flavorsGetDB } = require('./db');

const readFlavors = async () => {
    try {
        let res = await flavorsGetDB();
        return res;
    }
    catch {
        let res = await flavorsGetDB();
        throw Error(res);
    };
};

module.exports = { readFlavors };