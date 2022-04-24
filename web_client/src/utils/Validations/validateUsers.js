export const isCorrectFormat = (string) => {
    let containsNumber = false

    for(let i = 0; i < string.length ; i++){
        if(string.charCodeAt(i) >= 48 && string.charCodeAt(i) <= 57) {
            containsNumber = true;
            break;
        }
    }
    return (containsNumber)
}