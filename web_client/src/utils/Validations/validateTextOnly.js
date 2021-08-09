export default function validateTextOnly(e){
    var a = e || window.event;
    var key = a.keyCode || a.which;

    let char = String.fromCharCode(key)
    let regex = new RegExp("^[a-zA-Z ]+$");
  
    // Toma los puntos y comas pasados al valor de código clave...
    if ( !regex.test(char) && a.key != 0 && a.key != 1 && a.key != 2 && a.key != 3 && a.key != 4 &&
    a.key != 5 && a.key != 6 && a.key != 7 && a.key != 8 && a.key != 9 ) {     
       e.preventDefault();     
    }
}