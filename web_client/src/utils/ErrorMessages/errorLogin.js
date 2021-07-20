import Swal from 'sweetalert2'

export default function errrorLogin(title = 'Oops...', text) {

    return Swal.fire({
        icon: 'error',
        title: title,
        text: text
      })
}