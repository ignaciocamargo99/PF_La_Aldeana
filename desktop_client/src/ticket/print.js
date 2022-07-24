const { ConectorPlugin } = require("./ConectorPlugin");
const { IMPRESORA_HELADERIA, IMPRESORA_CAFETERIA } = require("./printersNames");

const getGenericConectorWithSimpleHeader = (subtitle = '') => {
    let conector = new ConectorPlugin();

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .establecerTamanioFuente(2, 2)
        .textoConAcentos(`La Aldeana\n`)
        .establecerTamanioFuente(1, 1);

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .texto("HELADERÍA Y CAFETERÍA\n")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda)

    if (subtitle) {
        conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
            .establecerEnfatizado(1)
            .texto(`${subtitle}\n`)
            .establecerEnfatizado(0)
            .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
    }

    return conector;
}

const getGenericConectorWithTicketHeader = (date, time, ticketCode, subtitle = '') => {
    let conector = getGenericConectorWithSimpleHeader(subtitle);

    conector.feed(1);
    conector.texto("Domicilio: San Martín 283\n");
    conector.establecerEnfatizado(1)
        .texto(`TIQUE (Cód.${ticketCode})\n`)
        .establecerEnfatizado(0)

    conector.feed(1);
    conector.texto(`Fecha: ${date}\n`);
    conector.texto(`Hora: ${time}\n`);

    conector.texto("--------------------------------\n");

    return conector;
}

const printSaleTicket = (generalDataToPrint, saleDataToPrint) => {
    let conector = getGenericConectorWithTicketHeader(generalDataToPrint.date, generalDataToPrint.time, generalDataToPrint.ticketCode);

    for (let i = 0; i < saleDataToPrint.items.length; i++) {
        const { name, unitPrice, amount, subtotal } = saleDataToPrint.items[i];

        conector.texto(`${amount}u x ${unitPrice}\n`);
        conector.texto(`${name}\n`);
        conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha);
        conector.texto(`${subtotal}\n`);
        conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
    }

    conector.texto("--------------------------------\n");

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
        .establecerEnfatizado(1)
        .texto(`TOTAL: ${saleDataToPrint.total}\n`)
        .establecerEnfatizado(0)
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);

    conector.texto('Recibimos\n')
    if (saleDataToPrint.payInCash) {
        conector.texto('PAGO EN EFECTIVO\n')
            .texto('Efectivo:\n')
            .establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
            .texto(`${saleDataToPrint.cashReceived}\n`)
            .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda)
            .texto('Su vuelto:\n')
            .establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
            .texto(`${saleDataToPrint.change}\n`)
            .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda)
    } else {
        conector.texto('PAGO CON TARJETA\n')
    }

    conector.texto("--------------------------------\n");

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .texto("***Gracias por su compra***")
        .feed(4);

    conector.imprimirEn(IMPRESORA_HELADERIA);
}

const printHeladeriaTicket = (generalDataToPrint, heladeriaDataToPrint) => {

    let conector = getGenericConectorWithTicketHeader(
        generalDataToPrint.date,
        generalDataToPrint.time,
        generalDataToPrint.ticketCode,
        'HELADERÍA'
    );

    for (let i = 0; i < heladeriaDataToPrint.items.length; i++) {
        const { name, amount, obs } = heladeriaDataToPrint.items[i];

        conector.texto(`${amount}u x\n`);
        conector.texto(`${name}\n`);
        if (obs?.trim()) {
            const observations = obs.trim().slice(0, 55);
            conector.texto(`(${observations})\n`);
        }
    }

    conector.texto("--------------------------------\n");

    conector.feed(4);

    conector.imprimirEn(IMPRESORA_HELADERIA);
}

const printCafeteriaTicket = (generalDataToPrint, cafeteriaDataToPrint) => {

    let conector = new ConectorPlugin();

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
        .establecerEnfatizado(1)
        .textoConAcentos('CAFETERÍA\n')
        .establecerEnfatizado(0)
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);

    conector.feed(1);
    conector.establecerEnfatizado(1)
        .texto(`TIQUE (Cód.${generalDataToPrint.ticketCode})\n`)
        .establecerEnfatizado(0)

    if (cafeteriaDataToPrint.nameClient?.trim()) {
        conector.texto(`Cliente: ${cafeteriaDataToPrint.nameClient?.trim().slice(0,20)}\n`);
    }

    conector.feed(1);
    conector.texto("--------------------------------\n");

    for (let i = 0; i < cafeteriaDataToPrint.items.length; i++) {
        const { name, amount, obs } = cafeteriaDataToPrint.items[i];

        conector.texto(`${amount}u x\n`);
        conector.texto(`${name}\n`);
        if (obs && obs.trim()) {
            const observations = obs.trim().slice(0, 55);
            conector.texto(`(${observations})\n`);
        }
    }

    conector.texto("--------------------------------\n");

    conector.feed(4);

    conector.imprimirEn(IMPRESORA_CAFETERIA);
}

module.exports = {
    printSaleTicket,
    printHeladeriaTicket,
    printCafeteriaTicket,
}
