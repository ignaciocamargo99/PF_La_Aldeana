export const dateBDToSpanish = (dateDB) => {
    let year = dateDB.slice(0,4)
    let month = dateDB.slice(5,7)
    let day = dateDB.slice(8,10)
    return(`${day}/${month}/${year}`)
}