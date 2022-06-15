import BeShowed from 'common/BeShowed';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { updateTypeSupply } from '../../../actions/SupplyActions';
import useHTTPGet from '../../../hooks/useHTTPGet';

const PORT = require('../../../config');

const TypeSupply = (props) => {

    const typeSupplies = useHTTPGet(PORT() + '/api/typeSupplies');

    const selectSupplyType = useRef(null);

    const handleSupplyTypeChange = () => {
        props.updateTypeSupply(Math.trunc(selectSupplyType.current.value));
        if (props.data.editing) {
            props.data.id_supply_type = selectSupplyType.current.value
            console.log(props.data)
            props.data.stock_lot = null;
            // props.data.stock_unit = 0;
            props.data.unit_x_lot = null;
            props.load(props.data)
        }
    }

    useEffect(() => {
        if (!props.data.reading) {
            if (props.data.id_supply_type){
                if(props.data.id_supply_type >= 0) props.updateTypeSupply(Math.trunc(props.data.id_supply_type));
            }
            if (selectSupplyType.current.value >= 0) props.updateTypeSupply(Math.trunc(selectSupplyType.current.value));
        }
    }, [props.typeSupply]);

    return (

        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="supplyType">Tipo de insumo*</label>
            </div>
            <div className="form-control-input">
                <select className="form-control" id="supplyType" defaultValue="-1" ref={selectSupplyType} onChange={handleSupplyTypeChange} style={{ fontFamily: 'Abel, sans-serif' }}>
                    <BeShowed show={!props.data.reading && !props.data.editing}>
                        <option disabled value="-1">Seleccione tipo de insumo...</option>
                        {
                            typeSupplies?.map((ts, i) => (
                                <option key={i} value={ts.id_supply_type}>{ts.name}</option>
                            ))
                        }
                    </BeShowed>
                    <BeShowed show={props.data.reading}>
                        <option value="0">{props.data.name_type_supply}</option>
                    </BeShowed>
                    <BeShowed show={props.data.editing}>
                        <option disabled value="-1">{props.data.name_type_supply}</option>
                        {
                            typeSupplies?.map((ts, i) => (
                                <option key={i} value={ts.id_supply_type}>{ts.name}</option>
                            ))
                        }
                    </BeShowed>
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