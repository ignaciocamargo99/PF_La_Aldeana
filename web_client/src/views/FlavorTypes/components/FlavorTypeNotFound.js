import { faBackward } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'common/Breadcrumb';
import React from 'react';
import { FLAVOR_TYPES_LINK } from '../constants';

const FlavorTypeNotFound = () => {
    return (
        <>
            <Breadcrumb
                parentLink={FLAVOR_TYPES_LINK}
                parentName="Volver a Tipos de Sabores"
                icon={faBackward}
            />
            <label>
                No se ha encontrado un tipo de sabor para ese ID.
            </label>
        </>
    )
}

export default FlavorTypeNotFound