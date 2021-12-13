import '../../assets/Buttons.css';
import AssistanceTable from "./components/AssistanceTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListEmployeesAssistance() {

    const onClickNewAssistance = () => {
        window.location.replace('/app/registerAssistance');
    }

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Asistencias"}</div>

            <div className="viewTitleBtn">
                <h1>Asistencias</h1>
                <button id='editAssistanceButton' onClick={onClickNewAssistance} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
            </div>


            <div className="viewBody">
                <AssistanceTable />
            </div>
        </>
    );
}