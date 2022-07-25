import { printDeliveryTicket } from "ticket/print";
import { formatDateToString, formatTimeToString } from "utils/DateFormat/dateTimeFormatV2";

export const printDeliverySaleTicket = (date) => {
    let deliveryDataToPrint = {
        date: formatDateToString(date),
        time: formatTimeToString(date),
    }

    printDeliveryTicket(deliveryDataToPrint);
}