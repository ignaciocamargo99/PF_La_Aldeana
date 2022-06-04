import React, { useEffect, useRef, useState } from "react";
import { getCharges } from "helpers/getCharges";
import formattedDate from "utils/formattedDate";
import ChargeFormControl from "./ChargeFormControl";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";

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

    const inputStreet = useRef(null);
    const inputNumber = useRef(null);
    const inputNeighborhood = useRef(null);
    const inputCity = useRef(null);
    const [street, setStreet] = useState(null);
    const [number, setNumber] = useState(null);
    const [neighborhood, setNeighborhood] = useState(data.neighborhood);
    const [city, setCity] = useState(null);
    const [isValidClass, setIsValidClass] = useState("form-control");
    const [isValidClassNumber, setIsValidClassNumber] = useState("form-control");
    const [isValidClassNeighborhood, setIsValidClassNeighborhood] = useState("form-control");
    const [isValidClassCity, setIsValidClassCity] = useState("form-control");

    const handleStreet = () => setStreet(inputStreet.current.value.trim());
    const handleNumber = () => setNumber(inputNumber.current.value.trim());
    const handleNeighborhood = () => setNeighborhood(inputNeighborhood.current.value);
    const handleCity = () => setCity(inputCity.current.value);

    useEffect(() => {
        if (isReadingEmployeeData) return;

        if (!data.date) {
            data.date = inputDate.current.value;
            load(data);
        }
    }, [data]);

    useEffect(() => {
        if (isReadingEmployeeData) return;

        const streetName = inputStreet.current.value.trim();

        if (streetName) setIsValidClass("form-control is-valid");
        else setIsValidClass("form-control");

        data.street = streetName;
        load(data);
    }, [street]);

    useEffect(() => {
        if (isReadingEmployeeData) return;

        const number = inputNumber.current.value.trim();

        if (number.length <= 5 && number.length > 0) {
            setIsValidClassNumber("form-control is-valid");
            data.number = +number;
            load(data);
        }
        else {
            setIsValidClassNumber("form-control");
            data.number = number;
            load(data);
        }
    }, [number]);

    useEffect(() => {
        if (isReadingEmployeeData) return;

        if (neighborhood && neighborhood.trim()) setIsValidClassNeighborhood("form-control is-valid");
        else setIsValidClassNeighborhood("form-control");

        data.neighborhood = neighborhood;
        load(data);
    }, [neighborhood]);

    useEffect(() => {
        if (isReadingEmployeeData) return;
        const nameCity = inputCity.current.value.trim();
        if (nameCity) setIsValidClassCity("form-control is-valid");
        else setIsValidClassCity("form-control");

        data.city = nameCity;
        load(data);
    }, [city]);

    useEffect(() => {
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

    const validate = (e) => {
        if (e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
    }

    return (
        <>
            <h2>Datos del domicilio</h2>

            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="streetEmployee" >Calle*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClass}
                        defaultValue={data.street}
                        id="streetEmployee"
                        maxLength="80"
                        onChange={handleStreet}
                        placeholder="Ingrese calle..."
                        disabled={isReadingEmployeeData}
                        ref={inputStreet}
                        type="text"
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="numberEmployee" >Número*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClassNumber}
                        defaultValue={data.number}
                        id="numberEmployee"
                        min="1"
                        onChange={handleNumber}
                        onInput={(e) => validate(e)}
                        onKeyDown={(e) => validateFloatNumbers(e)}
                        placeholder="Ingrese número de domicilio..."
                        disabled={isReadingEmployeeData}
                        ref={inputNumber}
                        type="number"
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="neighborhoodEmployee" >Barrio</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClassNeighborhood}
                        defaultValue={data.neighborhood}
                        id="neighborhoodEmployee"
                        maxLength="80"
                        onChange={handleNeighborhood}
                        placeholder="Ingrese barrio..."
                        disabled={isReadingEmployeeData}
                        ref={inputNeighborhood}
                        type="text"
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="lastNameEmployee" >Localidad*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClassCity}
                        defaultValue={data.city}
                        id="cityEmployee"
                        maxLength="80"
                        onChange={handleCity}
                        placeholder="Ingrese ciudad..."
                        disabled={isReadingEmployeeData}
                        ref={inputCity}
                        type="text"
                    />
                </div>
            </div>
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
                <div className="form-control-label">
                    <label>Relación laboral*</label>
                </div>
                <div className="form-radio-group">
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

                        <label className="form-check-label" htmlFor="black" style={{paddingLeft:'0.4em'}}> Monotributista </label>
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

                        <label className="form-check-label" htmlFor="white4" style={{paddingLeft:'0.4em'}}> Relación de dependencia 4 horas </label>
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

                        <label className="form-check-label" htmlFor="white" style={{paddingLeft:'0.4em'}}> Relación de dependencia 6 horas </label>
                    </div>
                </div>
            </div>
        </>
    );
}