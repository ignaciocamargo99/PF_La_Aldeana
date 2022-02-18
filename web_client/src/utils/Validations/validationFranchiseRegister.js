import displayValidation from "./displayValidation";

export default function validationProductRegister(data) {

    try {

        if (!data.name) displayValidation('No ha ingresado ningún nombre válido para la franquicia');
        else if (!data.start_date) displayValidation('No ha ingresado ninguna fecha de inicio de actividades válida para la franquicia');
        else if (!data.address) displayValidation('No ha ingresado ninguna dirección válida para la franquicia');
        else if (data.address_number < 0) displayValidation('No ha ingresado ningún número de calle válido para la franquicia');
        else if (!data.city) displayValidation('No ha ingresado ninguna ciudad válida para la franquicia');
        else if (!data.province) displayValidation('No ha ingresado ninguna provincia válida para la franquicia');
        else if (!data.name_manager) displayValidation('No ha ingresado ningún nombre válido para el franquiciado');
        else if (!data.last_name_manager) displayValidation('No ha ingresado ningún apellido válido para el franquiciado');
        else if (data.dni_manager === 0) displayValidation('No ha ingresado ningún DNI válido para el franquiciado');

    }

    catch (e) {
    }
}