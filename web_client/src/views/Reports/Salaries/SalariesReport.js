import { faClipboard } from '@fortawesome/free-solid-svg-icons';

import BeShowed from "common/BeShowed";
import Breadcrumb from 'common/Breadcrumb';
import LoaderSpinner from 'common/LoaderSpinner';

import { useState } from 'react';

import getLastDayOfPreviousonthAsDate from './components/getLastMonthDate';
import getSalariesRangeTitle from './components/getSalariesRangeTitle';
import ListSalaries from "./components/ListSalaries";
import SalariesReportOptions from "./components/SalariesReportOptions";
import TotalsSalaries from './components/TotalsSalaries';

const SalariesReport = ({ user, permissionsAccess }) => {

    const [dateFrom, setDateFrom] = useState(getLastDayOfPreviousonthAsDate());
    const [dateTo, setDateTo] = useState(getLastDayOfPreviousonthAsDate());

    const [showReportSection, setShowReportSection] = useState(false);
    const [reportLoaded, setReportLoaded] = useState(false);

    const [salaries, setSalaries] = useState([]);

    const salariesRangeTitle = getSalariesRangeTitle(dateFrom, dateTo);

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
                        permissionsAccess={permissionsAccess}
                        reportLoaded={reportLoaded}
                        salaries={salaries[0]}
                        setDateFrom={setDateFrom}
                        setDateTo={setDateTo}
                        setReportLoaded={setReportLoaded}
                        setSalaries={setSalaries}
                        setShowReportSection={setShowReportSection}
                        showReportSection={showReportSection}
                        user={user}
                    />
                </div>
                <br />

                {showReportSection && (
                    <>
                        {(!reportLoaded) && (
                            <LoaderSpinner color='secondary' loading='Cargando...'></LoaderSpinner>
                        )}
                        {reportLoaded && (
                            <>
                                <BeShowed show={salaries[0]?.length > 0}>
                                    <div className="text-center">
                                        <h5 style={{ textAlign: 'center', verticalAlign: 'middle' }}>{salariesRangeTitle}</h5>
                                    </div>
                                    <hr />
                                    <div className="formRow">
                                        <div className="col-sm-9" style={{ paddingRight: '1em' }}>
                                            <ListSalaries salaries={salaries} />
                                        </div>
                                        <div className="col-sm-3" style={{ paddingLeft: '1em' }}>
                                            <TotalsSalaries totals={salaries[1]} />
                                        </div>
                                    </div>
                                </BeShowed>
                                <BeShowed show={salaries[0]?.length < 1}>
                                    <br />
                                    <div className="text-center">
                                        <h4>No se encontraron salarios para el período seleccionado.</h4>
                                    </div>
                                </BeShowed>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default SalariesReport;