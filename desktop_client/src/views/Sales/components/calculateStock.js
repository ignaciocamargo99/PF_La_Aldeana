
export const calculateStock = (products, supplies, productsSupplies, productSelected, quantity) => {

    console.log(products)
    console.log(supplies)
    console.log(productsSupplies)

    // tomamos el producto que recibimos por parametro
    // tomamos los insumos del producto recibido
    // filtramos el array de productos con los insumos tomados anteriormente
    // hacemos el descuento del stock y devolvemos el array actualizada

    const suppliesOfProduct = productsSupplies.filter(ps => ps.id_product === productSelected.id_product)

    const arrayIdSupply = []
    for (let i = 0; i < suppliesOfProduct.length; i++) {
        arrayIdSupply.push(suppliesOfProduct.id_supply)
    }

    const arrayIdProduct = []
    for (let i = 0; i < suppliesOfProduct.length; i++) {
        for (let j = 0; j < productsSupplies.length; j++)
        {
            if (suppliesOfProduct[i].id_supply === productsSupplies[j].id_supply && !arrayIdProduct.includes(productsSupplies[j].id_product))
            {
                arrayIdProduct.push(productsSupplies[j].id_product)
            }
        }
    }

    const productsFilter = []
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < arrayIdProduct.length; j++) {
            if (products[i].id_product === arrayIdProduct[j]){
                productsFilter.push(products[i])
            }
        }
    }

    // for (let i = 0; i < productsFilter.length; i++)
    // {
    //     productsFilter[i].stock_current = calculateMinStock()
    // }

    

    console.log(productSelected)
    console.log(productsFilter)
    /**
     *  0:
            id_product: 2
            id_supply: 68
            number_supply: 1
        1:
            id_product: 2
            id_supply: 69
            number_supply: 2
     */
}

// const calculateMinStock = (product, ) => {
//     let minStock;
//     for (let i = 0; i < .length; i++) {
        
        
//     }

//     return minStock
    
// }