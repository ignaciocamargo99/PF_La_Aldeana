import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SalariesTable from './SalariesTable';
import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import BeShowed from '../../../common/BeShowed';
import FormSalary from './FormSalary';
import ListSalaryFilter from './ListSalaryFilter';
import LoaderSpinner from "../../../common/LoaderSpinner";
import formattedDate from '../../../utils/formattedDate';
import dateToString from "../../../utils/ConverterDate/dateToString";

const PORT = require('../../../config');

const Salary = (props) => {
    const [salaries, setSalaries] = useState([]);
    const [allSalaries, setAllSalaries] = useState([]);
    const [salary, setSalary] = useState({ month: formattedDate(new Date()), employee: 0 });
    const [showSpinner, setShowSpinner] = useState(true);
    const [showSecondSpinner, setShowSecondSpinner] = useState(false);
    const [action, setAction] = useState('Listar');
    const [reloadList, setReloadList] = useState(false);
    const [filter, setFilter] = useState('NonGenerate');
    const [errorDate, setErrorDate] = useState(false);
    const [month, setMonth] = useState(formattedDate(new Date()));
    const startDate = formattedDate(new Date(2021, 6, 1));
    let startMonth = formattedDate(new Date(), 2);
    const maxMonth = formattedDate(new Date(), 0, -(new Date().getDate()));
    const inputMonth = useRef(null);
    const [isValidMonth, setIsValidMonth] = useState("form-control");
    let permissionsAccess = props.permissionsAccess;

    useEffect(() => {
        if (isValidMonth !== "form-control") {
            setShowSecondSpinner(true);
            Axios.get(`${PORT()}/api/salaries?monthYear=${month}`)
                .then((response) => {
                    const aux = [];
                    const state = filter === 'Confirm' ? 2 : filter === 'OnHold' ? 1 : -1;
                    if (response.data.length > 1) {
                        response.data.forEach(elem => {
                            elem.fullName = elem.last_name;
                            elem.fullName += ', ';
                            elem.fullName += elem.name;
                            if (elem.id_state === state) aux.push(elem);
                        });
                    }
                    setSalaries(aux);
                    setAllSalaries(response.data);
                    setShowSpinner(false);
                    setShowSecondSpinner(false);
                });
        } else {
            if(action==='Listar' &&  inputMonth.current)  inputMonth.current.value = month;
            setShowSpinner(false);
        }
    }, [reloadList, month, filter, isValidMonth,action]);

    const setActionSalary = (newAction, salary) => {
        if (newAction === "Listar") {
            setSalaries([]);
            setAllSalaries([]);
            setAction(newAction);
            setMonth(salary);
            setSalary({ month: salary, employee: 0 });
        } else{
            setAction(newAction);
            setSalary(salary);
        }
    }

    const onClickNewSalary = () => setAction('Registrar');

    const onChangeMonth = () => {
        if (inputMonth.current && inputMonth.current.value) {
            setIsValidMonth("form-control is-valid");
            salary.month = inputMonth.current.value + '-01';
            setMonth(inputMonth.current.value + '-01');
            setErrorDate(false);
        }
    }

    useEffect(()=>{setErrorDate(true)}, []);

    return (
        <>
            {showSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
                :
                <div>
                    <BeShowed show={action === 'Listar'}>
                        <div style={{ display: 'none' }}>{document.title = "Salarios"}</div>
                        <div className="viewTitleBtn">
                            <h1>Salarios</h1>
                        </div>
                        <div className="viewBody">
                            <div className="formRow d-flex justify-content-between align-items-center">
                                <div className="form-control-label">
                                    <label htmlFor="firstMonth" >Mes a generar*</label>
                                </div>
                                <div className="form-control-input" style={{ marginRight: '2em' }}>
                                    <input className={isValidMonth} id="month" type="month" ref={inputMonth} onChange={onChangeMonth} min={startDate.slice(0, -3)}
                                        max={maxMonth.slice(0, -3)} value={errorDate?null:month?.slice(0, -3)}/>
                                </div>
                                <div className="form-contorl-input">
                                    <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                        <button id='addSalaryButton' disabled={errorDate} style={errorDate ? { backgroundColor: 'grey' } : null} onClick={onClickNewSalary} type="button" className={"btn btn-light " +(errorDate?"disabledNewBtn":"newBtn")}><FontAwesomeIcon icon={faPlus} /> Generar</button>
                                    </BeShowed>
                                    <BeShowed show={permissionsAccess === 1}>
                                        <button id='addSalaryButton' disabled className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Generar</button>
                                    </BeShowed>
                                </div>
                            </div>
                            <ListSalaryFilter onClickRB={setFilter} filter={filter} />
                            <BeShowed show={showSecondSpinner} >
                                <LoaderSpinner color="primary" loading="Cargando..." />
                            </BeShowed>
                            <BeShowed show={!showSecondSpinner && isValidMonth === "form-control is-valid"} >
                                <SalariesTable salaries={salaries} showSpinner={showSpinner} setActionSalary={setActionSalary} allSalaries={inputMonth.current ? allSalaries : null} month={inputMonth.current ? inputMonth.current.value : null}
                                    reloadList={reloadList} setReloadList={setReloadList} filter={filter} isValidSearch={isValidMonth === "form-control is-valid"} permissionsAccess={permissionsAccess} />
                            </BeShowed>
                        </div>
                    </BeShowed>
                    <BeShowed show={(action === 'Ver' || action === 'Editar' || action === 'Registrar') && action !== 'Listar'}>
                        <FormSalary setActionSalary={setActionSalary} action={action} salary={salary} salaries={allSalaries}
                            reloadList={reloadList} setReloadList={setReloadList} month={month} />
                    </BeShowed>
                </div>
            }
        </>
    );
}

export default Salary;