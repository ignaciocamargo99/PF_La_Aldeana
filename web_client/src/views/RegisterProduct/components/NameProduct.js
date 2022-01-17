import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../common/BeShowed";

const NameProduct = (props) => {
    const inputName = useRef(null);
    const [name, setName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleName = () => {
        setName(inputName.current.value);
    }

    useEffect(() => {
        const name = inputName.current.value.trim();
        if (name.length > 0 && name.length <= 80) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.name = name;
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            let data = props.data;
            data.name = name;
            props.load(data);
        }
    }, [name && !props.data.reading]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productName" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <input className={isValidClass} id="productName" autoFocus type="text" maxLength="80" ref={inputName} placeholder="Ingrese nombre del producto..." onChange={handleName}
                        defaultValue={props.data.name} />
                </BeShowed>
                <BeShowed show={props.data.reading}>
                <input className={isValidClass} id="productName" type="text" maxLength="80" ref={inputName} readOnly
                        defaultValue={props.data.name} />
                </BeShowed>
            </div>
        </div>
    );
}

export default NameProduct;