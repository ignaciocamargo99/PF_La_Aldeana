
export default function backupAssistance (assistance) {
    let aux = {
        employee: assistance.employee,
        date_entry: assistance.date_entry,
        date_egress: assistance.date_egress,
    }
    return aux;
}