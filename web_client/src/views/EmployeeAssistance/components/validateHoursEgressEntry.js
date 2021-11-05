import moment from "moment";

const validateHoursEgressEntry = (inputDateEntry, inputDateEgress, dateEntry, dni, dateEgress, assistance, id_assistance, editing, PORT) => {
    let assistancesWithDateEntryDateEgress1 = [];
    let assistancesWithDateEntryDateEgress2 = [];
    let assistancesWithDateEntryDateEgress3 = [];
    let assistancesWithoutDateEgress = [];
    let hours;

    if (PORT === '') hours = 3;
    else hours = 0;

    if (!editing) {
        // Validate if exists registers with the time range that the administrator is registering to this employee...


        if (inputDateEntry !== inputDateEgress) {
            // FECHAS DISTINTAS!!! 
            assistancesWithDateEntryDateEgress1 = assistance.find((employee) => employee.date_egress && ((dateEntry >= moment(employee.date_entry).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_egress).add(hours, 'hours').format('HH:mm') >= dateEgress)) && (employee.employee === parseInt(dni, 10)));
        }

        else {
            // FECHAS IGUALES !!!
            // VALIDACIÓN LISTA PARA RANGOS EN LOS QUE ESE EMPLEADO YA ESTUVO PRESENTE DENTRO DEL MISMO DÍA
            assistancesWithDateEntryDateEgress2 = assistance.find((employee) => employee.date_egress && ((dateEntry >= moment(employee.date_entry).add(hours, 'hours').format('HH:mm')) && ((moment(employee.date_egress).add(hours, 'hours').format('HH:mm') <= dateEgress) || (moment(employee.date_egress).add(hours, 'hours').format('HH:mm') >= dateEgress))) && (employee.employee === parseInt(dni, 10)));

        }

        // Validate if this employee has date egress before register another assistance to the same employee...
        // VALIDACIÓN DE QUE EL EMPLEADO QUE CUYA ASISTENCIA NUEVA SE VA A REGISTRAR NO PUEDE SER REGISTRADA YA QUE NO SE REGISTRÓ LA FECHA DE EGRESO
        assistancesWithoutDateEgress = assistance.find((employee) => !employee.date_egress && (employee.employee === parseInt(dni, 10)));











        // assistancesWithDateEntryDateEgress3 = assistance.find((employee) => !dateEgress && ((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm'))) && (employee.employee === parseInt(dni, 10)));








    }
    else {

        if (inputDateEntry !== inputDateEgress) {

            // FECHAS DISTINTAS!!! 
            if(!inputDateEgress){
                assistancesWithDateEntryDateEgress1 = assistance.find((employee) => employee.date_egress && (moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));

            }
            else{
                assistancesWithDateEntryDateEgress1 = assistance.find((employee) => employee.date_egress && ((dateEntry >= moment(employee.date_entry).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_egress).add(hours, 'hours').format('HH:mm') >= dateEgress)) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));

            }

        }

        else {
            // FECHAS IGUALES !!!
            // VALIDACIÓN LISTA PARA RANGOS EN LOS QUE ESE EMPLEADO YA ESTUVO PRESENTE DENTRO DEL MISMO DÍA
            assistancesWithDateEntryDateEgress2 = assistance.find((employee) => employee.date_egress && ((dateEntry >= moment(employee.date_entry).add(hours, 'hours').format('HH:mm')) && ((moment(employee.date_egress).add(hours, 'hours').format('HH:mm') <= dateEgress) || (moment(employee.date_egress).add(hours, 'hours').format('HH:mm') >= dateEgress))) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));

        }

        // Validate if this employee has date egress before register another assistance to the same employee...
        // VALIDACIÓN DE QUE EL EMPLEADO QUE CUYA ASISTENCIA NUEVA SE VA A REGISTRAR NO PUEDE SER REGISTRADA YA QUE NO SE REGISTRÓ LA FECHA DE EGRESO
        assistancesWithoutDateEgress = assistance.find((employee) => !employee.date_egress && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));

        // Validate if exists registers with the time range that the administrator is registering to this employee...
        // assistancesWithDateEntryDateEgress1 = assistance.find((employee) => employee.date_egress && (((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm'))) || ((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEgress) && (dateEgress <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm')))) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));
        // assistancesWithDateEntryDateEgress2 = assistance.find((employee) => employee.date_egress && (((dateEntry <= moment(employee.date_entry).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEgress)) && ((dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_egress).add(hours, 'hours').format('HH:mm') <= dateEgress))) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));
        // Validate if this employee has date egress before register another assistance to the same employee...
        // assistancesWithoutDateEgress = assistance.find((employee) => !employee.date_egress && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));

        // assistancesWithDateEntryDateEgress3 = assistance.find((employee) => !dateEgress && ((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm'))) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));
    }



    // Warnings
    if (assistancesWithoutDateEgress) return 'Hay un registro de este empleado que aún no tiene marcada la hora de egreso. Establezca la hora de egreso para registrar una nueva asistencia del mismo e intente nuevamente...';
    if (assistancesWithDateEntryDateEgress1) return 'Existen registros de que este empleado ya marcó el ingreso a la hora seleccionada o ya estuvo presente dentro de este rango horario. Modifique las horas de ingreso/egreso e intente nuevamente...';
    else return null
    // else if (assistancesWithDateEntryDateEgress1 || assistancesWithDateEntryDateEgress2) return 'Existen registros de que este empleado trabajó en el rango horario ingresado o parte de este. Modifique las horas de ingreso/egreso e intente nuevamente...';
}

export default validateHoursEgressEntry;