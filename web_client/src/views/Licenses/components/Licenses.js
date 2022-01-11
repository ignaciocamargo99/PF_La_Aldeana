import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LicensesTable from './LicensesTable';
import { useEffect, useState } from "react";
import Axios from "axios";
import BeShowed from '../../../common/BeShowed';
import FormLicense from './FormLicense';
import ListLicensesFilter from './ListLicensesFilter';
import LoaderSpinner from "../../../common/LoaderSpinner";

const PORT = require('../../../config');

const Licenses = (props) => {
    
    const[licenses,setLicenses] = useState([]);
    const[license,setLicense] = useState(null);
    const[showSpinner,setShowSpinner] = useState(true);
    const[action,setAction] = useState('Listar');
    const[reloadList,setReloadList] = useState(false);
    const[filter,setFilter] = useState('All');

    useEffect(() => {
        Axios.get(`${PORT()}/api/licenses`)
        .then((response) => {
            setLicenses(response.data);
            setShowSpinner(false);
            setFilter('All');
        })
    },[reloadList])

    const setActionLicense = (action,license) => {
        setAction(action);
        setLicense(license);
    }

    const onClickNewLicense = () => {
        setAction('Registrar');
    }

    return(<>
            {showSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
            :
                <div>
                    <BeShowed show={action === 'Listar'}>
                        <div style={{display: 'none'}}>{document.title = "Licencias Activas"}</div>
                        <div className="viewTitleBtn">
                            <h1>Licencias Activas</h1>
                            <button id='editLicenseButton' onClick={onClickNewLicense} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nueva</button>
                        </div>
                        <div className="viewBody">
                            <ListLicensesFilter onClickRB={setFilter} filter={filter}/>
                            <LicensesTable licenses={licenses} showSpinner={showSpinner} setActionLicense={setActionLicense} 
                                        reloadList={reloadList} setReloadList={setReloadList} filter={filter}/>
                        </div>
                    </BeShowed>
                    <BeShowed show={action === 'Ver' || action === 'Editar' || action === 'Registrar'}>   
                        <FormLicense setActionLicense={setActionLicense} action={action} license={license} licenses={licenses} 
                                    reloadList={reloadList} setReloadList={setReloadList}/>
                    </BeShowed>
                </div>
            }
        </>)        
}

export default Licenses