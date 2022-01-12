import '../../assets/Buttons.css';
import AssistanceTable from "./components/AssistanceTable";

export default function ListEmployeesAssistance() {

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Asistencias"}</div>
            <AssistanceTable />
        </>
    );
}