import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import Breadcrumb from '../../../common/Breadcrumb';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { useGetFlavor } from '../../../hooks/useGetFlavor';

const FlavorForm = () => {

    const { idFlavor: flavorId } = useParams();
    const { loadingFlavor, flavor } = useGetFlavor(flavorId);

    // to do
    // useEffect(() => {
    //     console.log(loadingFlavor);
    //     console.log(flavor);
    // }, [loadingFlavor])

    if (loadingFlavor) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }
    else {
        if (flavor) {
            // to do
            return (
                <>
                    <Breadcrumb
                        parentName="Sabores"
                        icon={faIceCream}
                        parentLink="/app/flavors"
                        currentName={flavor.name}
                    />
                    <div>Ups! En desarrollo...</div>
                </>
            )
        }
        else {
            // to do
            return (
                <div>No se ha encontrado un sabor para ese ID.</div>
            )
        }
    };
}

export default FlavorForm;
