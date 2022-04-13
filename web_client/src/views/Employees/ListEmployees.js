
import '../../assets/Buttons.css';
import EmployeesTable from "./components/EmployeesTable";

export default function ListEmployees(props) {

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Empleados"}</div>
            <EmployeesTable permissionsAccess={props.permissionsAccess}/>
        </>
    );
}