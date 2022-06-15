
const validations = (data) => {
    if (!data.name) return false;
    if (data.id_supply_type === 2 && (parseInt(data.stock_lot) === 0 || data.stock_lot === "")) return false;
    if (data.id_supply_type === 2 && (parseInt(data.stock_unit) === 0 || data.stock_unit === "" )) return false;
    if(data.id_supply_type === 2 && (parseInt(data.unit_x_lot) === 0 || data.unit_x_lot === "")) return false;
    else return true;
}

export default validations;