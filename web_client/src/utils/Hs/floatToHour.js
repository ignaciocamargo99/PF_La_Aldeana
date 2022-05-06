export default function floatToHour (float, notSeconds) {
    let hs = Math.floor(float), // Obtenemos la parte entera
      restHS = Math.floor(float % 1 * 100), // Obtenemos la parde decimal
      floatMinutes = restHS * 60 / 100, // Obtenemos los minutos expresado en decimal
  
      minutes = Math.floor(floatMinutes), // Obtenemos la parte entera
      restMins = Math.floor(floatMinutes % 1 * 100), // Obtenemos la parde decimal
      seconds = Math.floor(restMins * 60 / 100); // Obtenemos los segundos expresado en entero
    
    let aux = `${('00'+hs).slice(-2)}`;

    if (!notSeconds) aux += `:${('00'+minutes).slice(-2)}:${('00'+seconds).slice(-2)}`;
    else {
        minutes =  Math.ceil(floatMinutes);
        aux += `:${('00'+minutes).slice(-2)}`;
    }

    return aux;
}