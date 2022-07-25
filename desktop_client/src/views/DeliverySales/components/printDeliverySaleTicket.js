import { printDeliveryTicket } from "ticket/print";
import { formatDateToString, formatTimeToString } from "utils/DateFormat/dateTimeFormatV2";

const mapClientDataForTicket = (details) => {
    let items = [];
    for (let i = 0; i < details.length; i++) {

        let itemFlavors = [];
        if (details[i].flavors?.length === 1) {
            const flavorsSelected = details[i].flavors[0];
            for (let j = 0; j < flavorsSelected.length; j++) {
                itemFlavors.push(flavorsSelected[j].name);
            }
        }

        items.push({
            name: details[i].product.name,
            unitPrice: details[i].product?.price || '',
            amount: details[i].quantity,
            subtotal: details[i].subtotal,
            flavors: itemFlavors,
        });
    }
    return items;
}

export const printDeliverySaleTicket = (date, clientData, details, total, amount) => {

    let deliveryDataToPrint = {
        date: formatDateToString(date),
        time: formatTimeToString(date),
        total: `${+total},00`,
        cashReceived: `${+amount},00`,
        change: `${+amount - +total},00`,
        clientData: clientData,
        items: mapClientDataForTicket(details),
    }

    printDeliveryTicket(deliveryDataToPrint);
}