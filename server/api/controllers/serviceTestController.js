// HTTP: GET
// async function getServerDateTime(req, res) {
async function getServerDateTime(req, res) {
    try {
        const result = new Date();
        res.json({
            Ok: true,
            Data: result
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    };
};

module.exports = { getServerDateTime };