export default function getNameCharge (charges, id) {
    let aux = '';
    charges?.map((e) => {
        // console.log(id)
        // console.log(e.id_product_type)
        // console.log(aux+' '+ e.id_product_type == id);
        if (e.id_charge === id) {
            aux = e.name;  
            return e.name;
        } 
    });
    return aux;
}