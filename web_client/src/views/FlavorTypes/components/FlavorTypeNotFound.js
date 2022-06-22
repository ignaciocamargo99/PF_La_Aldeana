import { faBackward } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'common/Breadcrumb';
import React from 'react';
import { FLAVOR_TYPES_LINK, FLAVOR_TYPES_VIEW_TITLE } from '../constants';

const FlavorTypeNotFound = () => {
    return (
        <>
            <Breadcrumb
                parentLink={FLAVOR_TYPES_LINK}
                parentName={`Volver a ${FLAVOR_TYPES_VIEW_TITLE}`}
                icon={faBackward}
            />
            <label>
                No se ha encontrado una categoría para ese ID.
            </label>
        </>
    )
}

export default FlavorTypeNotFound