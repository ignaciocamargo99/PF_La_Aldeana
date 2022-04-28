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
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import DynamicSearch from '../../../common/DynamicSearch';
import { dateBDToString } from "../../../utils/ConverterDate/dateBDToString";
import ShowSelectedEmployee from "./ShowSelectedEmployee";
import formattedDate from "../../../utils/ConverterDate/formattedDate";
import formattedDateWithDay from "../../../utils/formattedDate";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PORT = require('../../../config');

const FormLicense = (props) => {

    const [showSpinner, setShowSpinner] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [employeesView, setEmployeesView] = useState([]);
    const [employeesStart, setEmployeesStart] = useState(null);
    const [licensedEmployees, setLicensedEmployees] = useState([]);
    const [days, setDays] = useState(0);
    const [errorDateInit, setErrorDateInit] = useState(true);
    const [errorDateFinish, setErrorDateFinish] = useState(true);
    const [errorEmployee, setErrorEmployee] = useState(true);
    const [errorReason, setErrorReason] = useState(true);
    const [searchState, setSearchState] = useState('');

    const dateInit = useRef();
    const dateFinish = useRef();
    const reason = useRef();

    useEffect(() => {
        if (props.action !== "Registrar") {
            dateInit.current.value = props.license.date_init.slice(0, 10);
            dateFinish.current.value = props.license.date_finish.slice(0, 10);
            Axios.get(`${PORT()}/api/employees/${props.license.dni}`)
                .then((response) => {
                    setEmployee(response.data[0]);
                    setShowSpinner(false);
                })
            reason.current.value = props.license.reason;
            onChangeDates();
            if (props.action === 'Ver') {
                dateInit.current.disabled = true;
                dateFinish.current.disabled = true;
                reason.current.disabled = true;
            }
            else {
                employeesUpload();
                setErrorDateInit(false);
                setErrorDateFinish(false);
                setErrorEmployee(false);
                setErrorReason(false);
                let licenseDateInit = new Date(props.license.date_init);
                let licenseDateFinish = new Date(props.license.date_init);
                let dateFinishLastLicense = '';
                let dateInitFutureLicense = '';
                props.licenses.forEach((license) => {
                    let dateFinish = new Date(dateBDToString(license.date_finish, 'En'))
                    dateFinish.setDate(dateFinish.getDate() + 1)
                    let dateInit = new Date(dateBDToString(license.date_init, 'En'))
                    dateInit.setDate(dateInit.getDate() - 1)
                    if (license.dni === props.license.dni && dateFinish.getTime() <= licenseDateInit.getTime() && (dateFinishLastLicense === '' || dateFinish.getTime() > dateFinishLastLicense.getTime())) {
                        dateFinishLastLicense = dateFinish;
                    }
                    if (license.dni === props.license.dni && dateInit.getTime() >= licenseDateFinish.getTime() && (dateInitFutureLicense === '' || dateInit.getTime() < dateInitFutureLicense.getTime())) {
                        dateInitFutureLicense = dateInit;
                    }
                });
                dateInit.current.min = dateFinishLastLicense !== '' ? formattedDate(dateFinishLastLicense) : formattedDateWithDay(new Date(dateInit.current.value), 0, -15);
                dateInit.current.max = dateInitFutureLicense !== '' ? formattedDate(dateInitFutureLicense) : dateInitFutureLicense;
                dateFinish.current.min = dateFinishLastLicense !== '' ? formattedDate(dateFinishLastLicense) : formattedDateWithDay(new Date(dateInit.current.value), 0, -15);
                dateFinish.current.max = dateInitFutureLicense !== '' ? formattedDate(dateInitFutureLicense) : dateInitFutureLicense;
            }
        }
        else {
            employeesUpload();
            dateMinsUpload();
            employeesViewUpload();
        }
    }, [props.action])

    useEffect(() => {
        employeesViewUpload();
    }, [employeesStart])

    const employeesUpload = () => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                setEmployees(response.data);
                setEmployeesView(response.data.slice(0, 6));
                setEmployeesStart(0);
                setShowSpinner(false);
            })
            .catch((error) => { console.log(error); });
    };

    const dateMinsUpload = () => {
        let date = formatedDate(new Date());
        dateInit.current.min = formattedDateWithDay(new Date(), 0, -5);
        dateFinish.current.min = date;
    }

    const employeesViewUpload = () => {
        let aux = employees.slice(employeesStart, employeesStart + 6);
        setEmployeesView(aux);
    }

    const onChangeReason = () => {
        if (reason.current.value.trim() !== "") {
            setErrorReason(false);
        }
        else {
            setErrorReason(true);
        }
    }

    const onChangeEmployee = (employee) => {
        setErrorEmployee(false);
        setEmployee(employee);
    }

    const onChangeDateInit = (e) => {
        if (dateInit.current.value !== "") {
            setErrorDateInit(false);
            dateFinish.current.min = e.target.value;
            if (dateFinish.current.value !== "") {
                onChangeDates();
            }
        } else {
            setLicensedEmployees([])
            setErrorDateInit(true);
            setDays(0);
        }
    }

    const onChangeDateFinish = (e) => {
        if (dateFinish.current.value !== "") {
            setErrorDateFinish(false);
            dateFinish.current.max = e.target.value;
            if (dateInit.current.value !== "") {
                onChangeDates();
            }
        } else {
            setLicensedEmployees([])
            setErrorDateFinish(true);
            setDays(0);
        }
    }

    const findLicensedEmployees = (licenses, dateInit, dateFinish) => {
        let employees = []
        let dateInitNumber = new Date(dateBDToString(dateInit, 'En')).getTime();
        let dateFinishNumber = new Date(dateBDToString(dateFinish, 'En')).getTime();
        licenses.forEach((license) => {
            let licenseDateInitNumber = new Date(dateBDToString(license.date_init, 'En')).getTime();
            let licenseDateFinishNumber = new Date(dateBDToString(license.date_finish, 'En')).getTime();
            if ((dateInitNumber <= licenseDateInitNumber && licenseDateInitNumber <= dateFinishNumber) ||
                (dateInitNumber <= licenseDateFinishNumber && licenseDateFinishNumber <= dateFinishNumber) ||
                (licenseDateInitNumber < dateInitNumber && licenseDateFinishNumber > dateFinishNumber)) {
                employees.push(license.dni)
            }
        })
        return employees
    }

    const validateSelectedEmployee = (licensedEmployees) => {
        if (licensedEmployees.includes(employee?.dni)) {
            setErrorEmployee(true)
            setEmployee(null)
        }
    }

    const onChangeDates = () => {
        let aux = calculateDiferenceDays(dateInit.current.value, dateFinish.current.value);
        aux++;
        if (aux <= 0) {
            dateFinish.current.value = dateInit.current.value;
            aux = 1;
        }
        setDays(aux);
        if (props.action === "Registrar") {
            let employeesAux = findLicensedEmployees(props.licenses, dateInit.current.value, dateFinish.current.value)
            setLicensedEmployees(employeesAux)
            validateSelectedEmployee(employeesAux)
        }
    }

    const registerLicense = async () => {
        const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Registrar nueva licencia?`)).isConfirmed;
        if (registrationConfirmed) {
            loadingMessage("Registrando nueva licencia")
            Axios.post(`${PORT()}/api/licenses`, {
                "date_init": dateInit.current.value, "date_finish": dateFinish.current.value,
                "dni_employee": employee.dni, "reason": reason.current.value, "active": 1
            })
                .then((response) => {
                    if (response.data.Ok) resetStates(true)
                    else warningMessage("Error", `${response.data.Message}`, "error")
                })
                .catch((error) => console.error(error))
        }
    }

    const editLicense = async () => {
        const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;
        if (editionConfirmed) {
            loadingMessage("Guardando cambios...")
            Axios.put(`${PORT()}/api/licenses/${props.license.id_license}`, {
                "date_init": dateInit.current.value,
                "date_finish": dateFinish.current.value, "dni_employee": employee.dni, "reason": reason.current.value
            })
                .then((response) => {
                    if (response.data.Ok) comeBack(true)
                    else warningMessage("Error", `${response.data.Message}`, "error")
                })
                .catch((error) => console.error(error))
        }
    }

    const resetStates = (showMsg) => {
        if (showMsg) {
            warningMessage('Atención', 'Licencia registrada exitosamente', 'success');
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
        dateInit.current.value = "";
        dateFinish.current.value = "";
        reason.current.value = "";

        props.setActionLicense('Listar', null);
    }

    const comeBack = (msg) => {
        if (msg) {
            warningMessage('Atención', 'Licencia editada exitosamente', 'success');
            props.setReloadList(!props.reloadList);
        }
        props.setActionLicense('Listar', null);
    }

    const actionNotOK = () => {
        if (errorDateInit) {
            warningMessage('Atención', 'Se debe cargar una fecha de inicio', 'warning');
        }
        else if (errorDateFinish) {
            warningMessage('Atención', 'Se debe cargar una fecha de finalización', 'warning');
        }
        else if (errorEmployee) {
            warningMessage('Atención', 'Se debe seleccionar un empleado', 'warning');
        }
        else if (errorReason) {
            warningMessage('Atención', 'Se debe cargar un motivo de la licencia', 'warning');
        }
    }

    return (
        <>
            <Breadcrumb parentName="Licencias" icon={faUserFriends} parentLink="licenses" currentName={`${props.action} licencia`} />
            <div style={{ display: 'none' }}>{document.title = `${props.action} Licencia`}</div>
            <div className="viewTitleBtn">
                <h1>{props.action} licencia: {props.action !== "Registrar" ? props.license?.id_license + ' - ' + props.license?.name + ' ' + props.license?.last_name : ''}</h1>
            </div>
            <div className="container" >
                <br />
                <div className="formRow">
                    <div className="col-sm-2" style={{ paddingTop: "0.375rem" }}>
                        <label >Fecha de inicio* </label>
                    </div>
                    <div style={{ minWidth: "175px" }}>
                        <input type="date" className="form-control" ref={dateInit} onChange={(e) => { onChangeDateInit(e) }}></input>
                    </div>
                    <div className="col-sm-2 offset-1" style={{ paddingTop: "0.375rem" }}>
                        <label>Fecha de fin* </label>
                    </div>
                    <div style={{ minWidth: "175px" }}>
                        <input type="date" className="form-control" ref={dateFinish} onChange={(e) => { onChangeDateFinish(e) }}></input>
                    </div>
                </div>
                <div className="formRow">
                    <label>Cantidad de días de licencia: {days}</label>
                </div>
                <BeShowed show={props.action === 'Registrar'}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Empleado*</label>
                        </div>
                    </div>
                    <div className="formRow title-searcher">
                        <div className="search-input">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Buscar empleado..." value={searchState} onChange={(e) => setSearchState(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </div>
                    </div>
                </BeShowed>
                <BeShowed show={showSpinner}>
                    <LoaderSpinner color="secondary" loading="Cargando..." />
                </BeShowed>
                <BeShowed show={!showSpinner && props.action === 'Registrar'}>
                    <div className="formRow justify-content-center">
                        <CardEmployees employeesView={employeesView} employee={employee} onChangeEmployee={onChangeEmployee}
                            setEmployeesStart={setEmployeesStart} employees={employees} employeesStart={employeesStart}
                            searchState={searchState} licensedEmployees={licensedEmployees} />
                    </div>
                </BeShowed>
                <ShowSelectedEmployee selectedEmployee={employee} />
                <div className="formRow">
                    <div className="col-sm-2">
                        <label>Motivo de licencia*</label>
                    </div>
                    <textarea className="form-control" rows="2" ref={reason} maxLength="200" onChange={onChangeReason}></textarea>
                </div>
                <BeShowed show={props.action === 'Registrar'}>
                    <Buttons ready={(!errorDateInit && !errorDateFinish && !errorEmployee && !errorReason)}
                        label='Registrar' actionNotOK={actionNotOK} actionOK={registerLicense} actionCancel={() => { resetStates(false) }} />
                </BeShowed>
                <BeShowed show={props.action === 'Editar'}>
                    <Buttons ready={(!errorDateInit && !errorDateFinish && !errorEmployee && !errorReason)}
                        label='Aceptar' actionNotOK={actionNotOK} actionOK={editLicense} actionCancel={() => { comeBack(false) }} />
                </BeShowed>
                <BeShowed show={props.action === 'Ver'}>
                    <button className="btn btn-light sendOk offset-sm-11" onClick={() => { comeBack(false) }}>Volver</button>
                </BeShowed>
            </div>
        </>
    )
}

export default FormLicense