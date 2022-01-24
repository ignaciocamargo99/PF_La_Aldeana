import React, { useEffect, useRef, useState } from "react";
import { getCharges } from "../../../helpers/getCharges";
import formattedDate from "../../../utils/formattedDate";
import ChargeCheckbox from "./ChargeCheckbox";

export default function ExtraDataEmployee(props) {
    const [date, setDate] = useState();
    const [allCharges, setAllCharges] = useState([]);
    const inputDate = useRef(null);
    const rb1 = useRef(null);
    const rb2 = useRef(null);
    const maxDate = formattedDate(new Date(), 3);
    const startDate = formattedDate(new Date());
    let data = props.data;

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        if (!data.date) {
            data.date = inputDate.current.value;
            props.load(data);
        }
    }, [data, props]);

    useEffect(() => {
        if (props.data.employment_relationship === 1) {
            rb1.current.checked = false;
            rb2.current.checked = true;
        } else if (props.data.employment_relationship === 2) {
            rb1.current.checked = true;
            rb2.current.checked = false;
        } else {
            rb1.current.checked = false;
            rb2.current.checked = false;
        }
    })

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        if (!inputDate.current.value && !props.data.editing) {
            inputDate.current.value = startDate;
            setDate(inputDate.current.value);
            data.date = inputDate.current.value;
            props.load(data);
        }
        else if (!inputDate.current.value && props.data.editing) {
            inputDate.current.value = props.data.date;
            setDate(inputDate.current.value);
        }
        else {
            data.date = inputDate.current.value;
            props.load(data);
        }
    }, [startDate, date, data]);

    const onChangeDate = () => {
        if (inputDate) setDate(inputDate.current.value);
    }

    const handlerOnChange = (e) => {
        if (props.isReadingEmployeeData) return;

        if (e.target.value === "black") data.employment_relationship = 2;
        else data.employment_relationship = 1;
        props.data.editing = false;
        props.load(data);
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

            {props.isReadingEmployeeData &&
                <ul>
                    {data.charges?.map((c) => {
                        return (
                            <li key={c.chargeId}>{c.chargeName}</li>
                        )
                    })}
                </ul>
            }

            {!props.isReadingEmployeeData && allCharges.map((c) => {
                return (
                    <ChargeCheckbox
                        key={c.id_charge}
                        chargeId={c.id_charge}
                        chargeName={c.name}
                        checkedCheckbox={data.charges?.map(x => x.chargeId).includes(c.id_charge)}
                        employeeData={data}
                        updateEmployeeData={props.load}
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
                        defaultValue={props.data.date}
                        id="dateEmployee"
                        max={maxDate}
                        min={"2001-01-01"}
                        onChange={onChangeDate}
                        readOnly={props.isReadingEmployeeData}
                        ref={inputDate}
                        type="date"
                    />
                </div>
            </div>

            <div className="formRow">
                <div className="form-control-label">
                    <label>Relación laboral*</label>
                </div>
                <div className="d-flex form-radio-group">
                    <div className="form-check form-radio">
                        <input
                            className="form-check-input"
                            disabled={props.isReadingEmployeeData}
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
                            disabled={props.isReadingEmployeeData}
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