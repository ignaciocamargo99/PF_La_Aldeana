import errorNameSupply from "../ErrorMessages/errorNameSupply";
import errorTypeSupply from "../ErrorMessages/errorTypeSupply";
import errorSinglePrice from "../ErrorMessages/errorSinglePrice";
import errorMultiplePrice from "../ErrorMessages/errorMultiplePrice";
import errorLotSupply from "../ErrorMessages/errorLotSupply";
import errorUnitPerLotSupply from "../ErrorMessages/errorUnitPerLotSupply";
import errorUnitSupply from "../ErrorMessages/errorUnitSupply";

export default function validateSupplyRegister(data) {
    const name = data.name;
    const price_retail = data.price_retail;
    const price_wholesale = data.price_wholesale;
    const id_supply_type = data.id_supply_type;
    const stock_lot = data.stock_lot;
    const unit_x_lot = data.unit_x_lot;
    const stock_unit = data.stock_unit;

    try {

        if (name === "null") errorNameSupply();

        else if (price_retail <= 0 && data.deliverySupply) errorSinglePrice();

        else if (price_wholesale <= 0 && data.franchiseSupply) errorMultiplePrice();

        else if (id_supply_type < 0) errorTypeSupply();

        else if (stock_lot <= 0 && id_supply_type === 2) errorLotSupply();

        else if (unit_x_lot <= 0 && id_supply_type === 2) errorUnitPerLotSupply();

        else if (stock_unit <= 0 && id_supply_type !== 3) errorUnitSupply();

    }

    catch (e) {
    }
}