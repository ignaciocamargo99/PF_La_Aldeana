import React, { useEffect, useRef, useState } from "react";
import formattedDate from "../../../utils/formattedDate";

export default function StartDate (props) {
    const inputDate = useRef(null);
    const [date, setDate] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleDate = () => {
        setDate(inputDate.current.value);
    }

    useEffect(() => {
        let today = formattedDate(new Date());
        if (inputDate.current.value > "2005-01-01" && inputDate.current.value <= today) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.start_date = inputDate.current.value;
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            let data = props.data;
            data.start_date = "";
            props.load(data);
        }
    }, [date]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="date" >Fecha de inicio de actividades*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="date" type="date" maxLength="80" ref={inputDate} placeholder="Ingrese fecha..." onChange={handleDate}>
                </input>
            </div>
        </div>
    );
}