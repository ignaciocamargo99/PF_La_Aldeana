import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import CardEmployees from './CardEmployees';
import Buttons from '../../../common/Buttons';
import formatedDate from '../../../utils/ConverterDate/formattedDate';
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import { calculateDiferenceDays } from "../../../utils/DiferenceDate/calculateDiferenceDays";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import loadingMessage from '../../../utils/LoadingMessages/LoadingMessage';
import DynamicSearch from '../../../common/DynamicSearch';

const PORT = require('../../../config');

const FormLicense = (props) => {

    const [showSpinner,setShowSpinner] = useState(true);
    const [employees,setEmployees] = useState([]);
    const [employee,setEmployee] = useState(null);
    const [employeesView,setEmployeesView] = useState([]);
    const [employeesStart,setEmployeesStart] = useState(null);
    const [days,setDays] = useState(0);
    const [errorDateInit,setErrorDateInit] = useState(true);
    const [errorDateFinish,setErrorDateFinish] = useState(true);
    const [errorEmployee,setErrorEmployee] = useState(true);
    const [errorReason,setErrorReason] = useState(true);
    const [searchState,setSearchState] = useState('');

    const dateInit = useRef();
    const dateFinish = useRef();
    const reason = useRef();

    useEffect(() => {
        if(props.action !== "Registrar"){
            dateInit.current.value = props.license.date_init.slice(0,10);
            dateFinish.current.value = props.license.date_finish.slice(0,10);
            setEmployee({dni:props.license.dni,name:props.license.name,last_name:props.license.last_name});
            reason.current.value = props.license.reason;
            onChangeDates();
            if(props.action === 'Ver'){
                dateInit.current.disabled = true;
                dateFinish.current.disabled = true;
                reason.current.disabled = true;
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
            dateMinsUpload();
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

    const dateMinsUpload = () => {
        let date = formatedDate(new Date());
        dateInit.current.min = date;
        dateFinish.current.min = date;
    }

    const employeesViewUpload = () => {
        let aux = employees.slice(employeesStart,employeesStart+6);
        setEmployeesView(aux);
    }

    const onChangeReason = () => {
        if(reason.current.value.trim() !== ""){
            setErrorReason(false);
        }
        else{
            setErrorReason(true);
        }
    }

    const onChangeEmployee = (employee) => {
        setErrorEmployee(false);
        setEmployee(employee);
    }

    const onChangeDateInit = (e) => {
        setErrorDateInit(false);
        dateFinish.current.min = e.target.value;
        if(dateFinish.current.value !== ""){
            onChangeDates();
        }
    }

    const onChangeDateFinish = () => {
        setErrorDateFinish(false);
        if(dateInit.current.value !== ""){
            onChangeDates();
        }
    }

    const onChangeDates = () => {
        let aux = calculateDiferenceDays(dateInit.current.value,dateFinish.current.value);
        aux ++;
        if(aux <= 0){
            dateFinish.current.value = dateInit.current.value;
            aux = 1;
        }
        setDays(aux);
    }
    
    const registerLicense = () => {
        loadingMessage("Registrando la licencia")
        Axios.post(`${PORT()}/api/licenses`, {"date_init": dateInit.current.value,"date_finish": dateFinish.current.value,
                                            "dni_employee": employee.dni,"reason": reason.current.value, "active": 1})
        .then((response) => {
            if (response.data.Ok) resetStates(true)
            else warningMessage("Error", `${response.data.Message}`, "error")
        })
        .catch((error) => console.error(error))   
    }

    const editLicense = () => {
        loadingMessage("Editando licencia")
        Axios.put(`${PORT()}/api/licenses/${props.license.id_license}`, {"date_init": dateInit.current.value,
            "date_finish": dateFinish.current.value,"dni_employee": employee.dni,"reason": reason.current.value})
        .then((response) => {
            if (response.data.Ok) comeBack(true)
            else warningMessage("Error", `${response.data.Message}`, "error")
        })
        .catch((error) => console.error(error))
    }
    
    const resetStates = (showMsg) => {
        if(showMsg){
            warningMessage('Correcto','Se ha registrado la licencia correctamente','success');
            props.setReloadList(!props.reloadList);
        }
        setEmployee(null);
        setDays(0);
        setErrorDateInit(true);
        setErrorDateFinish(true);
        setErrorEmployee(true);
        setErrorReason(true);
        dateInit.current.value = "";
        dateFinish.current.value = "";
        reason.current.value = "";
    }

    const comeBack = (msg) => {
        if(msg){
            warningMessage('Correcto','Se ha editado la licencia correctamente','success');
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

    return(
    <>
        <div style={{display: 'none'}}>{document.title = `${props.action} Licencia` }</div>
            <div className="viewTitleBtn">
            <h1>{props.action} licencia {props.action!=="Registrar"?props.license?.id_license:''}</h1>
        </div>
        <div className="container">
            <br/>
            <Breadcrumb parentName="Licencias" icon={faUserFriends} parentLink="licenses" currentName={`${props.action} licencia`}/>
            <div className="formRow">
                <div className="col-sm-2" style={{paddingTop: "0.375rem"}}>
                    <label >Fecha de inicio* </label>
                </div>
                <div style={{width: "175px"}}>
                    <input type="date" className="form-control" ref={dateInit} onChange={(e) => {onChangeDateInit(e)}}></input>
                </div>
                <div className="col-sm-2 offset-1" style={{paddingTop: "0.375rem"}}>
                    <label>Fecha de fin* </label>
                </div>
                <div style={{width: "175px"}}>
                    <input type="date" className="form-control" ref={dateFinish} onChange={onChangeDateFinish}></input>
                </div>
            </div>
            <div className="formRow">
                <label>Cantidad de días de licencia: {days}</label>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Empleado*</label>
                </div>
            </div>
            <div className="formRow">
                <DynamicSearch placeholder={'Buscar empleados por nombre...'} setSearchState={setSearchState}/>
            </div>
            <BeShowed show={showSpinner && props.action !== 'Ver'}>
                <LoaderSpinner color="secondary" loading="Cargando..."/>
            </BeShowed>
            <BeShowed show={!showSpinner && props.action !== 'Ver'}>
                <div className="formRow justify-content-center">
                    <CardEmployees employeesView={employeesView} employee={employee} 
                                    onChangeEmployee={onChangeEmployee} setEmployeesStart={setEmployeesStart}
                                    employees={employees} employeesStart={employeesStart} searchState={searchState}/>
                </div>
            </BeShowed>
            <BeShowed show={props.action === "Ver"}>
                <div className="formRow offset-sm-1">
                    <button style={{width:"200px", height:"200px", margin:"5px",backgroundColor:'gray'}}>
                        <div className="formRow justify-content-center">
                            <label><b>DNI: {props.license?.dni}</b></label>
                        </div>
                        <div className="formRow justify-content-center">
                            <label><b>Apellido: {props.license?.last_name}</b></label>
                        </div>
                        <div className="formRow justify-content-center">
                            <label><b>Nombre: {props.license?.name}</b></label>
                        </div>
                    </button>
                </div>
            </BeShowed>
            <div className="formRow">
                <div className="col-sm-2">
                    <label>Motivo de licencia*</label>
                </div>
                <textarea className="form-control" rows="2" ref={reason} maxLength="200" onChange={onChangeReason}></textarea>    
            </div>
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

export default FormLicense