import React, {useEffect, useRef, useState} from 'react';
import { updateNameSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';

const NameSupply = (props) => {

    const inputSupplyName = useRef(null);
    const [prevSupplyName, setPrevSupplyName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleNameChange = () => {
        setPrevSupplyName(props.nameSupply);
        props.updateNameSupply(Math.trunc(inputSupplyName.current.value));
    }

    useEffect(() => {
        const supplyName = inputSupplyName.current.value.trim();
        if (supplyName.length > 0 && supplyName.length <= 50) {
            setIsValidClass("form-control is-valid");
            props.updateNameSupply(supplyName);
        } else if (prevSupplyName !== "null") {
            setIsValidClass("form-control is-invalid");
        }
    }, [props.nameSupply]);

    return(
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="supplyName" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="supplyName"  maxLength="50" required type="text" ref={inputSupplyName} onChange={handleNameChange} placeholder="Ingrese nombre del insumo...">
                </input>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        nameSupply: state.nameSupply
    }
}

const mapDispatchToProps = {
    updateNameSupply
}


export default connect(mapStateToProps, mapDispatchToProps)(NameSupply);