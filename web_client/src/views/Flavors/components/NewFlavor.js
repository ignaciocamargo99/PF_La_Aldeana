import Axios from 'axios';
import React from 'react';
import displayError from 'utils/ErrorMessages/displayError';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import FlavorForm from './FlavorForm';
import swal from 'sweetalert';

const PORT = require('../../../config');

const NewFlavor = () => {
  const onSubmitRegisterFlavor = async (formData) => {
    const registrationConfirmed = (await defaultQuestionSweetAlert2(`Registrar "${formData.name}"?`)).isConfirmed;

    if (registrationConfirmed) {
      let formDataMapped = { ...formData }
      formDataMapped.flavorTypeId = formData.type_flavor;
      formDataMapped.flavorFamilyId = formData.family_flavor;

      const payload = { flavors: [formDataMapped] };

      Axios.post(`${PORT()}/api/flavors`, payload)
        .then(response => {
          if (response.data.flavorsCreated) {
            swal("Sabor creado exitosamente", {
              icon: "success",
            }).then(() => {
              // const newFlavorId = response.data.flavors[0].idFlavor;
              // window.location.replace(`/app/flavors/${newFlavorId}`);
              window.location.replace(`/app/flavors`);
            });
          } else {
            displayError(response.data.message, 'Error al registrar el sabor');
          };
        })
        .catch(error => {
          console.log(error);
          displayError();
        });
    }
  };

  return (
    <>
      <div style={{ display: 'none' }}>{document.title = "Sabores"}</div>
      <FlavorForm
        breadcrumbName={'Nuevo sabor'}
        formTitle={'Registrar sabor'}
        submitBtnText={'Registrar'}
        onSubmit={onSubmitRegisterFlavor}
      ></FlavorForm>
    </>
  )
}

export default NewFlavor;
