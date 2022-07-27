import React from 'react'
import validateFloatNumbers from 'utils/validateFloatNumbers';

const TabTransport = ({ showTab, transportCost, setTransportCost }) => {

    const onChangeCost = (cost) => setTransportCost(cost <= 0 ? '' : cost);

    return (
        <>
            {showTab && (
                <>
                    <h3 className="mt-2">Flete</h3>
                    <div className="mt-4" style={{ maxWidth: '40em' }}>
                        <div className="d-flex justify-content-between ">
                            <label className="align-self-center w-25 fs-6">Costo a abonar:</label>
                            <div className="d-flex  w-50">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    autoFocus
                                    className="form-control"
                                    value={transportCost} onChange={e => onChangeCost(+e.target.value)} onKeyDown={(e) => validateFloatNumbers(e)}
                                >
                                </input>
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default TabTransport