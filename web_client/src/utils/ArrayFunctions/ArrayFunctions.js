export const sumArray = (array) =>{
    let sum = 0;
    array.forEach(element => {
        sum = element + sum;
    });
    return sum
}

export const calculateTypeEmployees = (employees, charge) => {
    let counter = 0;
    employees.forEach(employee => {
        if(employee.charges[0].id === charge){
            counter ++
        }
    })
    return counter;
}