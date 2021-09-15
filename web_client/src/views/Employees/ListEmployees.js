
import '../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmployeesTable from "./components/EmployeesTable";

export default function ListEmployees() {
    const onClickNewEmployee = () => {
        window.location.replace('/app/registerEmployees');
    }

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Empleados"}</div>
            <div className="viewTitleBtn">
                <h1>Empleados</h1>
                <button id='editEmployeeButton' onClick={onClickNewEmployee} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
            </div>
            <div className="viewBody">
                <EmployeesTable />
            </div>
        </>
    );
}