export const calculateStock = (
    products,
    supplies,
    productXSupplies,
    productSelected,
    quantity
) => {
    let suppliesOfProduct = productXSupplies.filter(
        (ps) => ps.id_product === productSelected.id_product
    );

    for (let i = 0; i < suppliesOfProduct.length; i++) {
        for (let j = 0; j < supplies.length; j++) {
            if (supplies[j].id_supply === suppliesOfProduct[i].id_supply) {
                supplies[j].quantityOfSupply =
                    quantity * suppliesOfProduct[i].number_supply;
                break;
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

    console.log(products);
};

const calculateMinStock = (product, supplies, productXSupplies, quantity) => {
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
                (parseFloat(supply.stock_unit) -
                    parseFloat(supply.quantityOfSupply)) /
                    parseFloat(supplyXproduct[i].number_supply)
            )
        );
    }
    console.log(minStock);
    return Math.min(...minStock);
};
