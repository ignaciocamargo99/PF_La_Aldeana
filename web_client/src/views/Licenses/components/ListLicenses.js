import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LicensesTable from './LicensesTable';

const ListLicenses = (props) => {
    
    const onCLickNewLicense = () => {
        window.location.replace('/app/registerLicense');
    }

    return(<>
            <div style={{display: 'none'}}>{document.title = "Licencias Activas"}</div>
            <div className="viewTitleBtn">
                <h1>Licencias Activas</h1>
                <button id='editLicenseButton' onClick={onCLickNewLicense} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nueva</button>
            </div>
            <div className="viewBody">
                <LicensesTable />
            </div>
        </>)        
}

export default ListLicenses