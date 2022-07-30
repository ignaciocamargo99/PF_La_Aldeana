import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import ShowEmployees from "./ShowEmployees";
import '../styles/CardEmployee.css';

const CardEmployees = (props) => {
    const [employeesFilter, setEmployeesFilter] = useState(null)

    useEffect(() => {
        const filteredElement = props.employees.filter((employee) => {
            return (employee.name).toUpperCase().includes(props.searchState.toUpperCase());
        });
        setEmployeesFilter(filteredElement)
    }, [props.searchState])

    return (
        <>
            <BeShowed show={props.searchState.trim().length <= 2}>
                <>
                    <button className="nextBtn" disabled={props.employeesStart === 0} onClick={() => { props.setEmployeesStart(props.employeesStart - 1) }}><FontAwesomeIcon icon={faArrowLeft} /></button>
                </>
            </BeShowed>
            <ShowEmployees employees={props.searchState.trim().length <= 2 ? props.employeesView : employeesFilter} employee={props.employee}
                searchState={props.searchState.trim().length <= 2 ? '' : props.searchState.toUpperCase()}
                onChangeEmployee={props.onChangeEmployee} licensedEmployees={props.licensedEmployees} />
            <BeShowed show={employeesFilter?.length === 0 && props.searchState.trim().length >2}>
                <div className="formRow">
                    <div style={{ height: '200px', alignItems: 'center', display: 'flex' }}>
                        <label><b style={{ color: '#383C77' }}>No hay empleados con los filtros ingresados</b></label>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={props.searchState.trim().length <= 2}>
                <div>
                    <button className="nextBtn" disabled={props.employeesStart === (props.employees.length - 6)} onClick={() => { props.setEmployeesStart(props.employeesStart + 1) }}><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </BeShowed>
        </>
    )
}

export default CardEmployees