import errorNameProduct from '../ErrorMessages/errorNameProduct';
import errorPriceProduct from '../ErrorMessages/errorPriceProduct';
import errorTypeProduct from '../ErrorMessages/errorTypeProduct';
import errorSectorProduct from '../ErrorMessages/errorSectorProduct';

export default function validationProductRegister(data) {
    const name = data.name;
    const price = data.price;
    const sector = data.sector;
    const type = data.type;

    try {
        //var passValidations = false;

        if (name === "") errorNameProduct();

        else if (price <= 0) errorPriceProduct();

        else if (sector <= 0) errorSectorProduct();

        else if (type <= 0) errorTypeProduct();

        //else return !passValidations;
    }

    catch (e) {
    }
}