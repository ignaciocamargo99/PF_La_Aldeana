import calculateSupplySubtotal from "./calculateSupplySubtotal";

const calculateSuppliesSubtotal = (supplies) => {
    let aux = 0;

    if (!(supplies) || supplies.length < 1) {
        return aux;
    }

    supplies.forEach(s => {
        aux += calculateSupplySubtotal(s)
    });
    return aux;
}

export default calculateSuppliesSubtotal; 