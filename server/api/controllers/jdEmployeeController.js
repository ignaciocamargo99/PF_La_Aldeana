const { readJDEmployee } = require('../services/jdEmployeeService')

// [HTTP:GET]
async function getJDEmployee(req, res) {
    try {
        const result = await readJDEmployee(req.query);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
};

module.exports = { getJDEmployee };