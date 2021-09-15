import React, { useRef, useEffect, useState } from "react";
import formattedDate from "../../../utils/formattedDate";

export default function RegisterEmployee() {

    const startDate = formattedDate(new Date());
    const inputDate = useRef(null);
    const [date, setDate] = useState();

    useEffect(() => {
        inputDate.current.value = startDate;
        setDate(inputDate.current.value);
    }, []);

    const onChangeDate = () => {
        if (inputDate) setDate(inputDate.current.value);
    }

    return (
        <>
            <h2>Datos laborales</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employeeCharge" >Cargo*</label>
                </div>
                <div className="form-control-input">
                    <select className="form-control" id="employeeCharge">
                        <option disabled value="-1">Seleccione cargo del empleado...</option>
                    </select>
                </div>
            </div>


            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Fecha de ingreso*</label>
                </div>
                <div className="form-control-input">
                    <input className="form-control" id="dateEmployee" type="date" ref={inputDate} onChange={onChangeDate}
                        min={"2021-01-01"} max={startDate} />
                </div>
            </div>



            <div className="formRow">
                <div className="form-control-label">
                    <label>Relación laboral*</label>
                </div>
                <div className="d-flex form-radio-group">
                    <div className="form-check form-radio">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="black" value="black" ></input>
                        <label className="form-check-label" htmlFor="black">
                            En negro
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="white" value="white" ></input>
                        <label className="form-check-label" htmlFor="white">
                            En blanco
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}