import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LicensesTable from './LicensesTable';
import { useEffect, useState } from "react";
import Axios from "axios";
import BeShowed from '../../../common/BeShowed';
import FormSalary from './FormSalary';
import ListLicensesFilter from './ListLicensesFilter';
import LoaderSpinner from "../../../common/LoaderSpinner";

const PORT = require('../../../config');

const Salary = (props) => {
    
    const[salaries,setSalaries] = useState([]);
    const[salary,setSalary] = useState(null);
    const[showSpinner,setShowSpinner] = useState(true);
    const[action,setAction] = useState('Listar');
    const[reloadList,setReloadList] = useState(false);
    const[filter,setFilter] = useState('All');

    useEffect(() => {
        Axios.get(`${PORT()}/api/licenses`)
        .then((response) => {
            setSalaries(response.data);
            setShowSpinner(false);
            setFilter('All');
        })
    },[reloadList])

    const setActionSalary = (action,salary) => {
        setAction(action);
        setSalary(salary);
    }

    const onClickNewSalary = () => {
        setAction('Registrar');
    }

    return(<>
            {showSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
            :
                <div>
                    <BeShowed show={action === 'Listar'}>
                        <div style={{display: 'none'}}>{document.title = "Salarios"}</div>
                        <div className="viewTitleBtn">
                            <h1>Salarios</h1>
                            <button id='addSalaryButton' onClick={onClickNewSalary} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                        </div>
                        <div className="viewBody">
                            <ListLicensesFilter onClickRB={setFilter} filter={filter}/>
                            <LicensesTable licenses={salaries} showSpinner={showSpinner} setActionLicense={setActionSalary} 
                                        reloadList={reloadList} setReloadList={setReloadList} filter={filter}/>
                        </div>
                    </BeShowed>
                    <BeShowed show={action === 'Ver' || action === 'Editar' || action === 'Registrar'}>   
                        <FormSalary setActionSalary={setActionSalary} action={action} salary={salary} salaries={salaries} 
                                    reloadList={reloadList} setReloadList={setReloadList}/>
                    </BeShowed>
                </div>
            }
        </>)        
}

export default Salary;