export const calculateEmployees = (employees, params, disabledEmployees) => {
    let sum = 0;
    let enabledsEmployees = employees.filter((employee) => !disabledEmployees.has(employee.dni))
    params.forEach(element => {
        sum = element + sum;
    });
    sum = enabledsEmployees.length - sum;
    if (sum.toString() == 'NaN') { sum = '...' }
    if (sum < 0) { sum = 'Se están cargando más empleados que los existentes' }
    return sum;
}

export const calculateTypeEmployees = (employees, charge, turns, params, disabledEmployees) => {
    let counter = 0;
    employees?.forEach(employee => {
        if (employee.charges[0].chargeId === charge.id_charge && !disabledEmployees.has(employee.dni)) {
            counter++
        }
    })
    turns?.forEach((turn, i) => {
        if (turn.name.includes(charge.name.slice(0, 3))) {
            counter = counter - params[i]
        }
    })
    if (counter.toString() == 'NaN') { counter = '...' }
    if (counter < 0) { counter = `Se están cargando más ${charge.name} que los existentes` }
    return counter;
}

export const filledWith = (array, element) => {

    return array.every((content) => content === element)

}