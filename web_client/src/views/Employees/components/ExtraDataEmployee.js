import React, { useEffect, useRef, useState } from "react";
import { getCharges } from "../../../helpers/getCharges";
import formattedDate from "../../../utils/formattedDate";
import ChargeCheckbox from "./ChargeCheckbox";

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
        if (data.employment_relationship === 1) {
            rb1.current.checked = false;
            rb2.current.checked = true;
        } else if (data.employment_relationship === 2) {
            rb1.current.checked = true;
            rb2.current.checked = false;
        } else {
            rb1.current.checked = false;
            rb2.current.checked = false;
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

            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employeeCharge" >Cargos*</label>
                </div>
            </div>

            {isReadingEmployeeData &&
                <ul>
                    {data.charges?.map((c) => {
                        return (
                            <li key={c.chargeId}>{c.chargeName}</li>
                        )
                    })}
                </ul>
            }

            {!isReadingEmployeeData && allCharges.map((c) => {
                return (
                    <ChargeCheckbox
                        key={c.id_charge}
                        chargeId={c.id_charge}
                        chargeName={c.name}
                        checkedCheckbox={data.charges?.map(x => x.chargeId).includes(c.id_charge)}
                        employeeData={data}
                        updateEmployeeData={load}
                    ></ChargeCheckbox>
                )
            })}

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
                        readOnly={isReadingEmployeeData}
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
                <div className="form-control-label">
                    <label>Relación laboral*</label>
                </div>
                <div className="d-flex form-radio-group">
                    <div className="form-check form-radio">
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

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            disabled={isReadingEmployeeData}
                            id="white"
                            name="flexRadioDefault"
                            onChange={handlerOnChange}
                            ref={rb2}
                            type="radio"
                            value="white"
                        >
                        </input>

                        <label className="form-check-label" htmlFor="white"> Relación de dependencia </label>
                    </div>
                </div>
            </div>
        </>
    );
}