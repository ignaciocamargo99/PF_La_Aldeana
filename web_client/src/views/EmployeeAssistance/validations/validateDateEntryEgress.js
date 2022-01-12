

const validateDateEntryEgress = (dateEntry, hourEntry, dateEgress, hourEgress) => {
    if (dateEntry === dateEgress) {
        if (hourEntry > hourEgress) return 'La hora de ingreso no puede ser mayor a la hora de salida';
        else return null;
    }

    else {
        if (hourEntry < hourEgress) return 'La hora de ingreso no puede ser mayor a la hora de salida';
        else return null;
    }
}

export default validateDateEntryEgress;