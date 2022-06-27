
const validations = (data) => {
    if (!data.name) return 'Debe ingresar un nombre para el tipo de producto';
    if (parseInt(data.id_supply_type) === 1 && (parseInt(data.stock_unit) === 0 || !data.stock_unit)) return 'Debe ingresar un valor para el stock en unidades del insumo';
    if (parseInt(data.id_supply_type) === 2 && (parseInt(data.stock_lot) === 0 || !data.stock_lot)) return 'Debe ingresar un valor para el stock por lotes';
    if (parseInt(data.id_supply_type) === 2 && (parseInt(data.stock_unit) === 0 || !data.stock_unit)) return 'Debe ingresar un valor para el cantidad de unidades por lote';
    if (parseInt(data.id_supply_type) === 2 && (parseInt(data.unit_x_lot) === 0 || !data.unit_x_lot)) return 'Debe ingresar un valor para cantidad de unidades por lote';
    if(data.chkb_price_retail && (!data.price_retail || parseInt(data.price_retail) === 0)) return 'Debe ingresar un valor para el precio de envío por delivery';
    if(data.chkb_price_wholesale && (!data.price_wholesale || parseInt(data.price_wholesale) === 0)) return 'Debe ingresar un valor para el precio de envío a franquicias';
}
export default validations;