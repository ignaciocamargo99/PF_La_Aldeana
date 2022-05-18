const pool = require('../../config/connection');

const salariesReportGetDB = (from, to) => {

    const sqlSelect = "SELECT s.id_salary, e.dni, e.name, e.last_name, s.month_year, s.salary_hs , s.subtotal, s.total, er.name AS name_emp_relationship FROM SALARIES s " +
                "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni " +
                "LEFT JOIN EMPLOYMENT_RELATIONSHIP er ON e.employment_relationship = er.id_employee_relationship " +
                "WHERE s.month_year >= '" + (from.length > 7 ? from : (from + '-01')) + "' AND s.month_year <= '" + (to.length > 7 ? to : (to + '-01')) + "'";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else {
                    let res = [];
                    let totals = [
                        {id: 'Hs. trabajadas/extras', quantity: 0},
                        {id: 'Recibo de sueldo', quantity: 0},
                        {id: 'Adicional', quantity: 0},
                        {id: 'Subtotal', quantity: 0},
                        {id: 'Descuentos y anticipos', quantity: 0},
                        {id: 'Total', quantity: 0}
                    ];
                    
                    result?.forEach((salarie) => {
                        let aux = res.find(resul => {return resul.dni === salarie.dni;});
                        if(aux === undefined){
                            aux = salarie;
                            aux.key = res.length;
                            aux.paycheck = 0;
                            aux.plus = 0;
                            aux.minus = 0;
                            aux.fullName = salarie.last_name + ', ' + salarie.name;
                            console.log(aux.fullName);

                            res[aux.key] = aux;
                        } else {
                            res[aux.key].subtotal += aux.salary_hs;
                            res[aux.key].subtotal += aux.subtotal;
                            res[aux.key].total += aux.total;
                        }

                        const sqlSelect = "SELECT * FROM DETAIL_SALARIES d JOIN CONCEPTS c ON c.id_concept = d.id_concept WHERE d.id_salary = " + aux.id_salary;

                        db.query(sqlSelect, (error, result) => {
                            if (error) reject(error);
                            else {
                                result?.map(detail => {
                                    if (detail.id_concept === 6) {
                                        aux.salary_hs += detail.amount;
                                        aux.paycheck += detail.amount;
                                        totals[0].quantity += detail.amount;
                                        totals[1].quantity += detail.amount;
                                    } else if (detail.id_concept > 6 && detail.positive === 1) {
                                        aux.plus += detail.amount;
                                        totals[2].quantity += detail.amount;
                                    } else if (detail.id_concept > 6){
                                        aux.minus += detail.amount;
                                        totals[4].quantity += detail.amount;
                                    }
                                });
                            }
                        });
                        totals[0].quantity += aux.salary_hs;
                        totals[3].quantity += aux.subtotal;
                        totals[5].quantity += aux.total;
                    });
                    
                    resolve({res, totals: totals});
                }
            });
            db.release();
        })
    });
}

module.exports = { salariesReportGetDB }