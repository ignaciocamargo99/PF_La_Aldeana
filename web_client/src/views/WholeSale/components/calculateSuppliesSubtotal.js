import calculateSupplySubtotal from "./calculateSupplySubtotal";

const calculateSuppliesSubtotal = (supplies) => {
    let aux = 0;
    supplies.forEach(s => {
        aux += calculateSupplySubtotal(s)
    });
    return aux;
}

export default calculateSuppliesSubtotal; 