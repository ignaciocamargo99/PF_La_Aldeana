
import '../../assets/Buttons.css';
import EmployeesTable from "./components/EmployeesTable";

export default function EmployeesView({permissionsAccess}) {

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Empleados"}</div>
            <EmployeesTable permissionsAccess={permissionsAccess}/>
        </>
    );
}