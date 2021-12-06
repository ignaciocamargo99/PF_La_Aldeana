
const calculateProductStock = (idsProducts,suppliesStock) => {
    let stocks = [];
    let lastIdProduct = -1;
    let product;
    let response = [];

    suppliesStock.forEach((supplyStock) => {
        if(supplyStock.id_product != lastIdProduct){
            product = {id_product: supplyStock.id_product, stock: parseInt(supplyStock.stock / supplyStock.quantity)};
            stocks.push(product);
        }
        else{
            if(parseInt(supplyStock.stock / supplyStock.quantity) < stocks[stocks.length-1].stock){
                stocks[stocks.length-1] = {id_product: supplyStock.id_product, stock: parseInt(supplyStock.stock / supplyStock.quantity)};
            }
        }
        lastIdProduct = supplyStock.id_product;
    })
    

    idsProducts.forEach((id) => {
        product = stocks.find((stock) => stock.id_product === id);
        if(product){
            response.push(product);
        }
        else{
            response.push({id_product: id, stock: null});
        }
    })

    return response;
}

export default calculateProductStock;