import moment from "moment";

const validateHoursEgressEntry = (inputDateEntry, inputDateEgress, dateEntry, dni, dateEgress, assistance, id_assistance, editing) => {
    let assistancesWithDateEntryDateEgress1 = null;
    let assistancesWithDateEntryDateEgress2 = null;
    let assistancesWithDateEntryDateEgress3 = null;
    let assistancesWithDateEntryDateEgress4 = null
    let assistancesWithoutDateEgress = null;

    if (!editing) {
        // Validate if exists registers with the time range that the administrator is registering to this employee...
        // Distinct dates
        if (inputDateEgress !== '' && (inputDateEntry !== inputDateEgress)) {
            assistancesWithDateEntryDateEgress3 = assistance.find((employee) => ((dateEgress) &&
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry >= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress <= moment(employee.date_egress).format('HH:mm')))

                )
                ||
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry <= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress <= moment(employee.date_egress).format('HH:mm')))

                )
                ||
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry >= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress >= moment(employee.date_egress).format('HH:mm')))

                )
                ||
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry <= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress >= moment(employee.date_egress).format('HH:mm')))

                )));

            assistancesWithDateEntryDateEgress4 = assistance.find((employee) => (
                (dateEntry < moment(employee.date_egress).format('HH:mm')) && (dateEntry >= moment(employee.date_entry).format('HH:mm'))
            ))
        }

        else {
            // Validate if exists registers with the time range that the administrator is registering to this employee...
            // Same dates
            assistancesWithDateEntryDateEgress1 = assistance.find((employee) => (dateEgress)
                && ((employee.date_entry.slice(0, 10) === inputDateEntry) && (employee.date_egress.slice(0, 10) === inputDateEgress))
                &&
                (
                    (
                        ((dateEntry >= moment(employee.date_entry).format('HH:mm')) && (dateEntry <= moment(employee.date_egress).format('HH:mm')))
                        &&
                        (
                            (dateEgress <= moment(employee.date_egress).format('HH:mm')) || (dateEgress > moment(employee.date_egress).format('HH:mm'))
                        )
                    )
                    ||
                    (
                        (dateEntry < moment(employee.date_entry).format('HH:mm'))
                        &&
                        (
                            (dateEgress <= moment(employee.date_egress).format('HH:mm')) || (dateEgress > moment(employee.date_egress).format('HH:mm'))
                        )
                        &&
                        (dateEgress >= moment(employee.date_entry).format('HH:mm'))
                    )
                )
                && (employee.employee === parseInt(dni, 10)));

            assistancesWithDateEntryDateEgress2 = assistance.find((employee) => (!dateEgress)
                && ((employee.date_entry.slice(0, 10) === inputDateEntry))
                && (employee.date_entry.slice(0, 10) === inputDateEntry)
                &&
                (
                    (dateEntry >= moment(employee.date_entry).format('HH:mm'))
                    &&
                    (dateEntry <= moment(employee.date_egress).format('HH:mm'))
                )

                && (employee.employee === parseInt(dni, 10))
            )

            assistancesWithDateEntryDateEgress4 = assistance.find((employee) => ((employee.dateEgress) &&
                ((employee.date_entry.slice(0, 10) === inputDateEntry) && (employee.date_egress.slice(0, 10) === inputDateEgress)) &&
                (dateEntry < moment(employee.date_egress).format('HH:mm')) && (dateEntry >= moment(employee.date_entry).format('HH:mm'))
            ))
        }

        // Validate if this employee has date egress before register another assistance to the same employee...
        assistancesWithoutDateEgress = assistance.find((employee) => !employee.date_egress && (employee.employee === parseInt(dni, 10)));
    }
    else {
        // Validate if exists registers with the time range that the administrator is registering to this employee...
        // Distinct dates
        if (inputDateEgress !== '' && (inputDateEntry !== inputDateEgress) && dateEgress) {
            assistancesWithDateEntryDateEgress3 = assistance.find((employee) => ((dateEgress && employee.id_assistance !== id_assistance) &&
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry >= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress <= moment(employee.date_egress).format('HH:mm')))

                )
                ||
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry <= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress <= moment(employee.date_egress).format('HH:mm')))

                )
                ||
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry >= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress >= moment(employee.date_egress).format('HH:mm')))

                )
                ||
                (
                    ((employee.date_entry.slice(0, 10) === inputDateEntry) && (dateEntry <= moment(employee.date_entry).format('HH:mm')))
                    && ((employee.date_egress.slice(0, 10) === inputDateEgress) && (dateEgress >= moment(employee.date_egress).format('HH:mm')))

                )
            ));

            assistancesWithDateEntryDateEgress4 = assistance.find((employee) => ((employee.id_assistance !== id_assistance) &&
                (dateEntry < moment(employee.date_egress).format('HH:mm')) && (dateEntry >= moment(employee.date_entry).format('HH:mm'))
            ));
        }

        else {
            // Validate if exists registers with the time range that the administrator is registering to this employee...
            // Same dates
            assistancesWithDateEntryDateEgress1 = assistance.find((employee) => (dateEgress) && (employee.id_assistance !== id_assistance)
                && ((employee.date_entry.slice(0, 10) === inputDateEntry) && (employee.date_egress.slice(0, 10) === inputDateEgress))
                &&
                (
                    (
                        ((dateEntry >= moment(employee.date_entry).format('HH:mm')) && (dateEntry <= moment(employee.date_egress).format('HH:mm')))
                        &&
                        (
                            (dateEgress <= moment(employee.date_egress).format('HH:mm')) || (dateEgress > moment(employee.date_egress).format('HH:mm'))
                        )
                    )
                    ||
                    (
                        (dateEntry < moment(employee.date_entry).format('HH:mm'))
                        &&
                        (
                            (dateEgress <= moment(employee.date_egress).format('HH:mm')) || (dateEgress > moment(employee.date_egress).format('HH:mm'))
                        )
                        &&
                        (dateEgress >= moment(employee.date_entry).format('HH:mm'))
                    )
                )
                && (employee.employee === parseInt(dni, 10)));

            assistancesWithDateEntryDateEgress2 = assistance.find((employee) => (!dateEgress) && (employee.id_assistance !== id_assistance)
                && ((employee.date_entry.slice(0, 10) === inputDateEntry))
                && (employee.date_entry.slice(0, 10) === inputDateEntry)
                &&
                (
                    (dateEntry >= moment(employee.date_entry).format('HH:mm'))
                    &&
                    (dateEntry <= moment(employee.date_egress).format('HH:mm'))
                )

                && (employee.employee === parseInt(dni, 10)));

            assistancesWithDateEntryDateEgress4 = assistance.find((employee) => ((employee.id_assistance !== id_assistance) &&
                ((employee.date_entry.slice(0, 10) === inputDateEntry) && (employee.date_egress.slice(0, 10) === inputDateEgress)) &&
                (dateEntry < moment(employee.date_egress).format('HH:mm')) && (dateEntry >= moment(employee.date_entry).format('HH:mm'))
            ));
        }
        // Validate if this employee has date egress before register another assistance to the same employee...
        assistancesWithoutDateEgress = assistance.find((employee) => !employee.date_egress && (employee.employee === parseInt(dni, 10)) && (employee.id_assistance !== id_assistance));
    }

    // Warnings
    if (assistancesWithoutDateEgress) return 'Hay un registro de este empleado que aún no tiene marcada la hora de egreso. Establezca la hora de egreso para registrar una nueva asistencia del mismo e intente nuevamente...';
    if (assistancesWithDateEntryDateEgress1 || assistancesWithDateEntryDateEgress2 || assistancesWithDateEntryDateEgress3 || assistancesWithDateEntryDateEgress4) return 'Existen registros de que este empleado ya marcó el ingreso a la hora seleccionada o ya estuvo presente dentro de este rango horario. Modifique las horas de ingreso/egreso e intente nuevamente...';
    else return null
}

export default validateHoursEgressEntry;