const EmployeeModel = require('../database/models/employeeModel');
const EmploymentRelationshipModel = require('../database/models/employmentRelationshipModel');

class EmployeeRepository {
    getEmployeeDBByDNI = (dni) => {
        return EmployeeModel.findOne({
            where: {
                dni: dni
            },
            include: [EmploymentRelationshipModel]
        });
    };
}

module.exports = new EmployeeRepository();
