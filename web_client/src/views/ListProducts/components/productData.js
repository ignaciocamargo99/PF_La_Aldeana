

export default function productData (product, productSupplies) {
    let aux = {
        active: product.active,
        description: product.description,
        editing: true,
        flagImageUpdate: product.flagImageUpdate,
        flavor: product.quantity_flavor,
        id_product: product.id_product,
        id_product_type: product.id_product_type,
        id_sector: product.id_sector,
        image: product.image,
        name: product.name,
        price: product.price,
        title: product.title,
        supplies: productSupplies.map(({ id_supply, number_supply }) => {
            return {
                id_supply: id_supply,
                number_supply: number_supply
            }
        })
    };
    return aux
}