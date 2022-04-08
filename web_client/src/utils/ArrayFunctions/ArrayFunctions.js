export const sumArray = (array) =>{
    let sum = 0;
    array.forEach(element => {
        sum = element + sum;
    });
    return sum
}

export const calculateTypeEmployees = (employees, charge, turns, params) => {
    let counter = 0;
    employees?.forEach(employee => {
        if(employee.charges[0].chargeId === charge.id_charge){
            counter ++
        }
    })
    turns?.forEach((turn, i) => {
        if(turn.name.includes(charge.name.slice(0,3)))
        {
            counter = counter - params[i]
        }
    })
    if(counter.toString() == 'NaN'){ counter = '...'}
    return counter;
}