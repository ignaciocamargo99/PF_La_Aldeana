import Swal from 'sweetalert2';

export default function confirmDelete(name) {

  return Swal.fire({
    title: `¿Seguro que desea eliminar ${name}?`,
    text: "El elemento seleccionado ya no será visible para el personal de la empresa.",
    icon: "question",
    confirmButtonText: 'Sí',
    showCancelButton: true,
    showConfirmButton: true,
    reverseButtons: true,
  })
};

