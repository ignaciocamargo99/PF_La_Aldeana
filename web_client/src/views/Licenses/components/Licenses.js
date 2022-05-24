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
import { FaFile } from 'react-icons/fa';
import Viewer from 'views/Reports/ProductSales/components/PDFModalViewer';
import MyDocument from './PDFLicensesReport';

const PORT = require('../../../config');

const Licenses = (props) => {

    const [licenses, setLicenses] = useState([]);
    const [license, setLicense] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const [action, setAction] = useState('Listar');
    const [reloadList, setReloadList] = useState(false);
    const [filter, setFilter] = useState('All');
    const [MyDoc, setMyDoc] = useState('');
    const [showPdf, setShowPDF] = useState(false);
    const [filteredElements, setFilteredElements] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    const showRenderPDF = () => setShowPDF(true);

    const cancel = () => setShowPDF(false);

    const title = (filter) => {
        if (filter === "All") return "Todos";
        if (filter === "Finish") return "Finalizadas";
        if (filter === "Current") return "Actuales";
        if (filter === "OnComing") return "Próximas";
    }

    useEffect(() => {
        Axios.get(`${PORT()}/api/licenses`)
            .then((response) => {
                response.data?.forEach(license => {
                    license.fullName = license.last_name + ',' + license.name;
                });
                setLicenses(response.data);
                setShowSpinner(false);
                setFilter('All');
            })
    }, [reloadList])

    useEffect(()=>{
        setMyDoc(<MyDocument title={title(filter)} filter={filter} licenses={filteredElements}  description={(nameSearch.length === 0 ? '' : 'Filtrado por nombres que coincidan con: "' + nameSearch + '"')} />);
    }, [filter, filteredElements])

    const setActionLicense = (action, license) => {
        setAction(action);
        setLicense(license);
    }

    const onClickNewLicense = () => {
        setAction('Registrar');
    }

    return (<>
        {showSpinner ?
            <LoaderSpinner color="primary" loading="Cargando..." />
            :
            <div>
                <BeShowed show={action === 'Listar'}>
                    <div style={{ display: 'none' }}>{document.title = "Licencias Activas"}</div>
                    <div className="viewTitleBtn">
                        <h1>Licencias Activas</h1>
                        <button id='printLicensesButton' onClick={showRenderPDF} type="button" className="btn btn-light printBtn"><FaFile /> Imprimir informe</button>
                        <BeShowed show={props.permissionsAccess === 2 || props.permissionsAccess === 3}>
                            <button id='editLicenseButton' onClick={onClickNewLicense} type="button" className="btn btn-light newBtn"><FontAwesomeIcon icon={faPlus} /> Nueva</button>
                        </BeShowed>
                        <BeShowed show={props.permissionsAccess === 1}>
                            <button id='editLicenseButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nueva</button>
                        </BeShowed>
                    </div>
                    <div className="viewBody">
                        <ListLicensesFilter onClickRB={setFilter} filter={filter} />
                        <LicensesTable licenses={licenses} showSpinner={showSpinner} setActionLicense={setActionLicense} setFilteredElements={setFilteredElements} setNameSearch={setNameSearch}
                            reloadList={reloadList} setReloadList={setReloadList} filter={filter} permissionsAccess={props.permissionsAccess} />
                    </div>
                </BeShowed>
                <BeShowed show={action === 'Ver' || action === 'Editar' || action === 'Registrar'}>
                    <FormLicense setActionLicense={setActionLicense} action={action} license={license} licenses={licenses}
                        reloadList={reloadList} setReloadList={setReloadList} />
                </BeShowed>
                <Viewer MyDoc={MyDoc} showPdf={showPdf} cancel={cancel} title={filter} description={(nameSearch.length === 0 ? '' : 'Filtrado por nombres que coincidan con: "' + nameSearch + '"')} ></Viewer>
            </div>
        }
    </>)
}

export default Licenses