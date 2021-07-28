export default function backupProduct (product) {
    let aux = {
        title: product.title,
        active: product.active,
        price: product.price,
        description: product.description,
        image: product.image,
        id_product: product.id_product,
        id_product_type: product.id_product_type,
        id_sector: product.id_sector
    }

    return aux;
}