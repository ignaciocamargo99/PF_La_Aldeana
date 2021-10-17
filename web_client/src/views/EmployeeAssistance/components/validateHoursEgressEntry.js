import moment from "moment";

const validateAssistances = (dateEntry, dni, dateEgress, assistance, id_assistance, editing, PORT) => {
    let assistancesWithDateEntryDateEgress1 = [];
    let assistancesWithDateEntryDateEgress2 = [];
    let assistancesWithDateEntryDateEgress3 = [];
    let assistancesWithoutDateEgress = [];
    let hours;

    if (PORT === '') hours = 0;
    else hours = 3;

    if (!editing) {
        // // Validate if exists registers with the time range that the administrator is registering to this employee...
        assistancesWithDateEntryDateEgress1 = assistance.find((employee) => employee.date_egress && (((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm'))) || ((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEgress) && (dateEgress <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm')))) && (employee.employee === parseInt(dni, 10)));
        assistancesWithDateEntryDateEgress2 = assistance.find((employee) => employee.date_egress && (((dateEntry <= moment(employee.date_entry).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEgress)) && ((dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_egress).add(hours, 'hours').format('HH:mm') <= dateEgress))) && (employee.employee === parseInt(dni, 10)));
        assistancesWithDateEntryDateEgress3 = assistance.find((employee) => !dateEgress && ((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm'))) && (employee.employee === parseInt(dni, 10)));
        // Validate if this employee has date egress before register another assistance to the same employee...
        assistancesWithoutDateEgress = assistance.find((employee) => !employee.date_egress && (employee.employee === parseInt(dni, 10)));

    }
    else {
        // Validate if exists registers with the time range that the administrator is registering to this employee...
        assistancesWithDateEntryDateEgress1 = assistance.find((employee) => employee.date_egress && (((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm'))) || ((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEgress) && (dateEgress <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm')))) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));
        assistancesWithDateEntryDateEgress2 = assistance.find((employee) => employee.date_egress && (((dateEntry <= moment(employee.date_entry).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEgress)) && ((dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm')) && (moment(employee.date_egress).add(hours, 'hours').format('HH:mm') <= dateEgress))) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));
        assistancesWithDateEntryDateEgress3 = assistance.find((employee) => !dateEgress && ((moment(employee.date_entry).add(hours, 'hours').format('HH:mm') <= dateEntry) && (dateEntry <= moment(employee.date_egress).add(hours, 'hours').format('HH:mm'))) && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));
        // Validate if this employee has date egress before register another assistance to the same employee...
        assistancesWithoutDateEgress = assistance.find((employee) => !employee.date_egress && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));

    }
    // Warnings
    if (assistancesWithDateEntryDateEgress1) return 'Existen registros de que este empleado ya marcó el ingreso a la hora seleccionada o ya estuvo presente dentro de este rango horario';
    else if (assistancesWithDateEntryDateEgress2 || assistancesWithDateEntryDateEgress3) return 'Existen registros de que este empleado trabajó en el rango horario ingresado o parte de este. Modifique las horas de ingreso/egreso e intente nuevamente...';
    else if (assistancesWithoutDateEgress) return 'Hay un registro de este empleado que aún no tiene marcada la hora de egreso. Establezca la hora de egreso para registrar una nueva asistencia del mismo e intente nuevamente...';
}

export default validateAssistances;