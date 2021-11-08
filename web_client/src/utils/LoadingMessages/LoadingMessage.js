import swal from 'sweetalert';

export default function loadingMessage(msg) {
    let loading = document.createElement('div')
    let divSpinner = document.createElement('div')
    divSpinner.className = "formRow justify-content-center"
    let spinner1 = document.createElement('div')
    spinner1.className = "spinner-grow text-success"
    let spinner2 = document.createElement('div')
    spinner2.className = "spinner-grow text-success"
    let spinner3 = document.createElement('div')
    spinner3.className = "spinner-grow text-success"
    let divText = document.createElement('div')
    let text = document.createElement('label')
    text.innerText = msg
    divText.appendChild(text)
    divSpinner.appendChild(spinner1)
    divSpinner.appendChild(spinner2)
    divSpinner.appendChild(spinner3)
    loading.appendChild(divSpinner)
    loading.appendChild(divText)
    
    return swal( {content: loading, buttons: false});

}