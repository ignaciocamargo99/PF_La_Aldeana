import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import Buttons from '../../../common/Buttons';
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import ShowSelectedEmployee from "./ShowSelectedEmployee";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateText from "../../../utils/DateFormat/dateText";
import dateToString from "../../../utils/ConverterDate/dateToString";
import floatToHour from "../../../utils/Hs/floatToHour";
const PORT = require('../../../config');

const FormSalary = (props) => {

    const [showSpinner,setShowSpinner] = useState(true);
    const [employees,setEmployees] = useState([]);
    const [employee,setEmployee] = useState(null);
    const [nro, setNro] = useState(0);
    const [errorName,setErrorName] = useState(true);
    const [errorPrice,setErrorPrice] = useState(true);
    const nroRef = useRef(null);
    const [othersPlus, setOthersPlus] = useState([]);
    const [othersMinus, setOthersMinus] = useState([]);
    const [main, setMain] = useState([
        {id: 'MtoF', name: 'Hs. Luneas a Viernes', hs: 1, price: 0},
        {id: 'SnS', name: 'Hs. Sabado y Domingo', hs: 1, price: 0},
        {id: 'FMtoF', name: 'Hs. Feriado Luneas a Viernes', hs: 1, price: 0},
        {id: 'FSnS', name: 'Hs. Feriado Sabado y Domingo', hs: 1, price: 0},
        {id: 'F', name: 'Hs. Franco', hs: 1, price: 0}
    ]);
    const [totalHs, setTotalHs] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [advances, setAdvances] = useState([]);
    const [concepts, setConcepts] = useState([]);

    const validateConcepts = (concept, concepts) => {
        let aux = concept;
        concepts?.forEach(existentConcept => {
            if (existentConcept.predictive === 0 && concept.toUpperCase() === existentConcept.name.toUpperCase()) aux = '';
        });
        othersPlus?.forEach(existentConcept => {
            if (concept.toUpperCase() === existentConcept.name.toUpperCase()) aux = '';
        });
        othersMinus?.forEach(existentConcept => {
            if (concept.toUpperCase() === existentConcept.name.toUpperCase()) aux = '';
        });
        return aux;
    }

    useEffect(() => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                let aux = response.data;
                let display = [];
                aux.forEach((person)=>{
                    person.fullName = person.last_name;
                    person.fullName += ', ';
                    person.fullName += person.name;
                    const exist = props.salaries?.filter((elem) => {
                        return elem.dni == person.dni;
                    });
                    if (exist.length < 1) display.push(person);
                });
                setEmployees(display);
                Axios.get(PORT() + `/api/concepts`)
                    .then((response) => {
                        setConcepts(response.data);
                    })
                    .catch((error) => console.log(error));
                    setShowSpinner(false);
                if (props.action === 'Registrar') setEmployee(display[nro]);
                else {
                    setEmployee(response.data.find((employee) =>  { return employee.dni === props.salary.dni }));
                    Axios.get(PORT() + `/api/salariesdetails/${props.salary.id_salary}`)
                    .then((response) => {
                        let aux = response.data;
                        let plus = [];
                        let minus = [];
                        aux.forEach((detail)=>{
                            if (detail.id_concept > 5) {
                                if (detail.positive === 0) minus.push(detail);
                                else plus.push(detail);
                            }
                            if (detail.id_concept == 8) setAdvances(advances.push());
                        });
                        if (plus.length > 0) setOthersPlus(plus);
                        if (minus.length > 0) setOthersMinus(minus);
                    })
                    .catch((error) => console.log(error));
                    setShowSpinner(false);
                }
            })
            .catch((error) => console.log(error));
    },[props.action]);

    useEffect(() => {
        if (employee !== null) {
            Axios.get(`http://nolaborables.com.ar/api/v2/feriados/${new Date().getFullYear()}`)
            .then((response) => {
                let newNonworkingDays = [];
                response.data.forEach((nWD) => {
                    newNonworkingDays.push({day: nWD.dia, month: (nWD.mes - 1)})
                })
                Axios.get(`${PORT()}/api/hsWorked?monthYear=${props.month}&dni=${employee.dni}&nonWorkingDays=${JSON.stringify(newNonworkingDays)}`)
                    .then((response) => {
                        if (response.data.Ok === false) console.log(response.data);
                        else {
                            let aux = [
                                {id: 'MtoF', name: 'Hs. Lunes a Viernes', hs: response.data[0].hs_number, price: response.data[0].amount, id_hs_worked: response.data[0].id_hs_worked > 0 ? response.data[0].id_hs_worked : 0},
                                {id: 'SnS', name: 'Hs. Sabado y Domingo', hs: response.data[1].hs_number, price: response.data[1].amount, id_hs_worked: response.data[1].id_hs_worked > 0 ? response.data[1].id_hs_worked : 0},
                                {id: 'FMtoF', name: 'Hs. Feriados Lunes a Viernes', hs: response.data[2].hs_number, price: response.data[2].amount, id_hs_worked: response.data[2].id_hs_worked > 0 ? response.data[2].id_hs_worked : 0},
                                {id: 'FSnS', name: 'Hs. Feriados Sabado y Domingo', hs: response.data[3].hs_number, price: response.data[3].amount, id_hs_worked: response.data[3].id_hs_worked > 0 ? response.data[3].id_hs_worked : 0},
                                {id: 'F', name: 'Hs. Franco Trabajado', hs: response.data[4].hs_number, price: response.data[4].amount, id_hs_worked: response.data[4].id_hs_worked > 0 ? response.data[4].id_hs_worked : 0}
                            ];
                            setMain(aux);
                            setShowSpinner(false);
                        }
                    });
            })
            .catch((err) => {console.log(err)});

            if (props.salary.month && (props.salary.month.slice(5, -3) === '06' || props.salary.month.slice(5, -3) === '12') && props.action === 'Registrar') {
                Axios.get(`${PORT()}/api/bonus?monthYear=${props.month}&dni=${employee.dni}`)
                .then((res) => {
                    if (res.data.Ok === false) console.log(res.data);
                    else {
                        const aux = [];
                        othersPlus.forEach((inc, i) => {aux[i] = inc});
                        let max = res.data[0].total;
                        if (res.data.length < 6) aux[0] = {name: 'SAC 1*cta 2021 Negro', price: ((max/2)*4)/6};
                        else {
                            aux[0] = {name: 'SAC 1*cta 2021 Negro', price: max/2};
                        }
                        setOthersPlus(aux);
                    }
                });
            }

            if (props.salary.month && props.action === 'Registrar') {
                Axios.get(`${PORT()}/api/installmentstopay?date=${props.month}&dniEmployee=${employee.dni}`)
                .then((r) => {
                    if (r.data.Ok === false) console.log(r.data);
                    else {
                        if (r.data.length > 0) {
                            const aux = [];
                            othersMinus.forEach((dis, i) => {aux[i] = dis});
                            let acu = 0;
                            r.data.forEach((dis, i) => {
                                dis.date = dateToString(dis.date, true);
                                dis.month = dateToString(dis.month, true);
                                acu += dis.amount;
                            });
                            aux[0] = {name: 'Adelantos', price: acu};
                            setOthersMinus(aux);
                            setAdvances(r.data);
                        }
                    }
                });
            }
        }
    }, [employee]);
    
    const registerSalary = () => {
        setShowSpinner(true);
        if (advances.length > 0){
            Axios.put(`${PORT()}/api/installmentstopay?date=${props.month}&dniEmployee=${employee.dni}`, {advances})
            .then((response) => {
                if (response.data.Ok !== false) {
                    Axios.post(`${PORT()}/api/salaries`, {"total": total, "subtotal": subtotal, "totalHs":totalHs, "details":[main,othersPlus,othersMinus],
                            "dni":employee.dni, "monthYear": props.month, "state": 2})
                        .then((res) => {
                            if (res.data.Ok !== false) resetStates(false);
                            else warningMessage("Error", `${res.data.Message}`, "error");
                        })
                        .catch((e) => console.error(e))   
                }
                else warningMessage("Error", `${response.data.Message}`, "error");
            })
            .catch((error) => console.error(error))
        } else {
            Axios.post(`${PORT()}/api/salaries`, {"total": total, "subtotal": subtotal, "totalHs":totalHs, "details":[main,othersPlus,othersMinus],
                    "dni":employee.dni, "monthYear": props.month, "state": 2})
                .then((res) => {
                    if (res.data.Ok !== false) resetStates(false);
                    else warningMessage("Error", `${res.data.Message}`, "error");
                })
                .catch((e) => console.error(e))   
            }
    }

    const jump = () => {
        setShowSpinner(true);
        Axios.post(`${PORT()}/api/salaries`, {"total": total, "subtotal": subtotal, "totalHs":totalHs, "details":[main,othersPlus,othersMinus],
            "dni":employee.dni, "monthYear": props.month, "state": 1})
        .then((res) => {
            if (res.data.Ok !== false) resetStates(false);
            else warningMessage("Error", `${res.data.Message}`, "error");
        })
        .catch((e) => console.error(e))   
    }

    const editSalary = () => {
        setShowSpinner(true);
        if (advances.length > 0){
            Axios.put(`${PORT()}/api/installmentstopay?date=${props.month}&dniEmployee=${employee.dni}`, {advances})
            .then((response) => {
                if (response.data.Ok !== false) {
                    Axios.put(`${PORT()}/api/salaries/${props.salary.id_salary}`, {"total": total, "subtotal": subtotal, "totalHs":totalHs, "details":[main,othersPlus,othersMinus],
                            "dni":employee.dni, "monthYear": props.month, "state": 2})
                        .then((res) => {
                            if (res.data.Ok !== false) comeBack(false);
                            else warningMessage("Error", `${res.data.Message}`, "error");
                        })
                        .catch((e) => console.error(e))   
                }
                else warningMessage("Error", `${response.data.Message}`, "error");
            })
            .catch((error) => console.error(error))
        } else {
            Axios.put(`${PORT()}/api/salaries/${props.salary.id_salary}`, {"total": total, "subtotal": subtotal, "totalHs":totalHs, "details":[main,othersPlus,othersMinus],
                    "dni":employee.dni, "monthYear": props.month, "state": 2})
                .then((res) => {
                    if (res.data.Ok !== false) comeBack(false);
                    else warningMessage("Error", `${res.data.Message}`, "error");
                })
                .catch((e) => console.error(e))   
            }
    }
    
    const resetStates = (showMsg) => {
        if(showMsg){
            warningMessage('Atención','Se ha confirmado el salario correctamente','success');
            props.setReloadList(!props.reloadList);
        } else if (nro + 1 < employees.length) {
            setNro(nro + 1);
            setEmployee(employees[nro + 1]);
            nroRef.current.focus();
        } else {
            warningMessage('Atención','Se han generado todas los salarios correctamente','success');
            props.setReloadList(!props.reloadList);
            props.setActionSalary('Listar',null);
            window.location.replace('/app/salary');
        }
    }

    const comeBack = (msg) => {
        if(msg){
            warningMessage('Atención','Se ha editado el salario correctamente','success');
        }
        props.setActionSalary('Listar',null);
        window.location.replace('/app/salary');
    }

    const actionNotOK = () =>{
        if (errorName){
            warningMessage('Atención','Se debe ingresar un nombre a totdos los adicionales y descuentos','warning');
        }
        else if (errorPrice){
            warningMessage('Atención','Todos los campos de precio deben ser completados y superiores a 0','warning');
        }
    }

    const validate = (e) => {
        if (e.target.value.length > 6) e.target.value = e.target.value.slice(0, 6);
    }

    const addPrice = (j, e, t) => {
        if (e.target.value <= 0) setErrorPrice(true);
        if (t === 0) {
            const aux = [];
            main.forEach((hs, i) => {
                if (hs === j) aux[i] = {id: hs.id, name: hs.name, hs: hs.hs, price: parseInt(e.target.value)};
                else aux[i] = {id: hs.id, name: hs.name, hs: hs.hs, price: hs.price};
            });
            setMain(aux);

        } else if (t === 1) {
            const aux = [];
            othersPlus.forEach((inc, i) => {
                if (inc === j) aux[i] = {name: inc.name, price: parseInt(e.target.value)};
                else aux[i] = {name: inc.name, price: inc.price};
            });
            setOthersPlus(aux);
        } else {
            const aux = [];
            othersMinus.forEach((disc, i) => {
                if (disc === j) aux[i] = {name: disc.name, price: parseInt(e.target.value)};
                else aux[i] = {name: disc.name, price: disc.price};
            });
            setOthersMinus(aux);
        }
    }

    const addName = (j, e, t) => {
        if (t === 1) {
            const aux = [];
            othersPlus.forEach((inc, i) => {
                if (inc === j) aux[i] = {name: validateConcepts(e.target.value, concepts), price: inc.price};
                else aux[i] = {name: inc.name, price: inc.price};
            });
            setOthersPlus(aux);
        } else {
            const aux = [];
            othersMinus.forEach((disc, i) => {
                if (disc === j) aux[i] = {name: validateConcepts(e.target.value, concepts), price: disc.price};
                else aux[i] = {name: disc.name, price: disc.price};
            });
            setOthersMinus(aux);
        }
    }

    const addOtherPlus = () => {
        const aux = [];
        othersPlus.forEach((inc, i) => {aux[i] = inc});
        aux.push({name: '', price: 0});
        setOthersPlus(aux);
    }

    const addOtherMinus = () => {
        const aux = [];
        othersMinus.forEach((disc, i) => {aux[i] = disc});
        aux.push({name: '', price: 0});
        setOthersMinus(aux);
    }

    const deleteOtherMinus = (e) => {
        const aux = [];
        othersMinus.forEach((disc, i) => {
            if (disc !== e) aux[i] = {name: disc.name, price: disc.price}
        });
        setOthersMinus(aux);
    }

    const deleteOtherPlus = (e) => {
        const aux = [];
        othersPlus.forEach((inc, i) => {
            if (inc !== e) aux[i] = {name: inc.name, price: inc.price}
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
            if (i.price < 1) {
                setErrorPrice(true);
                flagP = true;
            }
            acuTotalHs += +(Math.round(i.hs*i.price+ "e+2")  + "e-2");
        });
        
        acuSubtotal += acuTotalHs;

        othersPlus?.forEach(i => {
            if (i.price < 1) {
                setErrorPrice(true);
                flagP = true;
            }
            if (i.name.length < 1) {
                setErrorName(true);
                flagN = true;
            }
            acuSubtotal += +(Math.round(i.price+ "e+2")  + "e-2");
        });
        
        acuTotal += acuSubtotal;

        othersMinus?.forEach(i => {
            if (i.price < 1) {
                setErrorPrice(true);
                flagP = true;
            }
            if (i.name.length < 1) {
                setErrorName(true);
                flagN = true;
            }
            acuTotal -= +(Math.round(i.price+ "e+2")  + "e-2");
        });

        setTotalHs(acuTotalHs ? acuTotalHs : 0);
        setSubtotal(acuSubtotal ? acuSubtotal : 0);
        setTotal(acuTotal ? acuTotal : 0);
        setErrorName(flagN);
        setErrorPrice(flagP);
    }, [total, subtotal, totalHs, main, othersMinus, othersPlus]);

    return(
    <>
        <Breadcrumb parentName="Salarios" icon={faUserFriends} parentLink="salary" currentName={`${props.action} salario`}/>
        <div style={{display: 'none'}}>{document.title = `${props.action} salario` }</div>
            <div className="viewTitleBtn">
            <h1>{props.action} salario: {props.action!=="Registrar"?props.salary?.id_license + ' - ' + props.salary?.name + ' ' + props.salary?.last_name:''}</h1>
        </div>
        <div className="container" >
            <BeShowed show={showSpinner}>
                <br/>
                <LoaderSpinner color="secondary" loading="Cargando..."/>
            </BeShowed>
            <BeShowed show={!showSpinner}>
                <div className="formRow justify-content-center">
                    <div className="col-sm-6" >
                        <label>Fecha: </label>
                        <input ref={nroRef} value={dateText(props.month+'-01', false, true)} style={{fontWeight: 'bold', marginLeft: '1em', border: '0px'}} readOnly></input> 
                    </div>
                    <div className="col-sm-6" style={{fontWeight: 'bold', textAlign: 'right'}} >
                    <BeShowed show={props.action === 'Registrar'} >
                            <label >{nro + 1}/{employees.length}</label>
                    </BeShowed>
                    </div>
                </div>
                <ShowSelectedEmployee selectedEmployee={employee}/>
                <div className="formRow justify-content-center">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-2" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Horas</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Precio X Hs.</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Subtotal</label>
                    </div>
                </div>

                {main?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-4" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>{i.name}</label>
                            </div>
                            <div className="col-sm-2" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>{floatToHour(i.hs, true)}</label>
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input className={i.price < 1 ? "form-control is-invalid" : "form-control"} id={'price'+i.id} type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e, 0)} min='1' max='999999' value={i.price} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>${(i.hs*i.price) ? +(Math.round(i.hs*i.price+ "e+2")  + "e-2") : 0}</label>
                            </div>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>Total horas trabajadas</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>${totalHs}</label>
                    </div>
                </div>
                <br/>
                {othersPlus?.map((i, n) => {
                    return(
                        <div className="formRow justify-content-center">
                            <BeShowed show={(props.salary.month ? props.salary.month.slice(5, -3) === '06' || props.salary.month.slice(5, -3) === '12' : false) && n === 0}>
                                <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                                    <label style={{paddingLeft: '1em', fontStyle: 'italic'}}>{i.name}</label>
                                </div>
                                <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px', textAlign: 'center', fontWeight: 'bold'}}>
                                    <label style={{paddingLeft: '1em', fontStyle: 'italic'}}>{i.price}</label>
                                </div>
                            </BeShowed>
                            <BeShowed show={(props.salary.month ? props.salary.month.slice(5, -3) !== '06' && props.salary.month.slice(5, -3) !== '12' : false) || n !== 0}>
                                <div className="col-sm-1">
                                    <button style={{marginRight: '0em'}} type="button" className="sendDelete" onClick={() => deleteOtherPlus(i)} style={{marginLeft: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /></button>
                                </div>
                                <div className="col-sm-8" style={{border: '1px solid', borderRadius: '2px'}}>
                                    <input className={(i.name.length < 1 ? "form-control is-invalid" : "form-control") + " nameOtherPlus"+n} type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e, 1)} />
                                </div>
                                <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                    <input className={(i.price < 1 ? "form-control is-invalid" : "form-control") + " priceOtherPlus"+n} type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                    onChange={(e) => addPrice(i, e, 1)} min='0' max='999999' />
                                </div>
                            </BeShowed>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center" style={{border: '1px solid', borderRadius: '2px'}}>
                    <button id='addOtherPlusButton' type="button" className="sendAdd" onClick={addOtherPlus} style={{width: '11em', marginRight: '0.2em'}} ><FontAwesomeIcon icon={faPlus} /> Adicional</button>
                </div>
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px', text: 'bold'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>Subtotal</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px', text: 'bold'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>${subtotal}</label>
                    </div>
                </div>
                <br/>
                {othersMinus?.map((i, n) => {
                    return(
                        <div className="formRow justify-content-center">
                            <BeShowed show={advances.length > 0 && n === 0}>
                                <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                                    <label style={{paddingLeft: '1em', fontStyle: 'italic'}}>{i.name}</label>
                                </div>
                                <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px', textAlign: 'center', fontWeight: 'bold'}}>
                                    <label style={{paddingLeft: '1em', fontStyle: 'italic'}}>{i.price}</label>
                                </div>
                            </BeShowed>
                            <BeShowed show={advances.length === 0 || n !== 0}>
                                <div className="col-sm-1" >
                                    <button style={{marginRight: '0em'}} type="button" className={"sendDelete deleteOtherMinusButton"+n} onClick={() => deleteOtherMinus(i)} style={{marginLeft: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /></button>
                                </div>
                                <div className="col-sm-8" style={{border: '1px solid', borderRadius: '2px'}}>
                                    <input className={(i.name.length < 1 ? "form-control is-invalid" : "form-control") + " nameOtherMinus"+n} type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e, 2)} />
                                </div>
                                <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                    <input className={(i.price < 1 ? "form-control is-invalid" : "form-control") + " priceOtherMinus"+n} type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                    onChange={(e) => addPrice(i, e, 2)} min='0' max='999999' />
                                </div>
                            </BeShowed>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center" style={{border: '1px solid', borderRadius: '2px'}}>
                    <button id='addOtherMinusButton' type="button" className="sendAdd" onClick={addOtherMinus} style={{width: '11em', marginRight: '0.2em'}} ><FontAwesomeIcon icon={faPlus} /> Descuento</button>
                </div>
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>Total a cobrar</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>${total}</label>
                    </div>
                </div>
                <BeShowed show={props.action === 'Registrar'}>   
                    <Buttons ready={(!errorName && !errorPrice)}
                        label='Confirmar' labelCancel='Saltar' actionNotOK={actionNotOK} actionOK={registerSalary} actionCancel={() => {jump()}}/>
                </BeShowed>
                <BeShowed show={props.action === 'Editar'}>   
                    <Buttons ready={(!errorName && !errorPrice)}
                        label='Registrar' labelCancel='Cancelar' actionNotOK={actionNotOK} actionOK={editSalary} actionCancel={() => {comeBack(false)}}/>
                </BeShowed>
                <BeShowed show={props.action === 'Ver'}> 
                    <button className="sendOk offset-sm-11" onClick={() => {comeBack(false)}}>Volver</button>
                </BeShowed>
            </BeShowed>
        </div>        
    </>
    )
}

export default FormSalary;