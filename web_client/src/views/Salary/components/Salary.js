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
    
    const [salaries,setSalaries] = useState([]);
    const [allSalaries, setAllSalaries] = useState([]);
    const [salary,setSalary] = useState({month: formattedDate(new Date()), employee: 0});
    const [showSpinner,setShowSpinner] = useState(true);
    const [showSecondSpinner,setShowSecondSpinner] = useState(false);
    const [action,setAction] = useState('Listar');
    const [reloadList,setReloadList] = useState(false);
    const [filter,setFilter] = useState('NonGenerate');
    const [errorDate,setErrorDate] = useState(true);

    const [month, setMonth] = useState(formattedDate(new Date()));
    const startDate = formattedDate(new Date(2021,6,1));
    let startMonth = formattedDate(new Date(),2);
    const maxMonth = formattedDate(new Date(), 0, -(new Date().getDate()));
    const inputMonth = useRef(null);
    const [isValidMonth, setIsValidMonth] = useState("form-control");

    useEffect(() => {
        if (isValidMonth !== "form-control"){
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
                });}
                setSalaries(aux);
                setAllSalaries(response.data);
                setShowSpinner(false);
                setShowSecondSpinner(false);
            });
        } else setShowSpinner(false);
    },[reloadList, month, filter, isValidMonth, inputMonth.current]);

    const setActionSalary = (newAction,salary) => {
        setAction(newAction);
        setSalary(salary);
        if (newAction === "Listar"){
            setSalaries([]);
            setAllSalaries([]);
            setReloadList(!reloadList);
        }
    }

    const onClickNewSalary = () => setAction('Registrar');

    const onChangeMonth = () => {
        if (inputMonth) {
            setMonth(inputMonth.current.value);
            setErrorDate(false);
        }
    }

    useEffect(() => {
        if (action === 'Listar') {
            if (inputMonth.current && !inputMonth.current.value) {
                setIsValidMonth("form-control");
                setErrorDate(true);
                setSalary({month: formattedDate(new Date()), employee: 0});
            } else if (inputMonth.current && inputMonth.current.value) {

                let aux = salary.month;
                if (aux.length !== 10) aux = salary.month;
                if (!inputMonth.current.value) inputMonth.current.value = aux.slice(0,-3);
                let min = inputMonth.current.min + '-10';

                if (parseInt(aux.slice(0, -5)) === parseInt(min.slice(0, -5))) {
                    if (parseInt(aux.slice(5, -3)) >= parseInt(min.slice(5, -3))) {
                        if (salary.month !== inputMonth.current.value){
                            setIsValidMonth("form-control is-valid");
                            salary.month = inputMonth.current.value + '-01';
                            setMonth(inputMonth.current.value + '-01');
                        }
                    }
                } else if (parseInt(aux.slice(0, -5)) > parseInt(min.slice(0, -5))) {
                    if (salary.month !== inputMonth.current.value && month){
                        setIsValidMonth("form-control is-valid");
                        salary.month = inputMonth.current.value + '-01';
                        setMonth(inputMonth.current.value + '-01');
                    }
                }
            }
        }
    }, [startMonth, month, action]);

    const setEmptyNonGenerate = () => setErrorDate(true);

    return(
        <>
            {showSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
            :
                <div>
                    <BeShowed show={action === 'Listar'}>
                        <div style={{display: 'none'}}>{document.title = "Salarios"}</div>
                        <div className="viewTitleBtn">
                            <h1>Salarios</h1>
                        </div>
                        <div className="viewBody">
                            <div className="formRow d-flex justify-content-between align-items-center">
                                <div className="form-control-label">
                                    <label htmlFor="firstMonth" >Mes a generar*</label>
                                </div>
                                <div className="form-control-input" style={{marginRight: '2em'}}>
                                    <input className={isValidMonth} id="month" type="month" ref={inputMonth} onChange={onChangeMonth} min={startDate.slice(0,-3)}
                                    max={maxMonth.slice(0,-3)} defaultValue={dateToString(month, true).slice(0,-3).length === 10 ? dateToString(month, true).slice(0,-3).length : null} />
                                </div>
                                <div className="form-contorl-input">
                                    <button id='addSalaryButton' disabled={errorDate} style={errorDate ? {backgroundColor: 'grey' } : null} onClick={onClickNewSalary} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Generar</button>
                                </div>
                            </div>
                            <ListSalaryFilter onClickRB={setFilter} filter={filter}/>
                            <BeShowed show={showSecondSpinner} >
                                <LoaderSpinner color="primary" loading="Cargando..." />
                            </BeShowed>
                            <BeShowed show={!showSecondSpinner && isValidMonth === "form-control is-valid"} >
                                <SalariesTable salaries={salaries} showSpinner={showSpinner} setActionSalary={setActionSalary} allSalaries={inputMonth.current ? allSalaries : null} month={inputMonth.current ? inputMonth.current.value : null}
                                            reloadList={reloadList} setReloadList={setReloadList} filter={filter} isValidSearch={isValidMonth === "form-control is-valid" } emptyNonGenerate={setEmptyNonGenerate} />
                            </BeShowed>
                        </div>
                    </BeShowed>
                    <BeShowed show={action === 'Ver' || action === 'Editar' || action === 'Registrar'}>   
                        <FormSalary setActionSalary={setActionSalary} action={action} salary={salary} salaries={allSalaries} 
                                    reloadList={reloadList} setReloadList={setReloadList} month={month} />
                    </BeShowed>
                </div>
            }
        </>
    );
}

export default Salary;