import React, { useEffect, useRef, useState } from 'react';
import { updateDescriptionSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';
import BeShowed from 'common/BeShowed';

const DescriptionSupply = (props) => {

    const inputSupplyDescription = useRef(null);
    const [prevDescriptionSupply, setPrevDescriptionSupply] = useState("null");
    const [descriptionSupply, setDescriptionSupply] = useState();
    const [isValidClass, setIsValidClass] = useState("form-control");

    useEffect(() => {
        if (props.data.description && props.data.description !== 'null') {
            setDescriptionSupply(props.data.description);
            inputSupplyDescription.current.value = props.data.description;
        }
    }, [])

    const handleDescriptionChange = () => {
        setPrevDescriptionSupply(props.descriptionSupply);
        props.updateDescriptionSupply(Math.trunc(inputSupplyDescription.current.value.trim()));
        if (props.data.editing) {
            props.data.description = inputSupplyDescription.current.value.trim();
            props.load(props.data)
        }
    }

    useEffect(() => {
        const supplyDescription = inputSupplyDescription.current.value.trim();
        if (supplyDescription.length > 0 && supplyDescription.length <= 200) {
            setIsValidClass("form-control is-valid");
            props.updateDescriptionSupply(supplyDescription);
        } else if (prevDescriptionSupply !== "null") {
            setIsValidClass("form-control is-invalid");
            props.updateDescriptionSupply('null');
        }
    }, [props.descriptionSupply]);

    return (

        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="supplyDescription">Descripción</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading && !props.data.editing}>
                    <textarea className={isValidClass} id="supplyDescription" maxLength="200" ref={inputSupplyDescription} onChange={handleDescriptionChange} placeholder="Ingrese descripción del insumo..." rows="3"></textarea>

                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <textarea className={props.data.description ? 'form-control is-valid' : 'form-control'} id="supplyDescription" ref={inputSupplyDescription} rows="3" value={props.data.description ? props.data.description : ''} readOnly></textarea>
                </BeShowed>
                <BeShowed show={props.data.editing}>
                    <textarea className={props.data.description ? 'form-control is-valid' : 'form-control'} id="supplyDescription" ref={inputSupplyDescription} rows="3"
                        defaultValue={descriptionSupply} onChange={handleDescriptionChange}></textarea>
                </BeShowed>
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