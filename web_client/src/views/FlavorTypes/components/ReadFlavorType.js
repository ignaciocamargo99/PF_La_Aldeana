import { faBackward } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'common/Breadcrumb';
import LoaderSpinner from 'common/LoaderSpinner';
import { useGetFlavorTypeByID } from 'hooks/useGetFlavorTypeByID';
import React from 'react';
import { useParams } from 'react-router-dom';
import { FLAVOR_TYPES_LINK } from '../constants';
import FlavorTypeForm from './FlavorTypeForm';

const ReadFlavorType = () => {
    const { idFlavorType } = useParams();
    const { loadingFlavorType, flavorType } = useGetFlavorTypeByID(idFlavorType);

    if (loadingFlavorType) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }

    if (flavorType) {
        return (
            <FlavorTypeForm
                breadcrumbName={flavorType.name}
                formTitle={'Ver tipo de sabor'}
                flavorTypeData={flavorType}
                isReading={true}
            ></FlavorTypeForm>
        )
    }

    return (
        <>
            <Breadcrumb
                parentLink={FLAVOR_TYPES_LINK}
                parentName="Volver a Tipos de Sabores"
                icon={faBackward}
            />
            <label>
                No se ha encontrado un sabor para ese ID.
            </label>
        </>
    )
}

export default ReadFlavorType