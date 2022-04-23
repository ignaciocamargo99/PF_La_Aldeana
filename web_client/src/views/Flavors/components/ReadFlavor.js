import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetFlavor } from 'hooks/useGetFlavor';
import FlavorForm from './FlavorForm';
import Breadcrumb from 'common/Breadcrumb';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import LoaderSpinner from 'common/LoaderSpinner';

const ReadFlavor = () => {
    const { idFlavor: flavorId } = useParams();
    const { loadingFlavor, flavor } = useGetFlavor(flavorId);

    if (loadingFlavor) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }

    if (flavor) {
        return (
            <>
                <div style={{ display: 'none' }}>{document.title = "Ver sabor"}</div>
                <FlavorForm
                    breadcrumbName={flavor.name}
                    formTitle={'Ver sabor'}
                    flavorData={flavor}
                    isReading={true}
                ></FlavorForm>
            </>
        )
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Ver sabor"}</div>
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
}

export default ReadFlavor