import Swal from 'sweetalert2';

export function defaultQuestionSweetAlert2(title, text) {
    return Swal.fire({
        title: title,
        text: text,
        icon: "question",
        confirmButtonText: 'Sí',
        showCancelButton: true,
        showConfirmButton: true,
        reverseButtons: true,
    })
};

// add here another customizable alerts if needed
// ...
