import React from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from 'common/LoaderSpinner';
import { useGetFlavor } from 'hooks/useGetFlavor';
import FlavorForm from './FlavorForm';
import Axios from 'axios';
import displayError from 'utils/ErrorMessages/displayError';
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import successMessage from 'utils/SuccessMessages/successMessage';
import Breadcrumb from 'common/Breadcrumb';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';

const PORT = require('../../../config');

const EditFlavor = () => {

    const { idFlavor: flavorId } = useParams();
    const { loadingFlavor, flavor } = useGetFlavor(flavorId);

    const onSubmitEditFlavor = async (formData) => {
        const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;

        if (editionConfirmed) {
            loadingMessage('Guardando cambios...')
            Axios.put(`${PORT()}/api/flavors/${flavorId}`, formData)
                .then(response => {
                    if (response.data.flavorUpdated) {
                        successMessage('Atención','Sabor editado exitosamente', 'success')
                        .then(() => {
                            window.location.replace('/app/flavors');
                        });
                    } else {
                        displayError(response.data.message, 'Error al editar el sabor');
                    };
                })
                .catch(error => {
                    console.log(error);
                    displayError();
                });
        }
    };

    if (loadingFlavor) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }

    if (flavor) {
        return (
            <>
                <div style={{ display: 'none' }}>{document.title = "Editar sabor"}</div>
                <FlavorForm
                    breadcrumbName={flavor.name}
                    formTitle={'Editar sabor'}
                    flavorData={flavor}
                    submitBtnText={'Aceptar'}
                    onSubmit={onSubmitEditFlavor}
                ></FlavorForm>
            </>
        )
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar sabor"}</div>
            <Breadcrumb
                parentLink='/app/flavors'
                parentName="Volver a Sabores"
                icon={faBackward}
            />
            <label>
                No se ha encontrado un sabor para ese ID.
            </label>
        </>
    )
};

export default EditFlavor;
