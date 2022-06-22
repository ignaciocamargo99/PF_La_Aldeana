import '../../assets/Buttons.css';
import AssistanceTable from "./components/AssistanceTable";

export default function ListEmployeesAssistance(props) {

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Asistencias"}</div>
            <AssistanceTable permissionsAccess={props.permissionsAccess}  user={props.user}/>
        </>
    );
}