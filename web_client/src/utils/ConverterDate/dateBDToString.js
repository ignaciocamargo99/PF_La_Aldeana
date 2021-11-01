export const dateBDToString = (dateDB,idiom) => {
    let year = dateDB.slice(0,4)
    let month = dateDB.slice(5,7)
    let day = dateDB.slice(8,10)
    if (idiom === 'Es') return(`${day}/${month}/${year}`)
    else if (idiom === 'En') return(`${month}/${day}/${year}`)
}