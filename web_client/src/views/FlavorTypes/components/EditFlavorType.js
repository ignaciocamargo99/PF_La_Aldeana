import Axios from 'axios';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'common/httpStatusCodes';
import LoaderSpinner from 'common/LoaderSpinner';
import { useGetFlavorTypeByID } from 'hooks/useGetFlavorTypeByID';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import displayError from 'utils/ErrorMessages/displayError';
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import successSweetAlert from 'utils/SuccessMessages/sucessSweetAlert';
import { FLAVOR_TYPES_LINK } from '../constants';
import FlavorTypeForm from './FlavorTypeForm';
import FlavorTypeNotFound from './FlavorTypeNotFound';

const PORT = require('../../../config');

const EditFlavorType = () => {
    const history = useHistory();

    const { idFlavorType } = useParams();
    const { loadingFlavorType, flavorType } = useGetFlavorTypeByID(idFlavorType);

    const onSubmitEditFlavorType = async (formData) => {
        const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;

        if (editionConfirmed) {
            loadingMessage('Guardando cambios...')

            Axios.put(`${PORT()}/api/flavorTypes/${idFlavorType}`, formData)
                .then(response => {
                    if (response.data.updatedFlavorType) {
                        successSweetAlert('Categoría editada exitosamente.')
                            .then(() => {
                                history.push(FLAVOR_TYPES_LINK);
                            });
                    } else {
                        displayError(response.data.message, 'Error al editar la categoría.');
                    };
                })
                .catch(error => {
                    if (error.response.status === BAD_REQUEST || error.response.status === INTERNAL_SERVER_ERROR) {
                        displayError(`${error.response.data.message}`, 'Error');
                        return;
                    }

                    console.log(error);
                    displayError();
                });
        }
    };

    if (loadingFlavorType) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }

    if (flavorType) {
        return (
            <FlavorTypeForm
                breadcrumbName={flavorType.name}
                formTitle={'Editar categoría de sabor'}
                submitBtnText='Guardar'
                flavorTypeData={flavorType}
                onSubmit={onSubmitEditFlavorType}
            ></FlavorTypeForm>
        )
    }

    return (
        < FlavorTypeNotFound />
    )
}

export default EditFlavorType