export const calculateStock = (
    products,
    supplies,
    productXSupplies,
    productSelected,
    quantity,
    action,
) => {
    let suppliesOfProduct;
    if (action === 'D') {
        suppliesOfProduct = productXSupplies.filter(
            (ps) => ps.id_product === productSelected.id_product
        );
    }
    else {
        suppliesOfProduct = productXSupplies.filter(
            (ps) => ps.id_product === productSelected[0].id_product
        );
    }


    for (let i = 0; i < suppliesOfProduct.length; i++) {
        for (let j = 0; j < supplies.length; j++) {
            if (supplies[j].id_supply === suppliesOfProduct[i].id_supply) {
                if (action === 'N') {
                    supplies[j].quantityOfSupply = quantity * suppliesOfProduct[i].number_supply;
                    supplies[j].stock_unit -= supplies[j].quantityOfSupply;
                    break;
                }
                if (action === 'D') {
                    supplies[j].quantityOfSupply =
                        quantity * -1 * suppliesOfProduct[i].number_supply;
                    supplies[j].stock_unit -= supplies[j].quantityOfSupply;
                    break;
                }
            }
        }
    }

    const arrayIdProduct = [];
    for (let i = 0; i < suppliesOfProduct.length; i++) {
        for (let j = 0; j < productXSupplies.length; j++) {
            if (
                suppliesOfProduct[i].id_supply ===
                productXSupplies[j].id_supply &&
                !arrayIdProduct.includes(productXSupplies[j].id_product)
            ) {
                arrayIdProduct.push(productXSupplies[j].id_product);
            }
        }
    }

    for (let i = 0; i < arrayIdProduct.length; i++) {
        let indexProduct = products.findIndex(
            (p) => arrayIdProduct[i] === p.id_product
        );

        products[indexProduct].stock_current = calculateMinStock(
            products[indexProduct],
            supplies,
            productXSupplies,
            quantity
        );

    }
    return { products, supplies };
};

const calculateMinStock = (product, supplies, productXSupplies) => {
    let minStock = [];
    const supplyXproduct = productXSupplies.filter(
        (ps) => ps.id_product === product.id_product
    );

    for (let i = 0; i < supplyXproduct.length; i++) {
        let supply = supplies.find(
            (s) => s.id_supply === supplyXproduct[i].id_supply
        );

        minStock.push(
            Math.trunc(
                parseFloat(supply.stock_unit) /
                parseFloat(supplyXproduct[i].number_supply)
            )
        );
    }
    return Math.min(...minStock);
};
