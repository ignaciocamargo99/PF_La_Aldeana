import Options from "./components/Options";
import ListSalaries from "./components/ListSalaries";
import BeShowed from "../../../common/BeShowed";
import React, { useState } from 'react';
import Breadcrumb from '../../../common/Breadcrumb';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import LoaderSpinner from 'common/LoaderSpinner';
import TotalsSalaries from './components/TotalsSalaries';
import dateText from '../../../utils/DateFormat/dateText';

const SalariesReport = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [load, setLoad] = useState(false);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [salaries, setSalaries] = useState([]);
    let permissionsAccess = props.permissionsAccess;

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Reporte de salarios"}</div>
            <Breadcrumb parentName="Reportes de RRHH" icon={faClipboard} parentLink="RRHHReport" currentName="Reporte de salarios" />
            <div className="viewTitle">
                <h1>Reporte de salarios</h1>
            </div>
            <div className="viewBody">
                <div className="row">
                    <Options salaries={salaries[0]} loaded={loaded} setLoaded={setLoaded} load={load} dateTo={to} dateFrom={from} setTo={setTo} setFrom={setFrom} user={props.user} setSalaries={setSalaries} setLoad={setLoad} permissionsAccess={permissionsAccess} />
                </div>
                <br />
                <BeShowed show={loaded === false && load}>
                    <LoaderSpinner color='secondary' loading='Cargando...'></LoaderSpinner>
                </BeShowed>
                <BeShowed show={loaded === true && load}>
                    <BeShowed show={salaries[0]?.length > 0}>
                        <div className="text-center">
                            <h5 style={{ textAlign: 'center', verticalAlign: 'middle' }}>Salarios desde {from?dateText(from, true, true):new Date().toLocaleDateString()} hasta {to?dateText(to, true, true):new Date().toLocaleDateString()}</h5>
                        </div>
                        <hr />
                        <div className="formRow">
                            <div className="col-sm-9" style={{ paddingRight: '1em' }}>
                                <ListSalaries salaries={salaries} from={from} to={to}/>
                            </div>
                            <div className="col-sm-3" style={{ paddingLeft: '1em' }}>
                                <TotalsSalaries totals={salaries[1]}/>
                            </div>
                        </div>
                    </BeShowed>
                    <BeShowed show={salaries[0]?.length < 1 && load}>
                        <br />
                        <div className="text-center">
                            <h2>No se encontraron salarios para el per??odo ({from?dateText(from, true, true):new Date().toLocaleDateString()} hasta {to?dateText(to, true, true):new Date().toLocaleDateString()})</h2>
                        </div>
                    </BeShowed>
                </BeShowed>
            </div>
        </>
    );
}

export default SalariesReport;