import errorNameProduct from './ErrorMessages/errorNameProduct';
import errorPriceProduct from './ErrorMessages/errorPriceProduct';
import errorTypeProduct from './ErrorMessages/errorTypeProduct';

export default function validationProductRegister(name, price, type) {
    try {
        var passValidations = false;

        if (name === "") throw errorNameProduct();

        else if (price <= 0) throw errorPriceProduct();

        else if (type === {}) throw errorTypeProduct();

        else return !passValidations;
    }

    catch (e) {
    }
}