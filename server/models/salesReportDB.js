const pool = require('../config/connection');

const salesReportGetDB = (from, to) => {
    /*
    let date = JSON.parse(dates)

    let from = date.from
    let to = date.to
    */

    const sqlSelect = `SELECT ds.id_product as id, ds.quantity, pt.name as product_type, s.date_hour as date_sale, p.name as name FROM DETAIL_SALES ds left join PRODUCTS p on ds.id_product = p.id_product left join SALES s on s.id_sale = ds.id_sale left join PRODUCT_TYPES pt on pt.id_product_type = p.id_product_type WHERE s.date_hour > '${from}' and s.date_hour <= '${to} 23:59:59'`

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else {
                    let res = [];
                    let total = 0;
                    let types = []
                    
                    for(const sale of result){
                        let i = res.find(resul => {return resul.id === sale.id})
                        if(i !== undefined && i !== null && i !== false){
                            res[i.key].quantity += sale.quantity
                            total += sale.quantity

                            types[i.keyType].quantity += sale.quantity
                        } else {

                            let j = types.find(resul => {return resul.id === sale.product_type})

                            if(j !== undefined && j !== null && j !== false){
                                sale.keyType = j.key

                                sale.key = res.length
                                total += sale.quantity
                                res = [...res, sale]
                                types[j.key].quantity += sale.quantity
                            } else {
                                let key = types.length
                                sale.keyType = key

                                sale.key = res.length
                                total += sale.quantity
                                res = [...res, sale]
                                types = [...types, {key: key, id: sale.product_type, quantity: sale.quantity}]
                            }
                        }
                    }

                    res = [...res, {total: total, types: types}]
                    resolve(res);
                }
            });
            db.release();
        })
    });
}

module.exports = { salesReportGetDB }