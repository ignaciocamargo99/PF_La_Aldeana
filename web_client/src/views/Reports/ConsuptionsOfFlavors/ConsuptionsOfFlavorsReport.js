import Options from "./components/Options";
import ListConsuptions from "./components/ListConsuptions";
import BeShowed from "../../../common/BeShowed";
import React, { useState } from 'react';
import Breadcrumb from '../../../common/Breadcrumb';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import LoaderSpinner from 'common/LoaderSpinner';
import TotalsConsuptions from './components/TotalsConsuptions';
import dateText from '../../../utils/DateFormat/dateText';
import Consuptions from './components/Consuptions';
import Productions from './components/Productions';

const ConsuptionsOfFlavorsReport = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [load, setLoad] = useState(false);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [consuptions, setConsuptions] = useState([]);
    let permissionsAccess = props.permissionsAccess;

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Reporte de consumo de baldes de sabores de helados"}</div>
            <Breadcrumb parentName="Reportes de ventas" icon={faClipboard} parentLink="salesReport" currentName="Reporte de consumo de baldes de sabores de helados" />
            <div className="viewTitle">
                <h1>Reporte de consumo de baldes de sabores de helados</h1>
            </div>
            <div className="viewBody">
                <div className="row">
                    <Options consuptions={consuptions[0]} loaded={loaded} setLoaded={setLoaded} load={load} dateTo={to} dateFrom={from} setTo={setTo} setFrom={setFrom} user={props.user} setConsuptions={setConsuptions} setLoad={setLoad} permissionsAccess={permissionsAccess} />
                </div>
                <br />
                <BeShowed show={loaded === false && load}>
                    <LoaderSpinner color='secondary' loading='Cargando...'></LoaderSpinner>
                </BeShowed>
                <BeShowed show={loaded === true && load}>
                    <BeShowed show={consuptions[0]?.length > 0}>
                        <div className="text-center">
                            <h5 style={{ textAlign: 'center', verticalAlign: 'middle' }}>Consumo de baldes de sabores de helados desde {from?dateText(from, true, true):new Date().toLocaleDateString()} hasta {to?dateText(to, true, true):new Date().toLocaleDateString()}</h5>
                        </div>
                        <hr />
                        <div className="formRow">
                            <div className="col-sm-7" style={{ paddingRight: '1em' }}>
                                <ListConsuptions consuptions={consuptions} from={from} to={to}/>
                            </div>
                            <div className="col-sm-5" style={{ paddingLeft: '1em' }}>
                                <TotalsConsuptions totals={consuptions[2]}/>
                                <div className="formRow">
                                    <div className="col-sm-6" style={{ paddingRight: '1em' }}>
                                        <Consuptions totals={consuptions[0]}/>
                                    </div>
                                    <div className="col-sm-6" style={{ paddingLeft: '1em' }}>
                                        <Productions totals={consuptions[0]}/>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </BeShowed>
                    <BeShowed show={consuptions[0]?.length < 1 && load}>
                        <br />
                        <div className="text-center">
                            <h2>No se encontraron consumo de baldes de sabores de helados para el período ({from?dateText(from, true, true):new Date().toLocaleDateString()} hasta {to?dateText(to, true, true):new Date().toLocaleDateString()})</h2>
                        </div>
                    </BeShowed>
                </BeShowed>
            </div>
        </>
    );
}

export default ConsuptionsOfFlavorsReport;