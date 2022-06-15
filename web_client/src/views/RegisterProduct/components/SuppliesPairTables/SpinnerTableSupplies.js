import React from 'react';
import LoaderSpinner from 'common/LoaderSpinner';

const SpinnerTableSupplies = () => {
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <LoaderSpinner color="primary" loading="Cargando..."/>
                </div>
            </div>
        </>
    )
};

export default SpinnerTableSupplies;