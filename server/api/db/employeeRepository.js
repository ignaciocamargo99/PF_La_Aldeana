const EmployeeModel = require('../database/models/employeeModel');
const EmploymentRelationshipModel = require('../database/models/employmentRelationshipModel');
const { Op } = require('sequelize');
class EmployeeRepository {
    getEmployeeDBByDNI = (dni) => {
        return EmployeeModel.findOne({
            where: {
                dni: dni
            },
            include: [EmploymentRelationshipModel]
        });
    };

    getEmployeeDBDateEntry = (date) => {
        return EmployeeModel.findAll({
            where: {
                date_admission:{
                    [Op.lte]: date
                }
            },
            include: [EmploymentRelationshipModel]
        });
    };
}

module.exports = new EmployeeRepository();
