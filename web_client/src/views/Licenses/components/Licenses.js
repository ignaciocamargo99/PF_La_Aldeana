import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LicensesTable from './LicensesTable';
import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import BeShowed from '../../../common/BeShowed';
import FormLicense from './FormLicense';
import ListLicensesFilter from './ListLicensesFilter';
import LoaderSpinner from "../../../common/LoaderSpinner";
import { FaFile } from 'react-icons/fa';
import Viewer from 'views/Reports/ProductSales/components/PDFModalViewer';
import MyDocument from './PDFLicensesReport';
import dateText from 'utils/DateFormat/dateText';
import { calculateDiferenceDays } from "../../../utils/DiferenceDate/calculateDiferenceDays";

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

    const dateInitRef = useRef();
    const dateFinishRef = useRef();
    const [dateInit, setDateInit] = useState(null);
    const [dateFinish, setDateFinish] = useState(null);

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
                dateInitRef.current.value = null;
                dateFinishRef.current.value = null;
            })
    }, [reloadList])

    useEffect(()=>{
        setMyDoc(<MyDocument title={title(filter) +(dateInit?  " - (" +dateText(dateInit, true, true):' ')+ (dateFinish&&dateInit?" a ":dateFinish?' - (':'')  + (dateFinish?dateText(dateFinish, true, true):'')+(dateFinish||dateInit?")":'')} filter={filter} licenses={filteredElements}  description={(nameSearch.length === 0 ? '' : 'Filtrado por nombres que coincidan con: "' + nameSearch + '"')} />);
    }, [filter, filteredElements, dateInit, dateFinish, nameSearch])

    const setActionLicense = (action, license) => {
        setAction(action);
        setLicense(license);
    }

    const onClickNewLicense = () => {
        setAction('Registrar');
    }

    const onChangeDateInit = (e) => {
        if (dateInitRef.current.value !== "") {
            setDateInit(dateInitRef.current.value);
            dateFinishRef.current.min = e.target.value;
            if (dateFinishRef.current.value !== "") {
                onChangeDates();
            }
        } 
    }

    const onChangeDateFinish = (e) => {
        if (dateFinishRef.current.value !== "") {
            setDateFinish(dateFinishRef.current.value);

            if (dateInitRef.current.value !== "") {
                onChangeDates();
            }
        } 
    }
    const onChangeDates = () => {
        let aux = calculateDiferenceDays(dateInitRef.current.value, dateFinishRef.current.value);
        aux++;
        if (aux <= 0) {
            dateFinishRef.current.value = dateInitRef.current.value;
            aux = 1;
        }
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
                        <div className="formRow">
                            <label>Seleccione el rango de fechas sobre el que desea generar el informe.</label>
                        </div>
                        <div className="formRow d-flex justify-content-between">
                            <label htmlFor="dateFrom" className="col-sm-2">Fecha desde*</label>
                            <div className="col-sm-3" style={{ textAlign: 'right' }} >
                                <input type="date" style={{ maxWidth: "9em", marginRight: '1em' }} id='dateFrom' ref={dateInitRef} onChange={(e) => { onChangeDateInit(e) }}></input>
                            </div>
                            <label htmlFor="dateTo" className="col-sm-2">Fecha hasta*</label>
                            <div className="col-sm-3" style={{ textAlign: 'right' }} >
                                <input type="date" style={{ maxWidth: "9em", marginRight: '1em' }} id='dateTo' ref={dateFinishRef}  onChange={(e) => { onChangeDateFinish(e) }}></input>
                            </div>
                        </div>
                        <ListLicensesFilter onClickRB={setFilter} filter={filter} />
                        <LicensesTable dateInit={dateInitRef.current?.value} dateFinish={dateFinishRef.current?.value} licenses={licenses} showSpinner={showSpinner} setActionLicense={setActionLicense} setFilteredElements={setFilteredElements} setNameSearch={setNameSearch}
                            reloadList={reloadList} setReloadList={setReloadList} filter={filter} permissionsAccess={props.permissionsAccess} />
                    </div>
                </BeShowed>
                <BeShowed show={action === 'Ver' || action === 'Editar' || action === 'Registrar'}>
                    <FormLicense setActionLicense={setActionLicense} action={action} license={license} licenses={licenses}
                        reloadList={reloadList} setReloadList={setReloadList} />
                </BeShowed>
                <Viewer MyDoc={MyDoc} reportOf="licencias" showPdf={showPdf} cancel={cancel} title={title(filter) +(dateInit?  " - (" +dateText(dateInit, true, true):' ')+ (dateFinish&&dateInit?" a ":dateFinish?' - (':'')  + (dateFinish?dateText(dateFinish, true, true):'')+(dateFinish||dateInit?")":'')} description={(nameSearch.length === 0 ? '' : 'Filtrado por nombres que coincidan con: "' + nameSearch + '"')} ></Viewer>
            </div>
        }
    </>)
}

export default Licenses