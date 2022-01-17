const { readJDEmployee, createJDEmployee, modifyJDEmployee } = require('../services/jdEmployeeService')

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

// HTTP: POST
async function postJDEmployee(req, res) {
    try {
        await createJDEmployee(req.body);
        res.json({
            Ok: true,
            Message: 'Jordana cargada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: UPDATE
async function updateJDEmployee(req, res) {
    try {
        await modifyJDEmployee(req.body);
        res.json({
            Ok: true,
            Message: 'Dia laboral modificado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getJDEmployee, postJDEmployee, updateJDEmployee };