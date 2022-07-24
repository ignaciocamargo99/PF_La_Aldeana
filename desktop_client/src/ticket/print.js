const { ConectorPlugin } = require("./ConectorPlugin");
const { IMPRESORA_HELADERIA, IMPRESORA_CAFETERIA } = require("./printersNames");

const printSaleTicket = (saleDataToPrint) => {

    let conector = new ConectorPlugin();

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .establecerTamanioFuente(2, 2)
        .textoConAcentos(`La Aldeana\n`)
        .establecerTamanioFuente(1, 1);

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .texto("HELADERÍA Y CAFETERÍA\n")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda)

    conector.feed(1);
    conector.texto("Domicilio: San Martín 283\n");
    conector.establecerEnfatizado(1)
        .texto(`TIQUE (Cód.${saleDataToPrint.ticketCode})\n`)
        .establecerEnfatizado(0)

    conector.feed(1);
    conector.texto(`Fecha: ${saleDataToPrint.date}\n`);
    conector.texto(`Hora: ${saleDataToPrint.time}\n`);

    conector.texto("--------------------------------\n");

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

    conector.imprimirEn(IMPRESORA_HELADERIA)
    // .then(respuestaAlImprimir => {
    //     if (respuestaAlImprimir === true) {
    //         // to do
    //     } else {
    //         // to do
    //     }
    // });
}

const printHeladeriaTicket = ({ date, time, items }) => {

    let conector = new ConectorPlugin();

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .establecerTamanioFuente(2, 2)
        .textoConAcentos(`La Aldeana\n`)
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda)
        .establecerTamanioFuente(1, 1);

    conector.feed(1);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
        .establecerEnfatizado(1)
        .texto(`HELADERÍA\n`)
        .establecerEnfatizado(0)
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);

    conector.texto(`Fecha: ${date}\n`);
    conector.texto(`Hora: ${time}\n`);

    conector.texto("--------------------------------\n");

    for (let i = 0; i < items.length; i++) {
        const { name, amount } = items[i];

        conector.texto(`${amount}u x\n`);
        conector.texto(`${name}\n`);
    }

    conector.texto("--------------------------------\n");

    conector.feed(4);

    conector.imprimirEn(IMPRESORA_HELADERIA)
    // .then(respuestaAlImprimir => {
    //     if (respuestaAlImprimir === true) {
    //         // to do
    //     } else {
    //         // to do
    //     }
    // });
}

const printCafeteriaTicket = ({ date, time, items }) => {

    let conector = new ConectorPlugin();

    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .establecerTamanioFuente(2, 2)
        .textoConAcentos(`La Aldeana\n`)
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda)
        .establecerTamanioFuente(1, 1);

    conector.feed(1);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
        .establecerEnfatizado(1)
        .texto(`CAFETERÍA\n`)
        .establecerEnfatizado(0)
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);

    conector.texto(`Fecha: ${date}\n`);
    conector.texto(`Hora: ${time}\n`);

    conector.texto("--------------------------------\n");

    for (let i = 0; i < items.length; i++) {
        const { name, amount } = items[i];

        conector.texto(`${amount}u x\n`);
        conector.texto(`${name}\n`);
    }

    conector.texto("--------------------------------\n");

    conector.feed(4);

    conector.imprimirEn(IMPRESORA_CAFETERIA)
    // .then(respuestaAlImprimir => {
    //     if (respuestaAlImprimir === true) {
    //         // to do
    //     } else {
    //         // to do
    //     }
    // });
}

module.exports = {
    printSaleTicket,
    printHeladeriaTicket,
    printCafeteriaTicket,
}
