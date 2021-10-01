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

const PORT = require('../../../config');

const RegisterLicense = (props) => {

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

    const dateInit = useRef();
    const dateFinish = useRef();
    const reason = useRef();

    useEffect(() => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                setEmployees(response.data);
                setEmployeesView(response.data.slice(0,6));
                setEmployeesStart(0);
                setShowSpinner(false)
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        let date = formatedDate(new Date());
        dateInit.current.min = date;
        dateFinish.current.min = date;
    },[])

    useEffect(() => {
        let aux = employees.slice(employeesStart,employeesStart+6);
        setEmployeesView(aux);
    }, [employeesStart])

    const onChangeReason = () => {
        if(reason.current.value.trim() !== ""){
            setErrorReason(false)
        }
        else{
            setErrorReason(true)
        }
    }

    const onChangeEmployee = (employee) => {
        setErrorEmployee(false)
        setEmployee(employee)
    }

    const onChangeDateInit = (e) => {
        setErrorDateInit(false)
        dateFinish.current.min = e.target.value;
        if(dateFinish.current.value !== ""){
            onChangeDates();
        }
    }

    const onChangeDateFinish = () => {
        setErrorDateFinish(false)
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

    const resetStates = (showMsg) => {
        if(showMsg){
            warningMessage('Correcto','Se ha registrado la licencia correctamente','success');
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
    
    const registerLicense = () => {
        loadingMessage("Registrando la licencia")
        Axios.post(`${PORT()}/api/licenses`, {"date_init": dateInit.current.value,"date_finish": dateFinish.current.value,
                                            "dni_employee": employee.dni,"reason": reason.current.value, "active": 1})
        .then((respone) => {
            if (respone.data.Ok) {resetStates(true)}
            else warningMessage("Error", `${respone.data.Message}`, "error")
        })
        .catch((error) => console.error(error))
        
    }

    return(
    <>
        <div style={{display: 'none'}}>{document.title = "Registrar Licencia"}</div>
            <div className="viewTitleBtn">
            <h1>Registrar licencia</h1>
        </div>
        <div className="container">
            <br/>
            <Breadcrumb parentName="Licencias" icon={faUserFriends} parentLink="licenses" currentName="Registrar licencia" />
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
            <BeShowed show={showSpinner}>
                <LoaderSpinner color="secondary" loading="Cargando..."/>
            </BeShowed>
            <BeShowed show={!showSpinner}>
                <div className="formRow justify-content-center">
                    <CardEmployees employeesView={employeesView} employee={employee} 
                                    onChangeEmployee={onChangeEmployee} setEmployeesStart={setEmployeesStart}
                                    employees={employees} employeesStart={employeesStart}/>
                </div>
                <div className="formRow">
                    <div className="col-sm-2">
                        <label>Motivo de licencia*</label>
                    </div>
                    <textarea className="form-control" rows="2" ref={reason} maxLength="200" onChange={onChangeReason}></textarea>    
                </div>
            </BeShowed>
            <Buttons ready={(!errorDateInit && !errorDateFinish && !errorEmployee && !errorReason)}
                label='Registrar' actionNotOK={actionNotOK} actionOK={registerLicense} actionCancel={() => {resetStates(false)}}/>
        </div>        
    </>
    )
}

export default RegisterLicense