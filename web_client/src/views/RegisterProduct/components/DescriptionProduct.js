import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../common/BeShowed";

const DescriptionProduct = (props) => {
    const inputDescription = useRef(null);
    const [description, setDescription] = useState("null");
    const [prevDescription, setPrevDescription] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleDescription = () => {
        setPrevDescription(description);
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
                <textarea ref={inputDescription} className={isValidClass} maxLength="200" id="productDescription" placeholder="Ingrese descripción del producto..." rows="3" onChange={handleDescription}
                    defaultValue={props.data.description}></textarea>
            </div>
        </div>
    );
}

export default DescriptionProduct;