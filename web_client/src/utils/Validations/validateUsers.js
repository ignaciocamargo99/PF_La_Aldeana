export const isCorrectFormat = (string) => {
    let containsNumber,containsSpecialCharacters = false

    for(let i = 0; i < string.length ; i++){
        if(string.charCodeAt(i) >= 48 && string.charCodeAt(i) <= 57){
            containsNumber = true
        }
        if((string.charCodeAt(i) >= 33 && string.charCodeAt(i) <= 47) 
            || (string.charCodeAt(i) >= 58 && string.charCodeAt(i) <= 64) 
            || (string.charCodeAt(i) >= 91 && string.charCodeAt(i) <= 96) 
            ||(string.charCodeAt(i) >= 123 && string.charCodeAt(i) <= 254))
            {
                containsSpecialCharacters = true;
            }
    }
    return (containsNumber && containsSpecialCharacters)
}