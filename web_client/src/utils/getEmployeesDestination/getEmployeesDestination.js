
export const getEmployeesDestination = (employees,employeesDestination,index) => {
    let elementToChange = employees[index]
    let employeeExist = employeesDestination.filter((employee) => employee.dni === elementToChange.dni)
    if(employeeExist.length === 0){
        employeesDestination = [...employeesDestination, elementToChange]
    }
    return employeesDestination
}