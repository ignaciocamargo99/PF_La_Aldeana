const { getEmployeeDBByDNI, getEmployeeDBDateEntry} = require('../db/employeeRepository');

class EmployeeService {
    searchEmployeeByDNI = (dni) => {
        return getEmployeeDBByDNI(dni);
    };

    employeesDateEntry = (date) => {
        return getEmployeeDBDateEntry(date);
    };
}

module.exports = new EmployeeService();
