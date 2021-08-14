import isInDestiny from "./isInDestiny";

export default function putOnList (destiny, list){

    let aux = [];
    
    list?.map((e, i) => {
        if (isInDestiny(e, destiny)) {
            aux[i] = e;
        }
    });

    return aux;
}