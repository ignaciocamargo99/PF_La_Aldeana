const pool = require('../config/connection');

const salesReportGetDB = () => {
    const sqlSelect = 'SELECT id_product as id, quantity FROM DETAIL_SALES ds'

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else {
                    let res = [];
                    let total = 0;
                    
                    for(const sale of result){
                        let i = res.find(resul => {return resul.id === sale.id})
                        if(i !== undefined && i !== null && i !== false){
                            res[i.key].quantity += sale.quantity
                            total += sale.quantity
                        } else {
                            sale.key = res.length
                            sale.original = sale.quantity
                            total += sale.quantity
                            res = [...res, sale]
                        }
                    }

                    res = [...res, {total: total}]
                    resolve(res);
                }
            });
            db.release();
        })
    });
}

module.exports = { salesReportGetDB }