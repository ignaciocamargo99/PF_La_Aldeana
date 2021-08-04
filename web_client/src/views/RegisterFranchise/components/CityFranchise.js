import React, { useEffect, useRef, useState } from "react";

export default function CityFranchise (props) {
    const inputCity = useRef(null);
    const [city, setCity] = useState("null");
    const [prevCity, setPrevCity] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleCity = () => {
        setPrevCity(city);
        setCity(inputCity.current.value);
    }

    useEffect(() => {
        if (inputCity.current.value.length > 0 && inputCity.current.value.length <= 80) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.city = inputCity.current.value;
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            let data = props.data;
            data.city = "";
            props.load(data);
        }
    }, [city]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="city" >Ciudad*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="city" type="text" maxLength="80" ref={inputCity} placeholder="Ingrese ciudad de la franquicia..." onChange={handleCity}>
                </input>
            </div>
        </div>
    );
}