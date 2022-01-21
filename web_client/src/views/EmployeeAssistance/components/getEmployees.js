export default function getNameCharge (employees, dni) {
    let aux = '';
    employees?.forEach((e) => {
        if (e.dni === dni) {
            aux = e.name + " " + e.last_name;  
            return e.name + " " + e.last_name;
        } 
    });
    return aux;
}