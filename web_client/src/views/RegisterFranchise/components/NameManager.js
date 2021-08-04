import React, { useEffect, useRef, useState } from "react";

export default function NameManager (props) {
    const inputName = useRef(null);
    const [name, setName] = useState("null");
    const [prevName, setPrevName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleName = () => {
        setPrevName(name);
        setName(inputName.current.value);
    }

    useEffect(() => {
        if (inputName.current.value.length > 0 && inputName.current.value.length <= 80) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.name_manager = inputName.current.value;
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            let data = props.data;
            data.name_manager = "";
            props.load(data);
        }
    }, [name]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="managerName" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="managerName" type="text" maxLength="80" ref={inputName} placeholder="Ingrese nombre del encargado..." onChange={handleName}>
                </input>
            </div>
        </div>
    );
}