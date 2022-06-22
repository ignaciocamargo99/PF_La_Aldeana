import React, { useEffect, useRef, useState } from "react";
import BeShowed from "common/BeShowed";

const DescriptionProduct = (props) => {
    const inputDescription = useRef(null);
    const [description, setDescription] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleDescription = () => {
        setDescription(inputDescription.current.value);
    }

    useEffect(() => {
        const descriptions = inputDescription.current.value.trim();
        if (descriptions.length <= 200 && descriptions.length > 0) {
            if (inputDescription.current.value.length > 0) setIsValidClass("form-control is-valid");
            let data = props.data;
            data.description = descriptions;
            props.load(data);
        } else if (descriptions.length === 0) {
            setIsValidClass("form-control");
            let data = props.data;
            data.description = descriptions;
            props.load(data);
        }
    }, [description]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productDescription">Descripción</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <textarea ref={inputDescription} className={isValidClass} maxLength="200" id="productDescription" placeholder="Ingrese descripción del producto..." rows="3" onChange={handleDescription}
                        defaultValue={props.data.description}></textarea>
                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <textarea ref={inputDescription} className={isValidClass} maxLength="200" id="productDescription" rows="3" readOnly
                        defaultValue={props.data.description}></textarea>
                </BeShowed>
            </div>
        </div>
    );
}

export default DescriptionProduct;