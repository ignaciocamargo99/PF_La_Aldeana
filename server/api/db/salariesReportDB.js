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
                    let totals = [];
                    
                    result?.forEach((salarie) => {
                        let aux = res.find(resul => {return resul.dni === salarie.dni;});
                        if(aux !== undefined && aux !== null && aux !== false){
                            aux = salarie;
                            aux.key = res.length;
                            aux.paycheck = 0;
                            aux.plus = 0;
                            aux.minus = 0;

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
                                        totals[1] += detail.amount;
                                        totals[2] += detail.amount;
                                    } else if (detail.id_concept > 6 && detail.positive === 1) {
                                        aux.plus += detail.amount;
                                        totals[3] += detail.amount;
                                    } else if (detail.id_concept > 6){
                                        aux.minus += detail.amount;
                                        totals[5] += detail.amount;
                                    }
                                });
                            }
                        });
                        totals[0] += aux.salary_hs;
                        totals[2] += aux.salary_hs;
                        totals[4] += aux.subtotal;
                        totals[6] += aux.total;
                    });
                    
                    resolve({res, totals: totals});
                }
            });
            db.release();
        })
    });
}

module.exports = { salariesReportGetDB }