import React from 'react';
import LoaderSpinner from '../../../../common/LoaderSpinner';

const SpinnerTableSupplies = () => {
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <LoaderSpinner color="primary" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label className="text-muted" style={{ margin: '10px', padding: '10px 50px 50px 50px' }}>Cargando...</label>
                </div>
            </div>
        </>
    )
};

export default SpinnerTableSupplies;