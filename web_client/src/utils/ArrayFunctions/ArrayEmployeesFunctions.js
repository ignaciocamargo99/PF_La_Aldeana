export const calculateEmployees = (employees, params) => {
    let sum = 0;
    params.forEach(element => {
        sum = element + sum;
    });
    sum = employees.length - sum;
    if (sum.toString() == 'NaN') { sum = '...' }
    if (sum < 0) { sum = 'Se están cargando más empleados que los existentes' }
    return sum;
}

export const calculateTypeEmployees = (employees, charge, turns, params) => {
    let counter = 0;
    employees?.forEach(employee => {
        if (employee.charges[0].chargeId === charge.id_charge) {
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