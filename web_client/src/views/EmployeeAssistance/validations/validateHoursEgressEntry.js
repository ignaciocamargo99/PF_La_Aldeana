import moment from "moment";

const validateHoursEgressEntry = (inputDateEntry, inputDateEgress, dateEntry, dni, dateEgress, assistance, id_assistance, editing) => {

    let assistanceWithoutDateEgress;
    let assistanceErrorValidation1;
    let assistanceErrorValidation2;
    let assistanceErrorValidation3;

    let assistances1 = [];
    let assistances2 = [];

    for (let i = 0; i < assistance.length; i++) {
        if (assistance[i].date_egress && (assistance[i].date_entry.slice(0, 10) === assistance[i].date_egress.slice(0, 10)) && assistance[i].employee === parseInt(dni, 10)) assistances1.push(assistance[i]);
        else if (assistance[i].date_egress && (assistance[i].date_entry.slice(0, 10) !== assistance[i].date_egress.slice(0, 10)) && assistance[i].employee === parseInt(dni, 10)) assistances2.push(assistance[i]);
    }

    if (!editing) {

        if (dateEgress !== '' && dateEgress) {
            if (inputDateEntry === inputDateEgress) {

                assistanceErrorValidation1 = assistances1.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress) && (moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEntry))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                )

                assistanceErrorValidation2 = assistances2.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) !== inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEgress))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                )

                // Si existen empleados que no tengan hora de salida marcada en el día actual...
                assistanceWithoutDateEgress = assistance.find((employees) => !employees.date_egress && (inputDateEntry === employees.date_entry.slice(0, 10)) && (employees.employee === parseInt(dni, 10)));

            }

            else {

                assistanceErrorValidation1 = assistances1.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                )

                assistanceErrorValidation2 = assistances2.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                )

                assistanceErrorValidation3 = assistances1.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) !== inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (dateEgress >= '00:00' && dateEgress <= '04:00'))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEntry))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                )

                // Si no existen empleados que no tengan hora de salida marcada en el día actual...
                assistanceWithoutDateEgress = assistance.find((employees) => !employees.date_egress && (inputDateEntry === employees.date_entry.slice(0, 10)) && (employees.employee === parseInt(dni, 10)));

            }
        }

        else {

            // Si no existen empleados que no tengan hora de salida marcada en el día actual...
            assistanceWithoutDateEgress = assistance.find((employees) => !employees.date_egress && (inputDateEntry === employees.date_entry.slice(0, 10)) && (employees.employee === parseInt(dni, 10)));

            assistanceErrorValidation1 = assistances1.find(employees =>
                (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEntry)
                &&
                ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEntry))
                &&
                (employees.employee === parseInt(dni, 10))
            )

            // Verificar porque puede fallar...
            assistanceErrorValidation2 = assistances2.find(employees => employees.date_egress &&
                (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) !== inputDateEntry)
                &&
                ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry))
                &&
                (employees.employee === parseInt(dni, 10))
            )
        }
    }


    else {

        if (dateEgress !== '' && dateEgress) {
            if (inputDateEntry === inputDateEgress) {

                assistanceErrorValidation1 = assistances1.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress) && (moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEntry))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                    &&
                    (employees.id_assistance !== id_assistance)
                )

                assistanceErrorValidation2 = assistances2.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) !== inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEgress))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                    &&
                    (employees.id_assistance !== id_assistance)
                )

                // Si no existen empleados que no tengan hora de salida marcada en el día actual...
                assistanceWithoutDateEgress = assistance.find((employees) => !employees.date_egress && (inputDateEntry === employees.date_entry.slice(0, 10)) && (employees.employee === parseInt(dni, 10)) && (employees.id_assistance !== id_assistance));

            }

            else {
                assistanceErrorValidation1 = assistances1.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                    &&
                    (employees.id_assistance !== id_assistance)
                )

                assistanceErrorValidation2 = assistances2.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEgress))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') <= dateEgress))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                    &&
                    (employees.id_assistance !== id_assistance)
                )

                assistanceErrorValidation3 = assistances1.find(employees => employees.date_egress &&
                    (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) !== inputDateEgress)
                    &&
                    (
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') >= dateEntry) && (dateEgress >= '00:00' && dateEgress <= '04:00'))
                        ||
                        ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEntry))
                    )
                    &&
                    (employees.employee === parseInt(dni, 10))
                    &&
                    (employees.id_assistance !== id_assistance)
                )

                // Si no existen empleados que no tengan hora de salida marcada en el día actual...
                assistanceWithoutDateEgress = assistance.find((employees) => !employees.date_egress && (inputDateEntry === employees.date_entry.slice(0, 10)) && (employees.employee === parseInt(dni, 10)) && (employees.id_assistance !== id_assistance));

            }
        }

        else {

            // Si no existen empleados que no tengan hora de salida marcada en el día actual...
            assistanceWithoutDateEgress = assistance.find((employees) => !employees.date_egress && (inputDateEntry === employees.date_entry.slice(0, 10)) && (employees.employee === parseInt(dni, 10)) &&
                (employees.id_assistance !== id_assistance));

            assistanceErrorValidation1 = assistances1.find(employees =>
                (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) === inputDateEntry)
                &&
                ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry) && (moment(employees.date_egress).add(3, 'hours').format('HH:mm') >= dateEntry))
                &&
                (employees.employee === parseInt(dni, 10))
                &&
                (employees.id_assistance !== id_assistance)
            )

            // Verificar porque puede fallar...
            assistanceErrorValidation2 = assistances2.find(employees => employees.date_egress &&
                (employees.date_entry.slice(0, 10) === inputDateEntry) && (employees.date_egress.slice(0, 10) !== inputDateEntry)
                &&
                ((moment(employees.date_entry).add(3, 'hours').format('HH:mm') <= dateEntry))
                &&
                (employees.employee === parseInt(dni, 10))
                &&
                (employees.id_assistance !== id_assistance)
            )
        }
    }


    // Warning

    if (assistanceWithoutDateEgress) return 'Hay un registro de este empleado que aún no tiene marcada la hora de egreso. Establezca la hora de egreso para registrar una nueva asistencia del mismo e intente nuevamente...';
    if (assistanceErrorValidation1 || assistanceErrorValidation2 || assistanceErrorValidation3) return 'Existen registros de que este empleado ya marcó el ingreso a la hora seleccionada o ya estuvo presente dentro de este rango horario. Modifique las horas de ingreso/egreso e intente nuevamente...';
    else return null;
}

export default validateHoursEgressEntry;