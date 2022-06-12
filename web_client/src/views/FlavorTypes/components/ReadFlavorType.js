import LoaderSpinner from 'common/LoaderSpinner';
import { useGetFlavorTypeByID } from 'hooks/useGetFlavorTypeByID';
import React from 'react';
import { useParams } from 'react-router-dom';
import FlavorTypeForm from './FlavorTypeForm';
import FlavorTypeNotFound from './FlavorTypeNotFound';

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
                formTitle={'Ver categoría de sabor'}
                flavorTypeData={flavorType}
                isReading={true}
            ></FlavorTypeForm>
        )
    }

    return (
        < FlavorTypeNotFound />
    )
}

export default ReadFlavorType