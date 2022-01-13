import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import Buttons from '../../../common/Buttons';
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import { dateBDToString } from "../../../utils/ConverterDate/dateBDToString";
import ShowSelectedEmployee from "./ShowSelectedEmployee";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formattedDate from "../../../utils/formattedDate";
import dateToString from "../../../utils/ConverterDate/dateToString";
import useHTTPGet from '../../../hooks/useHTTPGet';

const PORT = require('../../../config');

const FormSalary = (props) => {

    const [showSpinner,setShowSpinner] = useState(true);
    const [employees,setEmployees] = useState([]);
    const [employee,setEmployee] = useState(null);
    const [employeesView,setEmployeesView] = useState([]);
    const [employeesStart,setEmployeesStart] = useState(null);
    const [errorDate,setErrorDate] = useState(true);
    const [errorRelationship,setErrorRelationship] = useState(true);
    const [errorName,setErrorName] = useState(true);
    const [errorPrice,setErrorPrice] = useState(true);
    const [searchState,setSearchState] = useState('');
    
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

    const [date, setDate] = useState("null");
    const [month, setMonth] = useState(props.salary.month);
    const startDate = formattedDate(new Date(), -2);
    let startMonth = formattedDate(new Date(),2);
    const [maxMonth, setMaxMonth] = useState(formattedDate(new Date(), 6));
    const inputMonth = useRef(null);
    const [isValidMonth, setIsValidMonth] = useState("form-control");

    const relationships = useHTTPGet(PORT() + '/api/relationships');
    const [selectValue, setSelectValue] = useState("-1");

    useEffect(() => {
        if(props.action !== "Registrar"){
            Axios.get(`${PORT()}/api/employees/${props.license.dni}`)
            .then((response) => {
                setEmployee(response.data[0]);
                setShowSpinner(false);
            })
            if(props.action === 'Ver'){
            }
            else{
                employeesUpload();
                setErrorDate(false);
                setErrorRelationship(false);
                setErrorName(false);
                setErrorPrice(false);
            }
        }
        else{
            employeesUpload();
            employeesViewUpload();
        }
    },[props.action])

    useEffect(() => {
        employeesViewUpload();
    },[employeesStart])

    const employeesUpload = () => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                setEmployees(response.data);
                setEmployeesView(response.data.slice(0,6));
                setEmployeesStart(0);
                setShowSpinner(false);
            })
            .catch((error) => {console.log(error);});
    };

    const employeesViewUpload = () => {
        let aux = employees.slice(employeesStart,employeesStart+6);
        setEmployeesView(aux);
    }
    
    const registerLicense = () => {
        loadingMessage("Registrando la licencia")
        /*Axios.post(`${PORT()}/api/licenses`, {"date_init": dateInit.current.value,"date_finish": dateFinish.current.value,
                "dni_employee": employee.dni,"reason": reason.current.value, "active": 1})
        .then((response) => {
            if (response.data.Ok) resetStates(true)
            else warningMessage("Error", `${response.data.Message}`, "error")
        })
        .catch((error) => console.error(error))   
        */
    }

    const editLicense = () => {
        loadingMessage("Editando licencia")
        /*
        Axios.put(`${PORT()}/api/licenses/${props.license.id_license}`, {"date_init": dateInit.current.value,
            "date_finish": dateFinish.current.value,"dni_employee": employee.dni,"reason": reason.current.value})
        .then((response) => {
            if (response.data.Ok) comeBack(true)
            else warningMessage("Error", `${response.data.Message}`, "error")
        })
        .catch((error) => console.error(error))
        */
    }
    
    const resetStates = (showMsg) => {
        if(showMsg){
            warningMessage('Atención','Se ha registrado la licencia correctamente','success');
            props.setReloadList(!props.reloadList);
        }
        setSearchState('');
    }

    const comeBack = (msg) => {
        if(msg){
            warningMessage('Atención','Se ha editado la licencia correctamente','success');
            props.setReloadList(!props.reloadList);
        }
        props.setActionLicense('Listar',null);
    }

    const actionNotOK = () =>{
        if(errorRelationship){
            warningMessage('Atención','Se debe cargar el tipo de relación laboral de los empleados a los cuales se les generara el salario','warning');
        }
        else if(errorDate){
            warningMessage('Atención','Se debe cargar el mes para el cuál se desea generar los salarios','warning');
        }
        else if(errorName){
            warningMessage('Atención','Se debe ingresar un nombre a totdos los adicionales y descuentos','warning');
        }
        else if(errorPrice){
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
            main.map((hs, i) => {
                if (hs === j) aux[i] = {id: hs.id, name: hs.name, hs: hs.hs, price: parseInt(e.target.value)};
                else aux[i] = {id: hs.id, name: hs.name, hs: hs.hs, price: hs.price};
            });
            setMain(aux);

        } else if (t === 1) {
            const aux = [];
            othersPlus.map((inc, i) => {
                if (inc === j) aux[i] = {name: inc.name, price: parseInt(e.target.value)};
                else aux[i] = {name: inc.name, price: inc.price};
            });
            setOthersPlus(aux);
        } else {
            const aux = [];
            othersMinus.map((disc, i) => {
                if (disc === j) aux[i] = {name: disc.name, price: parseInt(e.target.value)};
                else aux[i] = {name: disc.name, price: disc.price};
            });
            setOthersMinus(aux);
        }
    }

    const addName = (j, e, t) => {
        if (t === 1) {
            const aux = [];
            othersPlus.map((inc, i) => {
                if (inc === j) aux[i] = {name: e.target.value, price: inc.price};
                else aux[i] = {name: inc.name, price: inc.price};
            });
            setOthersPlus(aux);
        } else {
            const aux = [];
            othersMinus.map((disc, i) => {
                if (disc === j) aux[i] = {name: e.target.value, price: disc.price};
                else aux[i] = {name: disc.name, price: disc.price};
            });
            setOthersMinus(aux);
        }
    }

    const addOtherPlus = () => {
        const aux = [];
        othersPlus.map((inc, i) => {aux[i] = inc});
        aux.push({name: '', price: 0});
        setOthersPlus(aux);
    }

    const addOtherMinus = () => {
        const aux = [];
        othersMinus.map((disc, i) => {aux[i] = disc});
        aux.push({name: '', price: 0});
        setOthersMinus(aux);
    }

    const deleteOtherMinus = (e) => {
        const aux = [];
        othersMinus.map((disc, i) => {
            if (disc !== e) aux[i] = {name: disc.name, price: disc.price}
        });
        setOthersMinus(aux);
    }

    const deleteOtherPlus = (e) => {
        const aux = [];
        othersPlus.map((inc, i) => {
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
            acuTotalHs += i.hs * i.price +1;
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
            acuSubtotal += i.price;
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
            acuTotal -= i.price;
        });

        setTotalHs(acuTotalHs);
        setSubtotal(acuSubtotal);
        setTotal(acuTotal);
        setErrorName(flagN);
        setErrorPrice(flagP);
    }, [total, subtotal, totalHs, main, othersMinus, othersPlus]);

    const onChangeMonth = () => {
        if (inputMonth) {
            setMonth(inputMonth.current.value);
            setErrorDate(false);
        }
    }

    useEffect(() => {
        if (props.action === 'Registrar' && inputMonth.current && !inputMonth.current.value) {
            inputMonth.current.value = startMonth.slice(0,-3);
            setMonth(inputMonth.current.value + '-01');
            props.salary.month = inputMonth.current.value + '-01';
        }
        else if (inputMonth.current && !inputMonth.current.value && props.action !== 'Registrar') {
            inputMonth.current.value = props.salary.month.slice(0,-3);
            setMonth(inputMonth.current.value + '-01');
        }
        else if (inputMonth.current) {

            let aux = props.salary.month;
            if (aux.length !== 10) aux = props.salary.month;
            if (!inputMonth.current.value) inputMonth.current.value = aux.slice(0,-3);
            let min = inputMonth.current.min + '-10';
            let max = inputMonth.current.max + '-10';

            if (parseInt(aux.slice(0, -5)) === parseInt(min.slice(0, -5))) {
                if (parseInt(aux.slice(5, -3)) >= parseInt(min.slice(5, -3))) {
                    if (props.salary.month !== inputMonth.current.value){
                        setIsValidMonth("form-control is-valid");
                        props.salary.month = inputMonth.current.value + '-01';
                        setMonth(inputMonth.current.value + '-01');
                    }
                }
            } else if (parseInt(aux.slice(0, -5)) > parseInt(min.slice(0, -5)) && parseInt(aux.slice(5, -3)) <= parseInt(max.slice(5, -3))) {
                if (props.salary.month !== inputMonth.current.value && month){
                    setIsValidMonth("form-control is-valid");
                    props.salary.month = inputMonth.current.value + '-01';
                    setMonth(inputMonth.current.value + '-01');
                }
            }/*
            else {
                if (!load) {
                    inputMonth.current.value = aux;
                    //isLoad(true);
                }
            }*/
        }
    }, [startMonth, month, props]);

    const handleRelationship = (e) => {
        if (e.target.value > 0) {
            setSelectValue(e.target.value);
            setErrorRelationship(false);
        } else setErrorRelationship(true);
    }

    return(
    <>
        <Breadcrumb parentName="Salarios" icon={faUserFriends} parentLink="salary" currentName={`${props.action} salario`}/>
        <div style={{display: 'none'}}>{document.title = `${props.action} salario` }</div>
            <div className="viewTitleBtn">
            <h1>{props.action} salario: {props.action!=="Registrar"?props.salary?.id_license + ' - ' + props.salary?.name + ' ' + props.salary?.last_name:''}</h1>
        </div>
        <div className="container" >

            <BeShowed show={!showSpinner && props.action === 'Registrar'}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="firstMonth" >Tipo de Empleado*</label>
                    </div>
                    <div className="form-control-input">
                        <select className="form-control" id="selectRelationship"
                            value={selectValue}
                            onChange={handleRelationship}>
                            <option disabled value="-1">Seleccione tipo de realción laboral...</option>
                            {relationships?.map((r, i) => {
                                if (r.id_employee_relationship === 1) return (<option key={i} value={r.id_employee_relationship}>{r.name}</option>);
                                else return (<option disabled key={i} value={r.id_employee_relationship}>{r.name}</option>);
                            })}
                        </select>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="firstMonth" >Mes a generar*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidMonth} id="month" type="month" ref={inputMonth} onChange={onChangeMonth} min={date !== "null" ? date.slice(0,-3) : startDate.slice(0,-3)}
                        max={maxMonth.slice(0,-3)} defaultValue={dateToString(month, true).slice(0,-3).length === 10 ? dateToString(month, true).slice(0,-3).length : null} />
                    </div>
                </div>
            </BeShowed>
            <br/>

            <BeShowed show={showSpinner}>
                <LoaderSpinner color="secondary" loading="Cargando..."/>
            </BeShowed>
            <BeShowed show={!showSpinner && props.action !== 'Registrar'}>
                <div className="form-control-label">
                    <label htmlFor="firstMonth" >Mes a generar*</label>
                </div>
                <div className="form-control-label">
                    <input ref={inputMonth} defaultValue={dateToString(month, true).slice(0,-3).length === 10 ? dateToString(month, true).slice(0,-3).length : null} />
                </div>
                <ShowSelectedEmployee selectedEmployee={employee}/>
            </BeShowed>
            <BeShowed show={!showSpinner}>
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
                                <label style={{paddingLeft: '1em'}}>{i.hs}</label>
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input id={'price'+i.id} type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e, 0)} min='0' max='999999' />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>${i.hs*i.price}</label>
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
                <BeShowed show={(month ? month.slice(5, -3) === '01' || month.slice(5, -3) === '12' : false) && props.action === 'Registrar'}>
                    <div className="formRow justify-content-center">
                        <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontStyle: 'italic'}}>Aguinaldo</label>
                        </div>
                        <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px', textAlign: 'center', fontWeight: 'bold'}}>
                            -----
                        </div>
                    </div>
                </BeShowed>
                {othersPlus?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-1">
                                <button id='deleteOtherPlusButton' style={{marginRight: '0em'}} type="button" className="sendDelete" onClick={() => deleteOtherPlus(i)} style={{marginLeft: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /></button>
                            </div>
                            <div className="col-sm-8" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e, 1)} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e, 1)} min='0' max='999999' />
                            </div>
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
                {othersMinus?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-1" >
                                <button id='deleteOtherMinusButton' style={{marginRight: '0em'}} type="button" className="sendDelete" onClick={() => deleteOtherMinus(i)} style={{marginLeft: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /></button>
                            </div>
                            <div className="col-sm-8" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e, 2)} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e, 2)} min='0' max='999999' />
                            </div>
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
            </BeShowed>
            <BeShowed show={props.action === 'Registrar'}>   
                <Buttons ready={(!errorDate && !errorRelationship && !errorName && !errorPrice)}
                    label='Registrar' actionNotOK={actionNotOK} actionOK={registerLicense} actionCancel={() => {resetStates(false)}}/>
            </BeShowed>
            <BeShowed show={props.action === 'Editar'}>   
                <Buttons ready={(!errorDate && !errorRelationship && !errorName && !errorPrice)}
                    label='Confirmar' actionNotOK={actionNotOK} actionOK={editLicense} actionCancel={() => {comeBack(false)}}/>
            </BeShowed>
            <BeShowed show={props.action === 'Ver'}> 
                <button className="sendOk offset-sm-11" onClick={() => {comeBack(false)}}>Volver</button>
            </BeShowed>
        </div>        
    </>
    )
}

export default FormSalary;