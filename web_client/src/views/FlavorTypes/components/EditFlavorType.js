import LoaderSpinner from 'common/LoaderSpinner';
import { useGetFlavorTypeByID } from 'hooks/useGetFlavorTypeByID';
import React from 'react';
import { useParams } from 'react-router-dom';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import FlavorTypeForm from './FlavorTypeForm';
import FlavorTypeNotFound from './FlavorTypeNotFound';

const EditFlavorType = () => {
    const { idFlavorType } = useParams();
    const { loadingFlavorType, flavorType } = useGetFlavorTypeByID(idFlavorType);

    const onSubmitEditFlavorType = async (formData) => {
        const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;

        if (editionConfirmed) {
            // to do
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
                formTitle={'Editar tipo de sabor'}
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