import { faClipboard } from '@fortawesome/free-solid-svg-icons';

import BeShowed from "common/BeShowed";
import Breadcrumb from 'common/Breadcrumb';
import LoaderSpinner from 'common/LoaderSpinner';

import { useState } from 'react';
import dateText from 'utils/DateFormat/dateText';

import ListSalaries from "./components/ListSalaries";
import SalariesReportOptions from "./components/SalariesReportOptions";
import TotalsSalaries from './components/TotalsSalaries';

const SalariesReport = ({ user, permissionsAccess }) => {

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [load, setLoad] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [salaries, setSalaries] = useState([]);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Reporte de salarios"}</div>
            <Breadcrumb parentName="Reportes de RRHH" icon={faClipboard} parentLink="RRHHReport" currentName="Reporte de salarios" />
            <div className="viewTitle">
                <h1>Reporte de salarios</h1>
            </div>
            <div className="viewBody">
                <div className="row">
                    <SalariesReportOptions
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        load={load}
                        permissionsAccess={permissionsAccess}
                        salaries={salaries[0]}
                        setFrom={setDateFrom}
                        setLoad={setLoad}
                        setLoaded={setLoaded}
                        setSalaries={setSalaries}
                        setTo={setDateTo}
                        user={user}
                    />
                </div>
                <br />
                <BeShowed show={loaded === false && load}>
                    <LoaderSpinner color='secondary' loading='Cargando...'></LoaderSpinner>
                </BeShowed>
                <BeShowed show={loaded === true && load}>
                    <BeShowed show={salaries[0]?.length > 0}>
                        <div className="text-center">
                            <h5 style={{ textAlign: 'center', verticalAlign: 'middle' }}>Salarios desde {dateFrom ? dateText(dateFrom, true, true) : new Date().toLocaleDateString()} hasta {dateTo ? dateText(dateTo, true, true) : new Date().toLocaleDateString()}</h5>
                        </div>
                        <hr />
                        <div className="formRow">
                            <div className="col-sm-9" style={{ paddingRight: '1em' }}>
                                <ListSalaries salaries={salaries} from={dateFrom} to={dateTo} />
                            </div>
                            <div className="col-sm-3" style={{ paddingLeft: '1em' }}>
                                <TotalsSalaries totals={salaries[1]} />
                            </div>
                        </div>
                    </BeShowed>
                    <BeShowed show={salaries[0]?.length < 1 && load}>
                        <br />
                        <div className="text-center">
                            <h4>No se encontraron salarios para el período ({dateFrom ? dateText(dateFrom, true, true) : new Date().toLocaleDateString()} hasta {dateTo ? dateText(dateTo, true, true) : new Date().toLocaleDateString()})</h4>
                        </div>
                    </BeShowed>
                </BeShowed>
            </div>
        </>
    );
}

export default SalariesReport;