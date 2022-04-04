import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../../common/BeShowed";

export default function CityFranchise(props) {
    const inputCity = useRef(null);
    const [city, setCity] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleCity = () => setCity(inputCity.current.value);

    useEffect(() => {
        if (!props.data.reading) {
            let val = inputCity.current.value;
            if (val.trim().length > 0 && inputCity.current.value.length <= 80) {
                setIsValidClass("form-control is-valid");
                let data = props.data;
                data.city = val.trim();
                props.load(data);
            }
            else {
                setIsValidClass("form-control")
                let data = props.data;
                data.city = "";
                props.load(data);
            }
        }
    }, [city, props]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="city" >Ciudad*</label>
            </div>
            <BeShowed show={!props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="city" type="text" maxLength="80" ref={inputCity} placeholder="Ingrese ciudad de la franquicia..."
                        onChange={handleCity} defaultValue={props.data.city}/>
                </div>
            </BeShowed>
            <BeShowed show={props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="name" type="text" maxLength="80" defaultValue={props.data.city} readOnly />
                </div>
            </BeShowed>
        </div>
    );
}