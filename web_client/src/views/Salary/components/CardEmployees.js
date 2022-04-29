import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import ShowEmployees from "./ShowEmployees";

const CardEmployees = (props) => {

    const [employeesFilter, setEmployeesFilter] = useState(null)

    useEffect(() => {
        let aux = []
        props.employees.forEach((employee) => {
            if (employee.name.toUpperCase().includes(props.searchState.toUpperCase().trim()) || employee.last_name.toUpperCase().includes(props.searchState.toUpperCase().trim())) {
                aux.push(employee)
            }
        })
        setEmployeesFilter(aux)
    }, [props.searchState])

    return (
        <>
            <BeShowed show={props.searchState.trim().length <= 2}>
                <div>
                    <button style={{ height: "200px", margin: "5px", backgroundColor: '#383C77', color: 'white' }} disabled={props.employeesStart === 0} onClick={() => { props.setEmployeesStart(props.employeesStart - 1) }}><FontAwesomeIcon icon={faArrowLeft} /></button>
                </div>
            </BeShowed>
            <ShowEmployees employees={props.searchState.trim().length <= 2 ? props.employeesView : employeesFilter} employee={props.employee}
                searchState={props.searchState.trim().length <= 2 ? '' : props.searchState.toUpperCase()}
                onChangeEmployee={props.onChangeEmployee} licensedEmployees={props.licensedEmployees} />
            <BeShowed show={employeesFilter?.length === 0 && props.searchState.trim().length > 2}>
                <div className="formRow">
                    <div style={{ height: '200px', alignItems: 'center', display: 'flex' }}>
                        <label><b style={{ color: '#383C77' }}>No hay empleados con ese nombre</b></label>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={props.searchState.trim().length <= 2}>
                <div>
                    <button style={{ height: "200px", margin: "5px", backgroundColor: "#383C77", color: 'white' }} disabled={props.employeesStart === (props.employees.length - 6)} onClick={() => { props.setEmployeesStart(props.employeesStart + 1) }}><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </BeShowed>
        </>
    )
}

export default CardEmployees