import Axios from "axios";
import { useEffect, useRef, useState } from "react";

import BeShowed from "common/BeShowed";
import Breadcrumb from 'common/Breadcrumb';
import Buttons from 'common/Buttons';
import LoaderSpinner from "common/LoaderSpinner";

import dateText from "utils/DateFormat/dateText";
import dateToString from "utils/ConverterDate/dateToString";
import floatToHour from "utils/Hs/floatToHour";
import validateFloatNumbers from "utils/validateFloatNumbers";
import warningMessage from "utils/WarningMessages/warningMessage";

import ShowSelectedEmployee from "./ShowSelectedEmployee";
import '../../../assets/Buttons.css';
import { faPlus, faMinus, faUserFriends, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadByName from "./UploadByName";
import {filterEmployeesByEmploymentDate} from "./filterEmployeesByEmploymentDate";

const PORT = require('../../../config');

const FormSalary = ({
    selectedAction,
    selectedMonth,
    salaries,
    salary,
    setActionSalary,
}) => {

    const [showSpinner, setShowSpinner] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [nro, setNro] = useState(0);
    const [errorName, setErrorName] = useState(true);
    const [errorPrice, setErrorPrice] = useState(true);
    const nroRef = useRef(null);
    const [othersPlus, setOthersPlus] = useState([]);
    const [othersMinus, setOthersMinus] = useState([]);
    const [main, setMain] = useState([
        { id: 'MtoF', name: 'Hs. Luneas a Viernes', hs_number: 1, price: 0, id_concept: 1 },
        { id: 'SnS', name: 'Hs. Sabado y Domingo', hs_number: 1, price: 0, id_concept: 2 },
        { id: 'FMtoF', name: 'Hs. Feriado Luneas a Viernes', hs_number: 1, price: 0, id_concept: 3 },
        { id: 'FSnS', name: 'Hs. Feriado Sabado y Domingo', hs_number: 1, price: 0, id_concept: 4 },
        { id: 'F', name: 'Hs. Franco', hs_number: 1, price: 0, id_concept: 5 }
    ]);
    const [totalHs, setTotalHs] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [advances, setAdvances] = useState([]);
    const [concepts, setConcepts] = useState([]);
    const [warning, setWarning] = useState(-1);

    useEffect(() => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                let aux = filterEmployeesByEmploymentDate(response.data, selectedMonth);
                let display = [];
                aux.forEach((person) => {
                    person.fullName = person.last_name;
                    person.fullName += ', ';
                    person.fullName += person.name;
                    const exist = salaries?.filter((elem) => { return elem.dni === person.dni; });
                    if (exist.length < 1) display.push(person);
                });
                setEmployees(display);
                Axios.get(PORT() + `/api/concepts`)
                    .then((response) => {
                        setConcepts(response.data);
                    })
                    .catch((error) => console.log(error));
                if (selectedAction === 'Registrar') setEmployee(display[nro]);
                else {
                    let employ = response.data.find((employee) => { return employee.dni === salary.dni })
                    if (employ == null) warningMessage("Error", "No se encontraron empleados activos que coincidan con el salario solicitado", "error")
                        .then((value) => {
                            setActionSalary('Listar', selectedMonth);
                        });
                    setEmployee(employ);

                    Axios.get(PORT() + `/api/salariesdetails/${salary.id_salary}`)
                        .then((response) => {
                            let aux = response.data;
                            let mainAux = main;
                            let plus = [];
                            let minus = [];
                            aux.forEach((detail) => {
                                detail.price = detail.amount;
                                if (detail.id_concept > 5) {
                                    if (detail.positive === 0) minus.push(detail);
                                    else plus.push(detail);
                                } else {
                                    let acuTotalHs = 0;
                                    let acuSubtotal = subtotal;
                                    let acuTotal = total;
                                    main.forEach((hsOfItem, i) => {
                                        if (hsOfItem === detail.id_concept - 1) mainAux[i] = { id: hsOfItem.id, name: hsOfItem.name, hs_number: hsOfItem.hs_number, price: parseInt(detail.amount), predictive: hsOfItem.predictive, id_concept: hsOfItem.id_concept };
                                        else mainAux[i] = { id: hsOfItem.id, name: hsOfItem.name, hs_number: hsOfItem.hs_number, price: hsOfItem.price, predictive: hsOfItem.predictive, id_concept: hsOfItem.id_concept };
                                        acuTotalHs += +(Math.round(i.hs_number * i.price + "e+2") + "e-2");
                                    });
                                    acuSubtotal += acuTotalHs;
                                    acuTotal += acuSubtotal;

                                    setTotalHs(acuTotalHs ? acuTotalHs : 0);
                                    setSubtotal(acuSubtotal ? acuSubtotal : 0);
                                    setTotal(acuTotal ? acuTotal : 0);
                                    setMain(mainAux);
                                }
                            });
                            if (plus.length > 0) setOthersPlus(plus);
                            if (minus.length > 0) setOthersMinus(minus);
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));
    }, [selectedAction]);

    const even = element => element.price === 0;

    useEffect(() => {
        if (employee != null) {
            Axios.get(`https://nolaborables.com.ar/api/v2/feriados/${new Date().getFullYear()}`)
                .then((response) => {
                    let newNonworkingDays = [];
                    response.data.forEach((nWD) => {
                        newNonworkingDays.push({ day: nWD.dia, month: (nWD.mes - 1) })
                    })
                    setShowSpinner(true);
                    Axios.get(`${PORT()}/api/hsWorked?monthYear=${selectedMonth}&dni=${employee.dni}&nonWorkingDays=${JSON.stringify(newNonworkingDays)}`)
                        .then((response) => {
                            if (response.data.Ok === false) console.log(response.data);
                            else {
                                let aux = [
                                    { id: 'MtoF', name: 'Hs. Lunes a Viernes', hs_number: response.data[0].hs_number, price: response.data[0].amount, id_hs_worked: response.data[0].id_hs_worked > 0 ? response.data[0].id_hs_worked : 0, predictive: 0, id_concept: 1},
                                    { id: 'SnS', name: 'Hs. Sabado y Domingo', hs_number: response.data[1].hs_number, price: response.data[1].amount, id_hs_worked: response.data[1].id_hs_worked > 0 ? response.data[1].id_hs_worked : 0, predictive: 0, id_concept: 2 },
                                    { id: 'FMtoF', name: 'Hs. Feriados Lunes a Viernes', hs_number: response.data[2].hs_number, price: response.data[2].amount, id_hs_worked: response.data[2].id_hs_worked > 0 ? response.data[2].id_hs_worked : 0, predictive: 0, id_concept: 3 },
                                    { id: 'FSnS', name: 'Hs. Feriados Sabado y Domingo', hs_number: response.data[3].hs_number, price: response.data[3].amount, id_hs_worked: response.data[3].id_hs_worked > 0 ? response.data[3].id_hs_worked : 0, predictive: 0, id_concept: 4 },
                                    { id: 'F', name: 'Hs. Franco Trabajado', hs_number: response.data[4].hs_number, price: response.data[4].amount, id_hs_worked: response.data[4].id_hs_worked > 0 ? response.data[4].id_hs_worked : 0, predictive: 0, id_concept: 5 }
                                ];
                                // if (main.some(even)) setMain(aux);
                                setMain(aux);

                                setShowSpinner(false);
                                if (selectedAction === 'Registrar') nroRef.current.focus();
                            }
                        })
                        .catch((err) => {
                            setShowSpinner(false);
                            warningMessage("Error", "El servidor no pudo procesar las horas trabajadas del empleado solicitado", "error");
                        });
                })
                .catch((err) => {
                    setShowSpinner(false);
                    warningMessage("Error", "No se pudieron buscar los días feriados", "error");
                });
            if (salary.month && (salary.month.slice(5, -3) === '06' || salary.month.slice(5, -3) === '12') && selectedAction === 'Registrar' && employee.employment_relationship === 2) {
                Axios.get(`${PORT()}/api/bonus?monthYear=${selectedMonth}&dni=${employee.dni}`)
                    .then((res) => {
                        if (res.data.Ok === false) console.log(res.data);
                        else {
                            const aux = [];
                            othersPlus.forEach((inc, i) => { aux[i] = inc });
                            if (res.data.length > 0) {
                                let max = res.data[0].total;
                                if (res.data.length < 6) aux[0] = { name: 'SAC 1*cta 2021 monotributista', price: ((max / 2) * 4) / 6, predictive: 0, id_concept: 12 };
                                else aux[0] = { name: 'SAC 1*cta 2021 monotributista', price: max / 2, predictive: 0, id_concept: 12 };
                            } else aux[0] = { name: 'SAC 1*cta 2021 monotributista', price: 0, predictive: 0, id_concept: 12 };
                            setOthersPlus(aux);
                        }
                    });
            }
            if (selectedAction === 'Registrar' && employee.employment_relationship !== 2) {
                const aux = [];
                othersPlus.forEach((inc, i) => { aux[i] = inc });
                aux[0] = { name: 'Recibo', price: 0, predictive: 0, id_concept: 6 };
                setOthersPlus(aux);
            }

            if (selectedAction !== 'Ver') {
                Axios.get(`${PORT()}/api/installmentstopay?date=${selectedMonth}&dniEmployee=${employee.dni}`)
                    .then((r) => {
                        if (r.data.Ok === false) console.log(r.data);
                        else {
                            if (r.data.length > 0) {
                                if(selectedAction === 'Registrar'){
                                    const aux = [];
                                    othersMinus.forEach((dis, i) => { aux[i] = dis });
                                    let acu = 0;
                                    r.data.forEach((dis, i) => {
                                        dis.date = dateToString(dis.date, true);
                                        dis.month = dateToString(dis.month, true);
                                        acu += dis.amount;
                                    });
                                    aux[0] = { name: 'Adelantos', price: acu, predictive: 0, id_concept: 8 };
                                    setOthersMinus(aux);
                                }
                                setAdvances(r.data);
                            }
                        }
                    });
            }
        }
    }, [employee]);

    const registerSalary = () => {
        setShowSpinner(true);
        if (advances.length > 0) {
            Axios.put(`${PORT()}/api/installmentstopay?date=${selectedMonth}&dniEmployee=${employee.dni}`, { advances })
                .then((response) => {
                    if (response.data.Ok !== false) {
                        Axios.post(`${PORT()}/api/salaries`, {
                            "total": total, "subtotal": subtotal, "totalHs": totalHs, "details": [main, othersPlus, othersMinus],
                            "dni": employee.dni, "monthYear": selectedMonth, "state": 2
                        })
                            .then((res) => {
                                if (res.data.Ok && res.data.Ok !== false) resetStates(false);
                                else {
                                    setShowSpinner(false);
                                    warningMessage("Error", `${res.data.Message}`, "error");
                                }
                            })
                            .catch((e) => {
                                setShowSpinner(false);
                                warningMessage("Error", `${e}`, "error");
                            })
                    }
                    else {
                        setShowSpinner(false);
                        warningMessage("Error", `${response.data.Message}`, "error");
                    }
                })
                .catch((error) => {
                    setShowSpinner(false);
                    warningMessage("Error", `${error}`, "error");
                })
        } else {
            Axios.post(`${PORT()}/api/salaries`, {
                "total": total, "subtotal": subtotal, "totalHs": totalHs, "details": [main, othersPlus, othersMinus],
                "dni": employee.dni, "monthYear": selectedMonth, "state": 2
            })
                .then((res) => {
                    if (res.data.Ok !== false) resetStates(false);
                    else {
                        setShowSpinner(false);
                        warningMessage("Error", `${res.data.Message}`, "error");
                    }
                })
                .catch((e) => {
                    setShowSpinner(false);
                    warningMessage("Error", `${e}`, "error");
                })
        }
    }

    const jump = () => {
        setShowSpinner(true);
        Axios.post(`${PORT()}/api/salaries`, {
            "total": total, "subtotal": subtotal, "totalHs": totalHs, "details": [main, othersPlus, othersMinus],
            "dni": employee.dni, "monthYear": selectedMonth, "state": 1
        })
            .then((res) => {
                if (res.data.Ok && res.data.Ok !== false) resetStates(false);
                else {
                    setShowSpinner(false);
                    warningMessage("Error", `${res.data.Message}`, "error");
                }
            })
            .catch((error) => {
                setShowSpinner(false);
                warningMessage("Error", `${error}`, "error");
            })
    }

    const editSalary = () => {
        setShowSpinner(true);
        if (advances.length > 0) {
            Axios.put(`${PORT()}/api/installmentstopay?date=${selectedMonth}&dniEmployee=${employee.dni}`, { advances })
                .then((response) => {
                    if (response.data.Ok !== false) {
                        Axios.put(`${PORT()}/api/salaries/${salary.id_salary}`, {
                            "total": total, "subtotal": subtotal, "totalHs": totalHs, "details": [main, othersPlus, othersMinus],
                            "dni": employee.dni, "monthYear": selectedMonth, "state": 2
                        })
                            .then((res) => {
                                if (res.data.Ok && res.data.Ok !== false) comeBack(true);
                                else {
                                    setShowSpinner(false);
                                    warningMessage("Error", `${res.data.Message}`, "error");
                                }
                            })
                            .catch((e) => {
                                setShowSpinner(false);
                                warningMessage("Error", `${e}`, "error");
                            })
                    }
                    else {
                        setShowSpinner(false);
                        warningMessage("Error", `${response.data.Message}`, "error");
                    }
                })
                .catch((error) => console.error(error))
        } else {
            Axios.put(`${PORT()}/api/salaries/${salary.id_salary}`, {
                "total": total, "subtotal": subtotal, "totalHs": totalHs, "details": [main, othersPlus, othersMinus],
                "dni": employee.dni, "monthYear": selectedMonth, "state": 2
            })
                .then((res) => {
                    if (res.data.Ok && res.data.Ok !== false) comeBack(true);
                    else warningMessage("Error", `${res.data.Message}`, "error");
                })
                .catch((e) => {
                    setShowSpinner(false);
                    warningMessage("Error", `${e}`, "error");
                })
        }
    }

    const resetStates = (showMsg) => {
        if (showMsg) {
            warningMessage('Atención', 'Se ha confirmado el salario correctamente', 'success');
        } else if (nro + 1 < employees.length) {
            setMain([
                { id: 'MtoF', name: 'Hs. Luneas a Viernes', hs_number: 1, price: main[0].price, predictive: 0, id_concept: 1 },
                { id: 'SnS', name: 'Hs. Sabado y Domingo', hs_number: 1, price: main[1].price, predictive: 0, id_concept: 2 },
                { id: 'FMtoF', name: 'Hs. Feriado Luneas a Viernes', hs_number: 1, price: main[2].price, predictive: 0, id_concept: 3 },
                { id: 'FSnS', name: 'Hs. Feriado Sabado y Domingo', hs_number: 1, price: main[3].price, predictive: 0, id_concept: 4 },
                { id: 'F', name: 'Hs. Franco', hs_number: 1, price: main[4].price, predictive: 0, id_concept: 5 }
            ]);
            setEmployee(employees[nro + 1]);
            setOthersPlus([]);
            setOthersMinus([]);
            setNro(nro + 1);
        } else {
            setActionSalary('Listar', selectedMonth);
        }
    }

    const comeBack = (msg) => {
        if (msg) {
            warningMessage('Atención', 'Se ha editado el salario correctamente', 'success');
        }
        setActionSalary('Listar', selectedMonth);
    }

    const actionNotOK = () => {
        if (errorName) {
            warningMessage('Atención', 'Se debe ingresar un nombre a todos los adicionales y descuentos', 'warning');
        }
        else if (errorPrice) {
            warningMessage('Atención', 'Todos los campos de precio deben ser completados y superiores a 0', 'warning');
        }
    }

    const validate = (e) => {
        if (e.target.value.length > 6) e.target.value = e.target.value.slice(0, 6);
    }

    const addPrice = (j, e, t) => {
        if (e.target.value <= 0 || e.target.value.length <= 0) setErrorPrice(true);
        if (t === 0) {
            const aux = [];
            main.forEach((hsOfItem, i) => {
                if (hsOfItem === j) aux[i] = { id: hsOfItem.id, name: hsOfItem.name, hs_number: hsOfItem.hs_number, price: e.target.value.toString() === 'NaN' ? 0 : parseInt(e.target.value), predictive: hsOfItem.predictive, id_concept: hsOfItem.id_concept };
                else aux[i] = { id: hsOfItem.id, name: hsOfItem.name, hs_number: hsOfItem.hs_number, price: hsOfItem.price, predictive: hsOfItem.predictive, id_concept: hsOfItem.id_concept };
            });
            setMain(aux);
        } else if (t === 1) {
            const aux = [];
            othersPlus.forEach((inc, i) => {
                if (inc === j) aux[i] = { name: inc.name, price: e.target.value.toString() === 'NaN' ? 0 : parseInt(e.target.value), predictive: inc.predictive, id_concept: inc.id_concept };
                else aux[i] = { name: inc.name, price: inc.price, predictive: inc.predictive, id_concept: inc.id_concept };
            });
            setOthersPlus(aux);
        } else {
            const aux = [];
            othersMinus.forEach((disc, i) => {
                if (disc === j) aux[i] = { name: disc.name, price: e.target.value.toString() === 'NaN' ? 0 : parseInt(e.target.value), predictive: disc.predictive, id_concept: disc.id_concept };
                else aux[i] = { name: disc.name, price: disc.price, predictive: disc.predictive, id_concept: disc.id_concept };
            });
            setOthersMinus(aux);
        }
    }

    const addOtherPlus = () => {
        const aux = [];
        othersPlus.forEach((inc, i) => { aux[i] = inc });
        aux.push({ name: '', price: 0, predictive: 1 });
        setOthersPlus(aux);
    }

    const addOtherMinus = () => {
        const aux = [];
        othersMinus.forEach((disc, i) => { aux[i] = disc });
        aux.push({ name: '', price: 0, predictive: 1 });
        setOthersMinus(aux);
    }

    const deleteOtherMinus = (e) => {
        const aux = [];
        othersMinus.forEach((disc, i) => {
            if (disc !== e) aux[i] = { name: disc.name, price: disc.price, predictive: disc.predictive, id_concept: disc.id_concept }
        });
        setOthersMinus(aux);
    }

    const deleteOtherPlus = (e) => {
        const aux = [];
        othersPlus.forEach((inc, i) => {
            if (inc !== e) aux[i] = { name: inc.name, price: inc.price, predictive: inc.predictive, id_concept: inc.id_concept }
        });
        setOthersPlus(aux);
    }

    useEffect(() => {
        let acuTotalHs = 0;
        let acuSubtotal = 0;
        let acuTotal = 0;
        let flagP = false;
        let flagN = false;

        main?.forEach(i => {
            if (i.price < 1 || i.price.toString() === 'NaN') {
                setErrorPrice(true);
                flagP = true;
            }
            acuTotalHs += +(Math.round(i.hs_number * i.price + "e+2") + "e-2");
        });

        acuSubtotal += acuTotalHs;

        othersPlus?.forEach(i => {
            if ((i.price < 1 || i.price.toString() === 'NaN') && i.id_concept !== 12) {
                setErrorPrice(true);
                flagP = true;
            }
            if (i.name.length < 1) {
                setErrorName(true);
                flagN = true;
            }
            acuSubtotal += +(Math.round(i.price + "e+2") + "e-2");
        });

        acuTotal += acuSubtotal;

        othersMinus?.forEach(i => {
            if (i.price < 1 || i.price.toString() === 'NaN') {
                setErrorPrice(true);
                flagP = true;
            }
            if (i.name.length < 1) {
                setErrorName(true);
                flagN = true;
            }
            acuTotal -= +(Math.round(i.price + "e+2") + "e-2");
        });

        setTotalHs(acuTotalHs ? acuTotalHs : 0);
        setSubtotal(acuSubtotal ? acuSubtotal : 0);
        setTotal(acuTotal ? acuTotal : 0);
        setErrorName(flagN);
        setErrorPrice(flagP);
    }, [total, subtotal, totalHs, main, othersMinus, othersPlus]);

    const warner = (k) => {
        if (k === warning) setWarning(-1);
        else setWarning(k);
    }

    return (
        <>
            <Breadcrumb parentName="Salarios" icon={faUserFriends} parentLink="salary" currentName={`${selectedAction} salario`} />
            <div style={{ display: 'none' }}>{document.title = `${selectedAction} salario`}</div>
            <div className="viewTitleBtn">
                <h1>{selectedAction} salario: {selectedAction !== "Registrar" ? salary?.id_salary + ' - ' + salary?.name + ' ' + salary?.last_name : ''}</h1>
            </div>

            <BeShowed show={showSpinner}>
                <br />
                <LoaderSpinner color="primary" loading="Calculando horas trabajadas del empleado..." />
            </BeShowed>
            <BeShowed show={!showSpinner}>
                <div className="d-flex justify-content-center pt-4">
                    <ShowSelectedEmployee selectedEmployee={employee} />
                    <div className="d-flex justify-content-center">
                        <div style={{ marginLeft: '2em', width: '60em' }}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <label>Fecha: </label>
                                    <input
                                        ref={nroRef}
                                        value={dateText(selectedMonth + '-01', false, true)}
                                        style={{ fontWeight: 'bold', marginLeft: '1em', border: '0px' }}
                                        readOnly
                                    >
                                    </input>
                                </div>
                                <BeShowed show={selectedAction === 'Registrar'} >
                                    <label className="fw-bold">{nro + 1}/{employees.length}</label>
                                </BeShowed>
                            </div>
                            <br />

                            <div className="container" >
                                <h3>Horas trabajadas</h3>
                                <div className="formRow justify-content-center">
                                    <div className="col-sm-4">
                                    </div>
                                    <div className="col-sm-2" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em' }}>Horas</label>
                                    </div>
                                    <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em' }}>Precio X Hs. ($)</label>
                                    </div>
                                    <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em' }}>Subtotal</label>
                                    </div>
                                </div>
                                {main?.map((i, k) => {
                                    return (
                                        <div key={i.name}>
                                            <div className="formRow justify-content-center">
                                                <div className="col-sm-4" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <label style={{ paddingLeft: '1em' }}>{i.name}</label>
                                                </div>
                                                <div className="col-sm-2" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <label style={{ paddingLeft: '1em' }}>{floatToHour(i.hs_number, true)}</label>
                                                </div>
                                                <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <div className="input-group has-validation">
                                                        <input className={i.price < 1 ? "form-control is-invalid" : "form-control"} id={'price' + i.id} type="number" onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                                            onChange={(e) => addPrice(i, e, 0)} min='1' max='999999' value={i.price} disabled={selectedAction === "Ver"} />
                                                        <span className="input-group-text" id="inputGroupPrepend" onClick={(e) => warner(k)}><FontAwesomeIcon style={{ color: 'orange' }} icon={faExclamationCircle} /></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <label style={{ paddingLeft: '1em' }}>${(i.hs_number * i.price) ? +(Math.round(i.hs_number * i.price + "e+2") + "e-2") : 0}</label>
                                                </div>
                                            </div>
                                            <BeShowed show={k === warning}><div className="alert alert-warning d-flex align-items-center" role="alert" style={{ height: '1em' }}>Si cambia el precio, el valor por defecto de este se vera cambiado para futuras consultas.</div></BeShowed>
                                        </div>
                                    )
                                })}
                                <div className="formRow justify-content-center">
                                    <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em', fontWeight: 'bold' }}>Total horas trabajadas</label>
                                    </div>
                                    <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em', fontWeight: 'bold' }}>${totalHs}</label>
                                    </div>
                                </div>
                                <br />

                                <h3>Adicionales</h3>
                                <div className="formRow justify-content-center">
                                    <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em' }}>Concepto </label> <small>(no se aceptan duplicados)</small>
                                    </div>
                                    <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em' }}>Precio ($)</label>
                                    </div>
                                </div>
                                {othersPlus?.map((i, n) => {
                                    return (
                                        <div key={i.id_concept} className="formRow justify-content-center">
                                            <BeShowed show={(i.predictive === 0 && i.id_concept !== 6) || selectedAction === "Ver"}>
                                                <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <label style={{ paddingLeft: '1em', fontStyle: 'italic' }}>{i.name}</label>
                                                </div>
                                                <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px', textAlign: 'center', fontWeight: 'bold' }}>
                                                    <label style={{ paddingLeft: '1em', fontStyle: 'italic' }}>{i.price}</label>
                                                </div>
                                            </BeShowed>
                                            <BeShowed show={i.predictive === 0 && i.id_concept === 6 && selectedAction !== "Ver"}>
                                                <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <label style={{ paddingLeft: '1em', fontStyle: 'italic' }}>{i.name}</label>
                                                </div>
                                                <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <input className={(i.price < 1 ? "form-control is-invalid" : "form-control") + " priceOtherPlus" + n} type="number" style={{ width: '100%' }} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                                        onChange={(e) => addPrice(i, e, 1)} min='0' max='999999' defaultValue={i.price ? i.price : null} />
                                                </div>
                                            </BeShowed>
                                            <BeShowed show={i.predictive === 1 && selectedAction !== "Ver"}>
                                                <div className="col-sm-1">
                                                    <button style={{ marginRight: '0em', marginLeft: '0.2em' }} type="button" className="btn btn-danger btnDelete" onClick={() => deleteOtherPlus(i)} ><FontAwesomeIcon icon={faMinus} /></button>
                                                </div>
                                                <div className="col-sm-8" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <UploadByName list={concepts} upload={setOthersPlus} i={i} itemName="Concepto" listName="conceptsList" className={" nameOtherPlus"} n={n} default={i.name}
                                                        placeholder="Ingrese el nombre del concepto..." maxLength="100" destiny={othersPlus} otherDestiny={othersMinus} />
                                                </div>
                                                <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <input className={(i.price < 1 ? "form-control is-invalid" : "form-control") + " priceOtherPlus" + n} type="number" style={{ width: '100%' }} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                                        onChange={(e) => addPrice(i, e, 1)} min='0' max='999999' defaultValue={i.price ? i.price : null} />
                                                </div>
                                            </BeShowed>
                                        </div>
                                    )
                                })}
                                <BeShowed show={selectedAction !== "Ver"}>
                                    <div className="formRow justify-content-center" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <button id='addOtherPlusButton' type="button" className="btn btn-info btnAdd" onClick={addOtherPlus} style={{ width: '11em', marginRight: '0.2em' }} ><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                    </div>
                                </BeShowed>
                                <div className="formRow justify-content-center">
                                    <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px', text: 'bold' }}>
                                        <label style={{ paddingLeft: '1em', fontWeight: 'bold' }}>Subtotal</label>
                                    </div>
                                    <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px', text: 'bold' }}>
                                        <label style={{ paddingLeft: '1em', fontWeight: 'bold' }}>${subtotal}</label>
                                    </div>
                                </div>
                                <br />

                                <h3>Descuentos</h3>
                                <div className="formRow justify-content-center">
                                    <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em' }}>Concepto </label> <small>(no se aceptan duplicados)</small>
                                    </div>
                                    <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em' }}>Precio ($)</label>
                                    </div>
                                </div>
                                {othersMinus?.map((i, n) => {
                                    return (
                                        <div key={i.id_concept} className="formRow justify-content-center">
                                            <BeShowed show={i.predictive === 0 || selectedAction === "Ver"}>
                                                <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <label style={{ paddingLeft: '1em', fontStyle: 'italic' }}>{i.name}</label>
                                                </div>
                                                <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px', textAlign: 'center', fontWeight: 'bold' }}>
                                                    <label style={{ paddingLeft: '1em', fontStyle: 'italic' }}>{i.price}</label>
                                                </div>
                                            </BeShowed>
                                            <BeShowed show={i.predictive === 1 && selectedAction !== "Ver"}>
                                                <div className="col-sm-1" >
                                                    <button style={{ marginRight: '0em', marginLeft: '0.2em' }} type="button" className={"btn btn-danger btnDelete deleteOtherMinusButton" + n} onClick={() => deleteOtherMinus(i)} ><FontAwesomeIcon icon={faMinus} /></button>
                                                </div>
                                                <div className="col-sm-8" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <UploadByName list={concepts} upload={setOthersMinus} i={i} itemName="Concepto" listName="conceptsList" className={" nameOtherMinus"} n={n} default={i.name}
                                                        placeholder="Ingrese el nombre del concepto..." maxLength="100" destiny={othersMinus} otherDestiny={othersPlus} />
                                                </div>
                                                <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                                    <input className={(i.price < 1 ? "form-control is-invalid" : "form-control") + " priceOtherMinus" + n} type="number" style={{ width: '100%' }} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                                        onChange={(e) => addPrice(i, e, 2)} min='0' max='999999' defaultValue={i.price ? i.price : null} />
                                                </div>
                                            </BeShowed>
                                        </div>
                                    )
                                })}

                                <BeShowed show={selectedAction !== "Ver"}>
                                    <div className="formRow justify-content-center" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <button id='addOtherMinusButton' type="button" className="btn btn-info btnAdd" onClick={addOtherMinus} style={{ width: '11em', marginRight: '0.2em' }} ><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                    </div>
                                </BeShowed>
                                <div className="formRow justify-content-center">
                                    <div className="col-sm-9" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em', fontWeight: 'bold' }}>Total a cobrar</label>
                                    </div>
                                    <div className="col-sm-3" style={{ border: '1px solid', borderRadius: '2px' }}>
                                        <label style={{ paddingLeft: '1em', fontWeight: 'bold' }}>${total}</label>
                                    </div>
                                </div>
                                <BeShowed show={selectedAction === 'Registrar'}>
                                    <Buttons ready={(!errorName && !errorPrice)}
                                        label='Confirmar' labelJump='Saltar' actionNotOK={actionNotOK} actionOK={registerSalary} actionJump={() => { jump() }} actionCancel={() => { comeBack(false) }} />
                                </BeShowed>
                                <BeShowed show={selectedAction === 'Editar'}>
                                    <Buttons ready={(!errorName && !errorPrice)}
                                        label='Registrar' actionNotOK={actionNotOK} actionOK={editSalary} actionCancel={() => { comeBack(false) }} />
                                </BeShowed>
                                <BeShowed show={selectedAction === 'Ver'}>
                                    <button className="btn btn-light sendOk offset-sm-11" onClick={() => { comeBack(false) }}>Volver</button>
                                </BeShowed>

                            </div>
                        </div>
                    </div>
                </div>
            </BeShowed>
        </>
    )
}

export default FormSalary;