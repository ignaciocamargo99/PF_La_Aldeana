
export default function backupAdvances (employee) {
    let aux = {
        nameEmployee: employee.name,
        lastName: employee.last_name,
        dni: employee.dni,
        date: employee.date_admission,
        id_charge: employee.charge,
        employmentRelationship: employee.employment_relationship
    }
    return aux;
}