export const encrypt  = (text) => {
    let date = new Date()
    date = date.getTime().toString()
    text = date.slice(0,4) + text.slice(0,2) + date.slice(4,8) + text.slice(2,4) + date.slice(8,13) + text.slice(4,text.length)
    return btoa(text)
}

export const decrypt = (textEncrypt) => {
    let text = atob(textEncrypt)
    text = text.slice(4,6) + text.slice(10,12) + text.slice(17,text.length)
    return text
}