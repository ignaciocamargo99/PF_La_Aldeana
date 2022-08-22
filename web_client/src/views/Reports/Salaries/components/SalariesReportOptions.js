import Axios from 'axios';

import BeShowed from 'common/BeShowed';

import { useState } from 'react';
import { FaAngleRight, FaFile } from 'react-icons/fa';

import warningMessage from 'utils/WarningMessages/warningMessage';

import Viewer from '../../ProductSales/components/PDFModalViewer';
import DateRange from './DateRange';
import getSalariesRangeTitle from './getSalariesRangeTitle';
import MyDocument from './PDFSalariesReport';

const PORT = require('../../../../config');

const SalariesReportOptions = (props) => {
    const [showPdf, setShowPDF] = useState(false);
    const [description, setDescription] = useState('');
    const [MyDoc, setMyDoc] = useState(<MyDocument />);

    const [documentData, setDocumentData] = useState({
        salaries: [],
        title: '',
        totalisedChart: {},
        totals: [],
    })

    let permissionsAccess = props.permissionsAccess;

    const handleDescriptionOnChange = (e) => {
        const newDescription = e.target.value;

        setDescription(newDescription);
    }

    const showRenderPDF = () => {
        const { salaries, title, totalisedChart, totals } = documentData;

        setDataToMyDoc(description, salaries, title, totalisedChart, totals, props.user);

        setShowPDF(true);
    };

    const cancel = () => setShowPDF(false);

    const setDataToMyDoc = (description, salaries, title, totalisedChart, totals, user) => {
        setMyDoc(
            <MyDocument
                description={description}
                salaries={salaries}
                title={title}
                totalisedChart={totalisedChart}
                totals={totals}
                user={user}
            />
        );
    }

    const handlerLoader = () => {
        props.setReportLoaded(false)
        props.setShowReportSection(true)

        Axios.get(PORT() + `/api/salariesReport?from=${props.dateFrom}&to=${props.dateTo}`)
            .then((res) => {
                let data = [[], []];
                data[0] = res.data.res;
                data[1] = res.data.totals;

                props.setSalaries(data);

                if (data[0].length > 0) {
                    let salaries = data[0];
                    let labelsTotalised = [];
                    let datTotalised = [];
                    let totals = [];

                    data[1]?.forEach((e, i) => {
                        if (i < 3 || i === 4) {
                            labelsTotalised.push(e.id);
                            datTotalised.push(e.quantity);
                            totals.push(e);
                        }
                    });

                    const totalised = {
                        type: 'doughnut',
                        labels: labelsTotalised,
                        datasets: [
                            {
                                label: '$',
                                data: datTotalised,
                            },
                        ],
                        total: data[1][5].quantity,
                        legend: true
                    };

                    setDocumentData({
                        salaries: salaries,
                        title: getSalariesRangeTitle(props.dateFrom, props.dateTo),
                        totalisedChart: totalised,
                        totals: totals,
                    })
                }

                props.setReportLoaded(true);
            })
            .catch((error) => {
                props.setShowReportSection(false);
                warningMessage('Error', 'Error en el servidor', 'error');
            })
    };

    return (
        <>
            <DateRange
                dateFrom={props.dateFrom}
                dateTo={props.dateTo}
                setDateFrom={props.setDateFrom}
                setDateTo={props.setDateTo}
                setShowReportSection={props.setShowReportSection}
                showReportSection={props.showReportSection}
            />
            <div className="formRow">
                <div className="form-control-label">
                    <label>Descripción adicional del reporte:</label>
                </div>
                <div className="form-control-input">
                    <input
                        className="form-control"
                        type="text"
                        maxLength="120"
                        value={description}
                        onChange={handleDescriptionOnChange}
                    />
                </div>
            </div>
            <div className="formRow d-flex justify-content-between">
                <div className="mx-auto">
                    <BeShowed show={permissionsAccess === 1 || permissionsAccess === 2}>
                        <button className="btn btn-light newBtn" style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className="btn btn-light disabledNewBtn" style={{ marginRight: '1em', minWidth: '15em' }} id='printButon' disabled><FaFile /> Imprimir informe</button>
                    </BeShowed>
                    <BeShowed show={permissionsAccess === 3 || permissionsAccess === 'Reportes Recursos Humanos'}>
                        <button className="btn btn-light newBtn" style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button
                            className={"btn btn-light " + (props.dateFrom > props.dateTo || !props.showReportSection || props.salaries?.length < 1 ? "disabledNewBtn" : "newBtn")}
                            id='printButon'
                            disabled={(!props.reportLoaded) || props.dateFrom > props.dateTo || !props.showReportSection || props.salaries?.length < 1}
                            style={props.dateFrom <= props.dateTo && props.showReportSection > 0 ? { minWidth: '15em' } : { minWidth: '15em', backgroundColor: 'grey' }}
                            onClick={showRenderPDF} ><FaFile /> Imprimir informe</button>
                    </BeShowed>
                </div>
            </div>
            <Viewer
                MyDoc={MyDoc}
                cancel={cancel}
                description={description}
                title={documentData.title}
                reportOf='salarios'
                showPdf={showPdf}
            ></Viewer>
        </>
    );
}

export default SalariesReportOptions;