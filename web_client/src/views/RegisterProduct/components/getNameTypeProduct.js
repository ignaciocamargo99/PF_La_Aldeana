export default function getNameTypeProduct (types, id) {
    let aux = '';
    types?.map((e) => {
        // console.log(id)
        // console.log(e.id_product_type)
        // console.log(aux+' '+ e.id_product_type == id);
        if (e.id_product_type == id) {
            aux = e.name;  
            return e.name;
        } 
    });
    return aux;
}