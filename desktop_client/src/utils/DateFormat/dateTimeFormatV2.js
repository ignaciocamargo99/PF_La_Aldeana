function formatDateToString(date) {
    const year = date.getFullYear();
    const month = date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

    return `${day}/${month}/${year}`;
}

function formatTimeToString(date) {
    const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}

module.exports = {
    formatDateToString,
    formatTimeToString,
}
