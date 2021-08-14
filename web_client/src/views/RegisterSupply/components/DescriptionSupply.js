import React, {useEffect, useRef, useState} from 'react';
import { updateDescriptionSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';

const DescriptionSupply = (props) => {

    const inputSupplyDescription = useRef(null);
    const [prevDescriptionSupply, setPrevDescriptionSupply] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleDescriptionChange = () => {
        setPrevDescriptionSupply(props.descriptionSupply);
        props.updateDescriptionSupply(Math.trunc(inputSupplyDescription.current.value));
    }

    useEffect(() => {
        const supplyDescription = inputSupplyDescription.current.value.trim();
        if (supplyDescription.length > 0 && supplyDescription.length <= 200) {
            setIsValidClass("form-control is-valid");
            props.updateDescriptionSupply(supplyDescription);
        } else if (prevDescriptionSupply !== "null") {
            setIsValidClass("form-control is-invalid");
        }
    }, [props.descriptionSupply]);

    return(
        
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="supplyDescription">Descripción*</label>
            </div>
            <div className="form-control-input">
                <textarea className={isValidClass} id="supplyDescription" maxLength="200" ref={inputSupplyDescription} onChange={handleDescriptionChange} placeholder="Ingrese descripción del insumo..." rows="3"></textarea>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        descriptionSupply: state.descriptionSupply
    }
}

const mapDispatchToProps = {
    updateDescriptionSupply
}


export default connect(mapStateToProps, mapDispatchToProps)(DescriptionSupply);