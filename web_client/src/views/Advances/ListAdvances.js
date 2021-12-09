
import '../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdvancesTable from "./components/AdvancesTable";

export default function ListAdvances() {
    const onClickNewAdvances = () => {
        window.location.replace('/app/registerAdvances');
    }

    return (
        <>
            <div style={{display: 'none'}}>{document.title = "Adelantos"}</div>
            <div className="viewTitleBtn">
                <h1>Adelantos</h1>
                <button id='editAdvancesButton' onClick={onClickNewAdvances} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
            </div>
            <div className="viewBody">
                <AdvancesTable />
            </div>
        </>
    );
}