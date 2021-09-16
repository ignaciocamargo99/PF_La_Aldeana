export default function getNameCharge (charges, id) {
    let aux = '';
    charges?.forEach((e) => {
        if (e.id_charge === id) {
            aux = e.name;  
            return e.name;
        } 
    });
    return aux;
}