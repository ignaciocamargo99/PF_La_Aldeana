import Axios from 'axios';
import React from 'react';
import displayError from 'utils/ErrorMessages/errorMessage';
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import { useHistory } from "react-router-dom";

import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import FlavorTypeForm from './FlavorTypeForm';
import successSweetAlert from 'utils/SuccessMessages/sucessSweetAlert';
import { FLAVOR_TYPES_LINK } from '../constants';
const { BAD_REQUEST } = require('common/httpStatusCodes');

const PORT = require('../../../config');

const NewFlavorType = () => {
  const history = useHistory();

  const onSubmitRegisterFlavorType = async (formData) => {
    const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Registrar "${formData.name}"?`)).isConfirmed;

    if (registrationConfirmed) {
      const payload = { flavorTypes: [formData] };
      
      loadingMessage('Registrando nuevo tipo de sabor...');
      Axios.post(`${PORT()}/api/flavorTypes`, payload)
        .then(response => {

          if (response.data.flavorTypesCreated) {
            successSweetAlert('Tipo de sabor registrado exitosamente.')
              .then(() => {
                history.push(FLAVOR_TYPES_LINK);
              });
          } else {
            displayError(response.data.message, 'Error al registrar el tipo de sabor');
          };

        })
        .catch(({ response }) => {

          if (response.status === BAD_REQUEST) {
            displayError(`${response.data.message}`, 'Error');
            return;
          }

          displayError();
        });
    }
  }

  return (
    <FlavorTypeForm
      onSubmit={onSubmitRegisterFlavorType}
      submitBtnText='Registrar'
      breadcrumbName='Nuevo tipo'
      formTitle='Registrar tipo de sabor'
    />
  )
}

export default NewFlavorType