import React, { useState } from 'react';
import LoaderSpinner from '../../common/LoaderSpinner';

const ListFlavors = () => {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

    return (
        <>
            {isLoadingSpinner &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {!isLoadingSpinner &&
                <div className="viewTitleBtn">
                    <h1>Sabores</h1>
                </div>
            }
        </>
    )
}

export default ListFlavors
