import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import '../../../assets/Buttons.css';

import BeShowed from 'common/BeShowed';
import LoaderSpinner from "common/LoaderSpinner";

import formattedDate from 'utils/formattedDate';

import { CONFIRM, NON_GENEATE, ON_HOLD } from './filtersConstants';
import FormSalary from './FormSalary';
import GenerateButton from "./GenerateButton";
import ListSalaryFilter from './ListSalaryFilter';
import SalariesTable from './SalariesTable';

const PORT = require('../../../config');

const Salary = ({ permissionsAccess }) => {
    const [salaries, setSalaries] = useState([]);
    const [allSalaries, setAllSalaries] = useState([]);
    const [salary, setSalary] = useState({ month: formattedDate(new Date()), employee: 0 });
    const [showSpinner, setShowSpinner] = useState(true);
    const [showSecondSpinner, setShowSecondSpinner] = useState(false);
    const [action, setAction] = useState('Listar');
    const [reloadList, setReloadList] = useState(false);
    const [filter, setFilter] = useState(NON_GENEATE);
    const [errorDate, setErrorDate] = useState(true);
    const [month, setMonth] = useState(formattedDate(new Date()));
    const startDate = formattedDate(new Date(2021, 6, 1));
    const maxMonth = formattedDate(new Date(), 0, -(new Date().getDate()));
    const inputMonth = useRef(null);
    const [isValidMonth, setIsValidMonth] = useState("form-control");

    useEffect(() => {
        if (isValidMonth !== "form-control") {
            setShowSecondSpinner(true);
            Axios.get(`${PORT()}/api/salaries?monthYear=${month}`)
                .then((response) => {
                    const aux = [];
                    const state = filter === CONFIRM ? 2 : filter === ON_HOLD ? 1 : -1;
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
            if (action === 'Listar' && inputMonth.current) inputMonth.current.value = month;
            setShowSpinner(false);
        }
    }, [reloadList, month, filter, isValidMonth, action]);

    const setActionSalary = (newAction, salary) => {
        if (newAction === "Listar") {
            setSalaries([]);
            setAllSalaries([]);
            setAction(newAction);
            setMonth(salary);
            setSalary({ month: salary, employee: 0 });
        } else {
            setAction(newAction);
            setSalary(salary);
        }
    }

    const onClickNewSalary = () => {
        setAction('Registrar')
    };

    const onChangeMonth = () => {
        if (inputMonth.current && inputMonth.current.value) {
            setIsValidMonth("form-control is-valid");
            salary.month = inputMonth.current.value + '-01';
            setMonth(inputMonth.current.value + '-01');
            setErrorDate(false);
        }
    }

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
                                    <label>Mes a generar*</label>
                                </div>
                                <div className="form-control-input" style={{ marginRight: '2em' }}>
                                    <input
                                        className={isValidMonth}
                                        max={maxMonth.slice(0, -3)}
                                        min={startDate.slice(0, -3)}
                                        onChange={onChangeMonth}
                                        ref={inputMonth}
                                        type="month"
                                        value={errorDate ? '' : month?.slice(0, -3)}
                                    />
                                </div>
                                <GenerateButton
                                    readOnly={permissionsAccess === 1}
                                    errorDate={errorDate}
                                    onClickNewSalary={onClickNewSalary}
                                />
                            </div>
                            <ListSalaryFilter onClickRB={setFilter} filter={filter} />
                            <BeShowed show={showSecondSpinner} >
                                <LoaderSpinner color="primary" loading="Cargando..." />
                            </BeShowed>
                            <BeShowed show={!showSecondSpinner && isValidMonth === "form-control is-valid"} >
                                <SalariesTable
                                    allSalaries={inputMonth.current ? allSalaries : null}
                                    permissionsAccess={permissionsAccess}
                                    reloadList={reloadList} setReloadList={setReloadList}
                                    salaries={salaries}
                                    selectedFilter={filter}
                                    selectedMonth={inputMonth.current ? inputMonth.current.value : null}
                                    setActionSalary={setActionSalary}
                                    showSpinner={showSpinner}
                                />
                            </BeShowed>
                        </div>
                    </BeShowed>
                    <BeShowed show={(action === 'Ver' || action === 'Editar' || action === 'Registrar') && action !== 'Listar'}>
                        <FormSalary
                            selectedAction={action}
                            selectedMonth={month}
                            salaries={allSalaries}
                            salary={salary}
                            setActionSalary={setActionSalary}
                        />
                    </BeShowed>
                </div>
            }
        </>
    );
}

export default Salary;
