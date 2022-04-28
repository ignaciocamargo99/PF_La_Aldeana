const { getEmployeeDBByDNI } = require('../db/employeeRepository');

class EmployeeService {
    searchEmployeeByDNI = (dni) => {
        return getEmployeeDBByDNI(dni);
    };
}

module.exports = new EmployeeService();
