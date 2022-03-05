import swal from 'sweetalert';

export default function confirmDelete(actionTrue) {

  return swal({
    title: "¿Seguro que desea eliminarlo?",
    text: "El elemento seleccionado ya no será visible para el personal de la empresa.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        actionTrue();
      }
    });
}

