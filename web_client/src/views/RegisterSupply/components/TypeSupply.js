import React, {useEffect, useRef, useState} from 'react';
import { updateTypeSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import useHTTPGet from '../../../hooks/useHTTPGet';

const PORT = require('../../../config');

const TypeSupply = (props) => {

    const typeSupplies = useHTTPGet(PORT() + '/api/typeSupplies');

    const selectSupplyType = useRef(null);

    const handleSupplyTypeChange = () => {
        props.updateTypeSupply(Math.trunc(selectSupplyType.current.value));
    }

    useEffect(() => {
        if (selectSupplyType.current.value >= 0) {
            props.updateTypeSupply(Math.trunc(selectSupplyType.current.value));
        } 
    }, [props.typeSupply]);

    return(
        
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="supplyType">Tipo*</label>
            </div>
            <div className="form-control-input">
                <select className="form-select" id="supplyType" defaultValue="-1" ref={selectSupplyType} onChange={handleSupplyTypeChange} style={{fontFamily: 'Abel, sans-serif'}}>
                    <option disabled value="-1">Seleccione tipo de insumo...</option>
                    {
                        typeSupplies?.map((ts, i) => (
                            <option key={i} value={ts.id_supply_type}>{ts.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        typeSupply: state.typeSupply
    }
}

const mapDispatchToProps = {
    updateTypeSupply
}


export default connect(mapStateToProps, mapDispatchToProps)(TypeSupply);