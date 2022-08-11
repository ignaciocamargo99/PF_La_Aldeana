import Options from "./components/Options";
import ListStock from "./components/ListStock";
import BeShowed from "../../../common/BeShowed";
import React, { useState } from 'react';
import Breadcrumb from '../../../common/Breadcrumb';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import LoaderSpinner from 'common/LoaderSpinner';
import TotalsStock from './components/TotalsStock';
import dateText from '../../../utils/DateFormat/dateText';

const FlavorsStockReport = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [load, setLoad] = useState(false);
    const from = new Date();
    const [stock, setStock] = useState([[],[]]);
    let permissionsAccess = props.permissionsAccess;

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Reporte de stock de sabores de helados y reabastecimiento"}</div>
            <Breadcrumb parentName="Reportes de ventas" icon={faClipboard} parentLink="salesReport" currentName="Reporte de stock de sabores de helados y reabastecimiento" />
            <div className="viewTitle">
                <h1>Reporte de stock de sabores de helados y reabastecimiento</h1>
            </div>
            <div className="viewBody">
                <div className="row">
                    <Options stock={stock[0]} loaded={loaded} setLoaded={setLoaded} load={load} dateFrom={from} user={props.user} setStock={setStock} setLoad={setLoad} permissionsAccess={permissionsAccess} />
                </div>
                <br />
                <BeShowed show={loaded === false && load}>
                    <LoaderSpinner color='secondary' loading='Cargando...'></LoaderSpinner>
                </BeShowed>
                <BeShowed show={loaded === true && load}>
                    <BeShowed show={stock[0]?.length > 0}>
                        <div className="text-center">
                            <h5 style={{ textAlign: 'center', verticalAlign: 'middle' }}>Información de stock de sabores de helados y reabastecimiento del {from?dateText(from, true, false):new Date().toLocaleDateString()}</h5>
                        </div>
                        <hr />
                        <div className="formRow">
                            <div className="col-sm-9" style={{ paddingRight: '1em' }}>
                                <h4 style={{fontWeight:'bold'}}>Sabores sin stock</h4>
                                <ListStock stock={stock[0][0]} from={from} />
                                <h4 style={{fontWeight:'bold'}}>Sabores por debajo del punto de reorden</h4>
                                <ListStock stock={stock[0][1]} from={from} />
                                <h4 style={{fontWeight:'bold'}}>Sabores por arriba del punto de reorden</h4>
                                <ListStock stock={stock[0][2]} from={from} />
                            </div>
                            <div className="col-sm-3" style={{ paddingLeft: '1em' }}>
                                <TotalsStock totals={stock[1]}/>
                            </div>
                        </div>
                    </BeShowed>
                    <BeShowed show={stock[0]?.length < 1 && load}>
                        <br />
                        <div className="text-center">
                            <h4>No se encontró información de stock de sabores de helados y reabastecimiento para el período ({from?dateText(from, true, false):new Date().toLocaleDateString()})</h4>
                        </div>
                    </BeShowed>
                </BeShowed>
            </div>
        </>
    );
}

export default FlavorsStockReport;