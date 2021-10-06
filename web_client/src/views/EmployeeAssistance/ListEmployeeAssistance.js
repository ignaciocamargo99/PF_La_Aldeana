
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../assets/Buttons.css';
import AssistanceTable from "./components/AssistanceTable";

export default function ListEmployeesAssistance() {
    // const onClickNewEmployee = () => {
    //     window.location.replace('/app/registerEmployees');
    // }

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Asistencias"}</div>
            <div className="viewTitleBtn">
                <h1>Empleados</h1>
                <button id='editAssistanceButton' type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
            </div>
            <div className="viewBody">
                <AssistanceTable />
            </div>
        </>
    );
}