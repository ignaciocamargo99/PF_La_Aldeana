import swal from 'sweetalert';

export default function loadingMessage() {
    var loading = document.createElement('div')
    var divSpinner = document.createElement('div')
    divSpinner.className = "formRow justify-content-center"
    var spinner1 = document.createElement('div')
    spinner1.className = "spinner-grow text-success"
    var spinner2 = document.createElement('div')
    spinner2.className = "spinner-grow text-success"
    var spinner3 = document.createElement('div')
    spinner3.className = "spinner-grow text-success"
    var divText = document.createElement('div')
    var text = document.createElement('label')
    text.innerText = 'Procesando la venta'
    divText.appendChild(text)
    divSpinner.appendChild(spinner1)
    divSpinner.appendChild(spinner2)
    divSpinner.appendChild(spinner3)
    loading.appendChild(divSpinner)
    loading.appendChild(divText)
    
    return swal( {content: loading, buttons: false});

}