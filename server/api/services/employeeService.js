const {
    employeeGetDB,
    employeeDeleteDB,
    chargeGetDB,
    employeeCreateDB,
    employeeUpdateDB,
    dniEmployeeGetDB, employeeForDesktopGetDB,
} = require('../db/employeeDb');

const readEmployee = async (dni) => {
    try {
        let res = await employeeGetDB(dni);
        return mapEmployeesData(res);
    }
    catch (error) {
        throw Error(error)
    };
};

const readEmployeeForDesktop = async () => {
    try {
        let res = await employeeForDesktopGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const readEmployeebyDni = async (dniEmployee) => {
    try {
        let res = await dniEmployeeGetDB(dniEmployee);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};
const mapEmployeesData = (employeesDataDB) => {
    let allEmployeesMapped = [];

    employeesDataDB.forEach(empDB => {
        const employeeInList = employeeIsInList(allEmployeesMapped, empDB);

        if (employeeInList) {
            employeeInList.charges = [...employeeInList.charges, {
                chargeId: empDB.chargeId,
                chargeName: empDB.chargeName
            }];
        }
        else {
            employeeToAdd = {
                dni: empDB.dni,
                name: empDB.name,
                last_name: empDB.last_name,
                date: empDB.date_admission,
                employment_relationship: empDB.employment_relationship,
                name_emp_relationship: empDB.name_emp_relationship,
                charges: [{
                    chargeId: empDB.chargeId,
                    chargeName: empDB.chargeName
                }]
            };

            allEmployeesMapped.push(employeeToAdd);
        }
    });

    return allEmployeesMapped;
}

const employeeIsInList = (allEmployeesMapped, emp) => {
    return allEmployeesMapped.find(e => e.dni === emp.dni);
}

const readCharges = async () => {
    try {
        let res = await chargeGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const deleteEmployees = async (dniEmployee) => {
    try {
        let res = await employeeDeleteDB(dniEmployee);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createEmployee = async (newEmployee) => {
    try {
        let res = await employeeCreateDB(newEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const modifyEmployee = async (dniEmployee, updateEmployee) => {
    try {
        let res = await employeeUpdateDB(dniEmployee, updateEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = {
    createEmployee,
    deleteEmployees,
    modifyEmployee,
    readCharges,
    readEmployee,
    readEmployeeForDesktop,
    readEmployeebyDni,
};
