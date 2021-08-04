import errorAddressFranchise from "../ErrorMessages/errorAddressFranchise";
import errorCityFranchise from "../ErrorMessages/errorCityFranchise";
import errorStartDate from "../ErrorMessages/errorStartDate";
import errorNumberAddress from "../ErrorMessages/errorNumberAddress";
import errorProvinceFranchice from "../ErrorMessages/errorProvinceFranchice";
import errorNameManager from "../ErrorMessages/errorNameManager";
import errorLastNameManager from "../ErrorMessages/errorLastNameManager";
import errorDniManager from "../ErrorMessages/errorDniManager";

export default function validationProductRegister(data) {

    try {

        if (data.start_date === "") errorStartDate();
        else if (data.address === "") errorAddressFranchise();
        else if (data.address_number < 0) errorNumberAddress();
        else if (data.city === "") errorCityFranchise();
        else if (data.province === "") errorProvinceFranchice();
        else if (data.name_manager === "") errorNameManager();
        else if (data.last_name_manager === "") errorLastNameManager();
        else if (data.dni_manager === 0) errorDniManager();

    }

    catch (e) {
    }
}