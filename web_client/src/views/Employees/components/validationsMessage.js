

export const validationsMessage = (data) => {

    if (!data.name) return 'Ingrese un nombre para el empleado';
    else if (!data.last_name) return 'Ingrese un apellido para el empleado';
    else if (!data.dni || data.dni.toString().length !== 8) return 'Ingrese el DNI del empleado';
    else if (!data.cuil || data.cuil.toString().length !== 11) return 'Ingrese un CUIL válido para el empleado';
    else if (!data.phone || data.phone.toString().length !== 10) return 'Ingrese un número de teléfono válido para el empleado';
    else if (!data.birthday) return 'Ingrese la fecha de nacimiento del empleado';
    else if (!data.street) return 'Ingrese la calle donde reside el empleado';
    else if (!data.number || data.number.toString().length > 5) return 'Ingrese un número de calle válido donde reside el empleado';
    else if (!data.city) return 'Ingrese la localidad donde reside el empleado';
    else if (!data.charges) return 'Seleccione un cargo para el empleado';
    else if (!data.firstDayOffDate) return 'Seleccione una fecha de primer franco para el empleado';
    else if (!data.employment_relationship) return 'Seleccione la relación laboral para el empleado';

}