import React, { useEffect, useRef, useState } from "react";
import { getCharges } from "helpers/getCharges";
import formattedDate from "utils/formattedDate";
import ChargeFormControl from "./ChargeFormControl";

export default function ExtraDataEmployee({
    isReadingEmployeeData,
    data,
    load,
}) {

    const [date, setDate] = useState();
    const [firstDayOffDate, setFirstDayOffDate] = useState();
    const [allCharges, setAllCharges] = useState([]);
    const inputDate = useRef(null);
    const inputFirstDayOff = useRef(null);
    const rb1 = useRef(null);
    const rb2 = useRef(null);
    const rb3 = useRef(null);
    const maxDate = formattedDate(new Date(), 3);
    const startDate = formattedDate(new Date());

    useEffect(() => {
        if (isReadingEmployeeData) return;

        if (!data.date) {
            data.date = inputDate.current.value;
            load(data);
        }
    }, [data]);

    useEffect(() => {
        console.log(data.employment_relationship )
        if (data.employment_relationship === 1) {
            rb1.current.checked = false;
            rb2.current.checked = false;
            rb3.current.checked = true;
        } else if (data.employment_relationship === 2) {
            rb1.current.checked = true;
            rb2.current.checked = false;
            rb3.current.checked = false;
        } else if (data.employment_relationship === 3) {
            rb1.current.checked = false;
            rb2.current.checked = true;
            rb3.current.checked = false;
        } else {
            rb1.current.checked = false;
            rb2.current.checked = false;
            rb3.current.checked = false;
        }
    })

    useEffect(() => {
        if (isReadingEmployeeData) return;

        if (!inputDate.current.value && !data.editing) {
            inputDate.current.value = startDate;
            setDate(inputDate.current.value);
            data.date = inputDate.current.value;
            load(data);
        }
        else if (!inputDate.current.value && data.editing) {
            inputDate.current.value = data.date;
            setDate(inputDate.current.value);
        }
        else {
            data.date = inputDate.current.value;
            load(data);
        }
    }, [startDate, date, data]);

    useEffect(() => {
        if (data.isCreatingNewEmployee) {
            const employeeEntryDate = inputDate.current.value;
            const currentFirstDayOffValue = inputFirstDayOff.current.value;

            if (currentFirstDayOffValue < employeeEntryDate) {
                inputFirstDayOff.current.value = null
                setFirstDayOffDate(null)
            }
        }
    }, [date]);

    useEffect(() => {
        if (isReadingEmployeeData) return;

        data.firstDayOffDate = firstDayOffDate;
        load(data)
    }, [firstDayOffDate]);

    const onChangeDate = () => {
        if (inputDate) setDate(inputDate.current.value);
    }

    const onChangeFirstDayOffDate = () => {
        if (inputFirstDayOff) setFirstDayOffDate(inputFirstDayOff.current.value);
    }

    const handlerOnChange = (e) => {
        if (isReadingEmployeeData) return;

        if (e.target.value === "black") data.employment_relationship = 2;
        else if (e.target.value === "white4") data.employment_relationship = 3;
        else data.employment_relationship = 1;
        data.editing = false;
        load(data);
    }

    useEffect(() => {
        getCharges().then((charges) => {
            setAllCharges(charges);
        })
    }, []);

    return (
        <>
            <h2>Datos laborales</h2>

            <ChargeFormControl
                formData={data}
                allCharges={allCharges}
                updateFormData={load}
                disableSelect={isReadingEmployeeData}
            />

            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Fecha de ingreso*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className="form-control"
                        defaultValue={data.date}
                        id="dateEmployee"
                        max={maxDate}
                        min={"2001-01-01"}
                        onChange={onChangeDate}
                        disabled={isReadingEmployeeData}
                        ref={inputDate}
                        type="date"
                    />
                </div>
            </div>

            {data.isCreatingNewEmployee && (
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="employeeFirstDayOff" >Fecha primer franco*</label>
                    </div>
                    <div className="form-control-input">
                        <input
                            className="form-control"
                            id="employeeFirstDayOff"
                            min={date}
                            onChange={onChangeFirstDayOffDate}
                            ref={inputFirstDayOff}
                            type="date"
                        />
                    </div>
                </div>
            )}

            <div className="formRow">
                <div className="form-control-label col-sm-3">
                    <label>Relación laboral*</label>
                </div>
                <div className="form-radio-group col-sm-9">
                    <div className="form-check form-radio formRow">
                        <input
                            className="form-check-input"
                            disabled={isReadingEmployeeData}
                            id="black"
                            name="flexRadioDefault"
                            onChange={handlerOnChange}
                            ref={rb1}
                            type="radio"
                            value="black"
                        >
                        </input>

                        <label className="form-check-label" htmlFor="black"> Monotributista </label>
                    </div>

                    <div className="form-check formRow">
                        <input
                            className="form-check-input"
                            disabled={isReadingEmployeeData}
                            id="white4"
                            name="flexRadioDefault"
                            onChange={handlerOnChange}
                            ref={rb2}
                            type="radio"
                            value="white4"
                        >
                        </input>

                        <label className="form-check-label" htmlFor="white4"> Relación de dependencia 4 horas </label>
                    </div>
                    
                    <div className="form-check formRow">
                        <input
                            className="form-check-input"
                            disabled={isReadingEmployeeData}
                            id="white"
                            name="flexRadioDefault"
                            onChange={handlerOnChange}
                            ref={rb3}
                            type="radio"
                            value="white"
                        >
                        </input>

                        <label className="form-check-label" htmlFor="white"> Relación de dependencia 6 horas </label>
                    </div>
                </div>
            </div>
        </>
    );
}