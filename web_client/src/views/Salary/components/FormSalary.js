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
import validateFloatNumbers from "../../../utils/validateFloatNumbers";import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PORT = require('../../../config');

const FormSalary = (props) => {

    const [showSpinner,setShowSpinner] = useState(true);
    const [employees,setEmployees] = useState([]);
    const [employee,setEmployee] = useState(null);
    const [employeesView,setEmployeesView] = useState([]);
    const [employeesStart,setEmployeesStart] = useState(null);
    const [licensedEmployees,setLicensedEmployees] = useState([]);
    const [days,setDays] = useState(0);
    const [errorDateInit,setErrorDateInit] = useState(true);
    const [errorDateFinish,setErrorDateFinish] = useState(true);
    const [errorEmployee,setErrorEmployee] = useState(true);
    const [errorReason,setErrorReason] = useState(true);
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
                setErrorDateInit(false);
                setErrorDateFinish(false);
                setErrorEmployee(false);
                setErrorReason(false);
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

    const findLicensedEmployees = (licenses, dateInit,dateFinish) => {
        let employees = []
        let dateInitNumber = new Date(dateBDToString(dateInit,'En')).getTime();
        let dateFinishNumber = new Date(dateBDToString(dateFinish,'En')).getTime();
        licenses.forEach((license) => {
            let licenseDateInitNumber = new Date(dateBDToString(license.date_init,'En')).getTime();
            let licenseDateFinishNumber = new Date(dateBDToString(license.date_finish,'En')).getTime();
            if((dateInitNumber <= licenseDateInitNumber && licenseDateInitNumber <= dateFinishNumber) || 
                (dateInitNumber <= licenseDateFinishNumber &&  licenseDateFinishNumber <= dateFinishNumber) ||
                (licenseDateInitNumber < dateInitNumber && licenseDateFinishNumber > dateFinishNumber)){
                    employees.push(license.dni)
            }
        })
        return employees;
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
        setEmployee(null);
        setDays(0);
        setLicensedEmployees([]);
        setErrorDateInit(true);
        setErrorDateFinish(true);
        setErrorEmployee(true);
        setErrorReason(true);
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
        if(errorDateInit){
            warningMessage('Atención','Se debe cargar una fecha de inicio','warning');
        }
        else if(errorDateFinish){
            warningMessage('Atención','Se debe cargar una fecha de finalización','warning');
        }
        else if(errorEmployee){
            warningMessage('Atención','Se debe seleccionar un empleado','warning');
        }
        else if(errorReason){
            warningMessage('Atención','Se debe cargar un motivo de la licencia','warning');
        }
    }

    const validate = (e) => {
        if (e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
    }

    const addPrice = (i, e) => {
        i.price = parseInt(e.target.value);
        console.log(i, e.target.value)
    }

    const addName = (i, e) => {
        i.name = e.target.value;
    }

    const addOtherPlus = () => {
        const aux = othersPlus;
        aux.push({name: '', price: 0});
        setOthersPlus(aux);
    }

    const addOtherMinus = () => {
        const aux = othersMinus;
        othersMinus.push({name: '', price: 0});
        setOthersMinus(aux);
    }

    const deleteOtherMinus = () => {
        const aux = othersMinus;
        othersMinus.pop();
        setOthersMinus(aux);
        console.log(aux, othersMinus);
    }

    const deleteOtherPlus = () => {
        const aux = othersPlus;
        othersPlus.pop();
        setOthersPlus(aux);
    }

    useEffect(() => {
        let acuTotalHs = 0;
        let acuSubtotal = 0;
        let acuTotal = 0;

        main?.forEach(i => {
            acuTotalHs += i.hs * i.price +1;
        });
        
        acuSubtotal += acuTotalHs;

        othersPlus?.forEach(i => {
            acuSubtotal += i.price;
        });
        
        acuTotal += acuSubtotal;

        othersMinus?.forEach(i => {
            acuTotal -= i.price;
        });

        setTotalHs(acuTotalHs);
        setSubtotal(acuSubtotal);
        setTotal(acuTotal);
    }, [total, subtotal, totalHs, main, othersMinus, othersPlus]);

    return(
    <>
        <Breadcrumb parentName="Salarios" icon={faUserFriends} parentLink="salary" currentName={`${props.action} salario`}/>
        <div style={{display: 'none'}}>{document.title = `${props.action} salario` }</div>
            <div className="viewTitleBtn">
            <h1>{props.action} salario: {props.action!=="Registrar"?props.salary?.id_license + ' - ' + props.salary?.name + ' ' + props.salary?.last_name:''}</h1>
        </div>
        <div className="container" >
            <br/>

            <BeShowed show={showSpinner}>
                <LoaderSpinner color="secondary" loading="Cargando..."/>
            </BeShowed>
            <BeShowed show={!showSpinner && props.action !== 'Registrar'}>
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
                                onChange={(e) => addPrice(i, e)} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>${i.hs*i.price}</label>
                            </div>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Total horas trabajadas</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>${totalHs}</label>
                    </div>
                </div>
                <br/>
                {othersPlus?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e)} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e)} />
                            </div>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center" style={{border: '1px solid', borderRadius: '2px'}}>
                    <button id='addOtherPlusButton' type="button" className="sendAdd" onClick={addOtherPlus} style={{width: '11em', marginTop: '0.2em'}} ><FontAwesomeIcon icon={faPlus} /> Adicional</button>
                    <button id='deleteOtherPlusButton' type="button" className="sendDelete" onClick={deleteOtherPlus} style={{width: '11em', marginTop: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /> Adicional</button>
                </div>
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Subtotal</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>${subtotal}</label>
                    </div>
                </div>
                <br/>
                {othersMinus?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e)} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e)} />
                            </div>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center" style={{border: '1px solid', borderRadius: '2px'}}>
                    <button id='addOtherMinusButton' type="button" className="sendAdd" onClick={addOtherMinus} style={{width: '11em', marginTop: '0.2em'}} ><FontAwesomeIcon icon={faPlus} /> Descuento</button>
                    <button id='deleteOtherMinusButton' type="button" className="sendDelete" onClick={deleteOtherMinus} style={{width: '11em', marginTop: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /> Descuento</button>
                </div>
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Total a cobrar</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>${total}</label>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={props.action === 'Registrar'}>   
                <Buttons ready={(!errorDateInit && !errorDateFinish && !errorEmployee && !errorReason)}
                    label='Registrar' actionNotOK={actionNotOK} actionOK={registerLicense} actionCancel={() => {resetStates(false)}}/>
            </BeShowed>
            <BeShowed show={props.action === 'Editar'}>   
                <Buttons ready={(!errorDateInit && !errorDateFinish && !errorEmployee && !errorReason)}
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