import React from 'react';

const FlavorProduction = (props) => {

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="date">Sabor producido</label>
                </div>
                <div className="form-control-input">
                    <input className='form-control'
                        id="flavor" type="text"
                        defaultValue={props.data.name} readOnly />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="date">Descripción del sabor</label>
                </div>
                <div className="form-control-input">
                    <input className='form-control'
                        id="flavor" type="text"
                        defaultValue={props.data.description} readOnly />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="date">Cantidad producida</label>
                </div>
                <div className="form-control-input">
                    <input className='form-control'
                        id="flavor" type="text"
                        defaultValue={props.data.quantity + ' baldes'} readOnly />
                </div>
            </div>
        </>

    )
}

export default FlavorProduction;