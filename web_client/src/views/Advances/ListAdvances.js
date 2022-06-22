
import '../../assets/Buttons.css';
import AdvancesTable from "./components/AdvancesTable";

export default function ListAdvances(props) {

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Adelantos"}</div>
            <AdvancesTable permissionsAccess={props.permissionsAccess} user={props.user} />
        </>
    );
}