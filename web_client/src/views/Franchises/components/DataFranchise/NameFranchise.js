import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../../common/BeShowed";

export default function NameFranchise(props) {
    const inputName = useRef(null);
    const [name, setName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleName = () => setName(inputName.current.value);

    useEffect(() => {
        if (!props.data.reading) {
            let val = inputName.current.value;
            if (val.trim().length > 0 && inputName.current.value.length <= 80) {
                setIsValidClass("form-control is-valid");
                let data = props.data;
                data.name = val.trim();
                props.load(data);
            }
            else {
                setIsValidClass("form-control")
                let data = props.data;
                data.name = "";
                props.load(data);
            }
        }
    }, [name, props]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="name" >Nombre*</label>
            </div>
            <BeShowed show={!props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="name" type="text" maxLength="80" ref={inputName}
                        placeholder="Ingrese nombre de la franquicia..." onChange={handleName} defaultValue={props.data.name}/>
                </div>
            </BeShowed>
            <BeShowed show={props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="name" type="text" maxLength="80" defaultValue={props.data.name} readOnly />
                </div>
            </BeShowed>
        </div>
    );
}