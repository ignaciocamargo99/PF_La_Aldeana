export default function validateFloatNumbers(e){
    var a = e || window.event;
    var key = a.keyCode || a.which;

    // Toma los puntos y comas pasados al valor de código clave...
    if ( key === 110 || key === 190 || key === 188 || a.key === '-' || key === 69) {     
       e.preventDefault();     
    }
}