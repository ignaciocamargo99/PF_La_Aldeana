
import '../../assets/Buttons.css';
import AdvancesTable from "./components/AdvancesTable";

export default function ListAdvances() {

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Adelantos"}</div>
            <AdvancesTable />
        </>
    );
}