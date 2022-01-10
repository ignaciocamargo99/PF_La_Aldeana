const { employeeGetDB, employeeDeleteDB, chargeGetDB, employeeCreateDB,
    employeeUpdateDB, assistanceEmployeeCreateDB, employeeAssistanceGetDB,
    assistanceDeleteDB, employeeAssistanceUpdateDB } = require('../db/employeeDb');

const readEmployee = async (dni) => {
    try {
        let res = await employeeGetDB(dni);
        return mapEmployeesData(res);
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
            employeeInList.charges = [...employeeInList.charges, empDB.charge]
        }
        else {
            employeeToAdd = {
                dni: empDB.dni,
                name: empDB.name,
                last_name: empDB.last_name,
                date_admission: empDB.date_admission,
                employment_relationship: empDB.employment_relationship,
                name_emp_relationship: empDB.name_emp_relationship,
                charges: [empDB.charge]
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


const createAssistanceEmployee = async (newAssistance) => {
    try {
        let res = await assistanceEmployeeCreateDB(newAssistance);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};


const readEmployeeAssistance = async () => {
    try {
        let res = await employeeAssistanceGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const deleteAssistanceEmployee = async (dniEmployee, date_entry) => {
    try {
        let res = await assistanceDeleteDB(dniEmployee, date_entry);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const modifyAssistanceEmployee = async (dniEmployee, updateAssistanceEmployee) => {
    try {
        let res = await employeeAssistanceUpdateDB(dniEmployee, updateAssistanceEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};


module.exports = {
    readEmployee, deleteEmployees, readCharges, createEmployee,
    modifyEmployee, createAssistanceEmployee, readEmployeeAssistance,
    deleteAssistanceEmployee, modifyAssistanceEmployee
};