export default function getNameTypeProduct (types, id) {
    let aux = '';
    types?.map((e) => {
        if (e.id_product_type === id) {
            aux = e.name;  
            return e.name;
        } 
    });
    return aux;
}