const { readPurchases, readLastPurchase, createPurchaseSupplies } = require('./service');

// HTTP: GET
async function getPurchases(req, res) {
    try {
        const result = await readPurchases();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: "Error al traer los datos de las compras",
            })
        }
    }
    
    // HTTP: GET
    async function getLastPurchase(req, res) {
        try {
            const result = await readLastPurchase();
            res.send(result)
        }
        catch (e) {
            res.json({
                Ok: false,
                Message: "Error a traer datos de la última compra",
            })
        }
    }

// HTTP: POST TRANSACTION
async function postPurchaseSupplies(req, res) {
    try {
        console.log(req.body)
        await createPurchaseSupplies(req.body);
        res.json({
            Ok: true,
            Message: 'Compra y detalle registrados correctamente.'
        });
    }
    catch (e) {
        console.log(e.message)
        res.json({
            Ok: false,
            Message: "No se pudo realizar correctamente el registro",
        })
    }
}

module.exports = {
    getPurchases, getLastPurchase, postPurchaseSupplies
}