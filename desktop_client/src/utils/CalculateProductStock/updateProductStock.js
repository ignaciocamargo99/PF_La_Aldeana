
const obteinSupplies = (idProduct,suppliesStocks) => {
    let supplies = [];
    suppliesStocks.forEach((supplyStock) => {
        if(supplyStock.id_product == idProduct){
            supplies.push({id_supply: supplyStock.id_supply,quantity: supplyStock.quantity});
        }
    })
    return supplies;
}

const updateSuppliesStock = (idProduct,quantity,suppliesStocks) => {
    let newSuppliesStocks = [];
    let aux;
    let supplies = obteinSupplies(idProduct,suppliesStocks);
    let products = [];
    let quantityToDiscount;
    suppliesStocks.forEach((supplyStock) => {
        quantityToDiscount = null;
        supplies.forEach((supply) => {
            if(supply.id_supply == supplyStock.id_supply){
                quantityToDiscount = supply.quantity;
            }
        })
        if(quantityToDiscount){
            aux = supplyStock;
            aux.stock = aux.stock - (quantityToDiscount * quantity);
            newSuppliesStocks.push(aux);
            products.push(aux.id_product);
        }
        else{
            newSuppliesStocks.push(supplyStock)
        }
    });

    return [newSuppliesStocks, products]
}

const updateProductStock = (idProduct,quantity,productsStocks,suppliesStocks) => {
    let [newSuppliesStocks, products] = updateSuppliesStock(idProduct,quantity,suppliesStocks);
    let newProductsStocks = productsStocks;
    let i;
    let lastIdProduct = -1;
    newSuppliesStocks.forEach((supplyStock) => {
        if(products.includes(supplyStock.id_product) && idProduct != supplyStock.id_product){
            i = newProductsStocks.findIndex((newProductStock) => newProductStock.id_product == supplyStock.id_product)
            newProductsStocks[i].stock = parseInt(supplyStock.stock / supplyStock.quantity);
        }
        lastIdProduct = supplyStock.id_product;
    })

    return [newProductsStocks, newSuppliesStocks]
}

export default updateProductStock;