import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import { FaAngleRight } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import dateText from '../../../../utils/DateFormat/dateText';
import BeShowed from '../../../../common/BeShowed';
import Viewer from '../../ProductSales/components/PDFModalViewer';
import MyDocument from './PDFConsuptionsReport';
import warningMessage from 'utils/WarningMessages/warningMessage';
import { calculateDiferenceDays } from 'utils/DiferenceDate/calculateDiferenceDays';

const PORT = require('../../../../config');
const Options = (props) => {
    const inputDateFrom = useRef();
    const inputDateTo = useRef();
    const [showPdf, setShowPDF] = useState(false);
    let permissionsAccess = props.permissionsAccess;
    const [MyDoc, setMyDoc] = useState('');

    const inputDescriptionReport = useRef();
    const [description, setDescription] = useState(null);

    const onChangeDescriptionReport = () => setDescription(inputDescriptionReport.current.value);

    useEffect(() => {
        let from = props.dateFrom;
        let to = props.dateTo;
        if(props.dateFrom instanceof String) from = new Date(props.dateFrom + '-01');
        if(props.dateTo instanceof String) to = new Date(props.dateTo + '-01');
        if (props.dateFrom <= props.dateTo && props.load > 0) {

            Axios.get(PORT() + `/api/consuptionsReport?from=${from}&to=${to}`)
                .then((res) => {
                    let data = [[],[]];
                    data[0] = res.data.res;
                    data[1] = res.data.totals;
                    data[2] = res.data.months;

                    props.setConsuptions(data);
                    
                    if (data[0].length > 0){
                        let consuptions = data;
                        let labelsTotalised = [];
                        let datTotalised = [];
                        let totals = [];
                        let months = [];
                        let labels = [];
                        let dat = [];
                        let othersDat = [];
                        let consum = [];

                        data[2]?.forEach((e, i) => {
                            labels.push(e.month.slice(0,-3));
                            dat.push(e.consum);
                            othersDat.push(e.prod);
                            totals.push({month: e.month.slice(0,-3), consum: e.consum, prod: e.prod})
                        });
                        
                        data[0]?.forEach((e, i) => {
                            labelsTotalised.push(e.name);
                            datTotalised.push(e.prod);
                            consum.push(e.consum)
                            months.push(e);
                        });
                        const bar = {
                            type: 'horizontalBar',
                            labels: labels,
                            datasets: [
                            {
                                label: 'baldes producidos',
                                data: othersDat,
                            },
                            {
                                label: 'baldes consumidos',
                                data: dat,
                            },
                            ],
                        };

                        const totalised = {
                            type: 'outlabeledPie',
                            labels: labelsTotalised,
                            datasets: [
                            {
                                label: 'baldes',
                                data: datTotalised,
                            },
                            ],
                            total: data[1][0].quantity
                        };

                        const totalisedConsum = {
                            type: 'outlabeledPie',
                            labels: labelsTotalised,
                            datasets: [
                            {
                                label: 'baldes',
                                data: consum,
                            },
                            ],
                            total: data[1][1].quantity
                        };
                        setMyDoc(<MyDocument user={props.user} title={"(" + dateText(props.dateFrom+ '-01', false, true) + " a " + dateText(props.dateTo+ '-01', false, true) + ")"} description={(!description ? '' : description)} 
                        consuptions={consuptions} totalisedChart={totalised} totals={totals} months={months} bar={bar} totalisedConsum={totalisedConsum} />);
                    }

                    props.setLoaded(true);

                })
                .catch((error) => {
                    props.setLoad(0);
                    console.log('Oops...', 'Error en el servidor', error);
                    props.setLoaded(true);
                    warningMessage('Error', 'Error en el servidor', 'error');
                })
        } else {
            let date = new Date();
            let dateString = dateFormat(date);

            let startDate = new Date(date.getFullYear(), date.getMonth(), 0);
            let minDate = new Date(date.getFullYear(), date.getMonth(), -364);
            minDate = dateFormat(minDate).slice(0,-3);
            let prevMounth = dateFormat(startDate).slice(0,-3);
            dateString = dateString.slice(0, -3);
            console.log(dateString, prevMounth)

            inputDateFrom.current.max = dateString;
            inputDateTo.current.max = dateString;
            inputDateFrom.current.min = minDate;
            inputDateTo.current.min = prevMounth;
            inputDateTo.current.value = dateString;
            inputDateFrom.current.value = prevMounth;
            props.setFrom(prevMounth);
            props.setTo(dateString);
        }

    }, [props.load, description]);

    const onChangeDateFrom = () => {
        props.setLoad(false);
        if (inputDateFrom.current.value < inputDateTo.current.value && inputDateFrom.current.value >= "2021-01" && calculateDiferenceDays(inputDateFrom.current.value +'-01', inputDateTo.current.value +'-01') <= 366) {
            let maxDate = new Date(parseInt(inputDateFrom.current.value.slice(0,-3))+1, parseInt(inputDateFrom.current.value.slice(5)) -1, 1);
            if (maxDate > new Date()) maxDate = new Date();
            maxDate = dateFormat(maxDate).slice(0,-3);
            console.log(maxDate);
            inputDateTo.current.max = maxDate;
            inputDateTo.current.min = inputDateFrom.current.value;
            props.setFrom(inputDateFrom.current.value);
        }
        else {
            props.setFrom(inputDateTo.current.value);
            inputDateFrom.current.value = inputDateTo.current.value;
        }
    }

    const showRenderPDF = () => {
        setShowPDF(true);
    }

    const cancel = () => {
        setShowPDF(false);
    }

    const onChangeDateTo = () => {
        let date = new Date();
        let dateString = dateFormat(date);
        props.setLoad(false);
        if (inputDateTo.current.value >= "2021-01" && inputDateTo.current.value < dateString && calculateDiferenceDays(inputDateFrom.current.value +'-01', inputDateTo.current.value +'-01') <= 366) {
            let minDate = new Date(parseInt(inputDateTo.current.value.slice(0,-3))-1, parseInt(inputDateTo.current.value.slice(5)) -1, 1);
            minDate = dateFormat(minDate).slice(0,-3);
            inputDateFrom.current.min = minDate;
            console.log(minDate);
            inputDateFrom.current.max = inputDateTo.current.value;
            props.setTo(inputDateTo.current.value);
        }
        else {
            props.setTo(dateString);
            inputDateTo.current.value = dateString;
        }
    }

    const handlerLoader = () => props.setLoad(true);

    return (
        <>
            <div className="formRow d-flex justify-content-between">
                <label className="col-sm-5">Seleccione el rango de fechas sobre el que desea generar el informe.</label>

                <div className="search-input">
                    <div className="input-group" style={{marginLeft: 'auto'}}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Fecha desde</span>
                        </div>
                        <input  id='dateFrom'  className="form-control" type="month" defaultValue={props.dateFrom} ref={inputDateFrom} min="2021-01" onChange={onChangeDateFrom} ></input>
                    </div>
                </div>
                <div className="search-input">
                    <div className="input-group">
                        <div className="input-group-prepend" style={{marginLeft: 'auto'}}>
                            <span className="input-group-text" id="inputGroup-sizing-default">Fecha hasta</span>
                        </div>
                        <input type="month"  className="form-control" style={{ maxWidth: "9em"}} id='dateTo' defaultValue={props.dateTo} ref={inputDateTo} min="2021-01" onChange={onChangeDateTo} ></input>
                    </div>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Descripción adicional del reporte</label>
                </div>
                <div className="form-control-input">
                    <input className="form-control" type="text" id='descriptionReport' maxLength="120" ref={inputDescriptionReport} onChange={onChangeDescriptionReport} />
                </div>
            </div>
            <div className="formRow d-flex justify-content-between">
                <div className="mx-auto">
                    <BeShowed show={permissionsAccess === 1 || permissionsAccess === 2}>
                        <button className="btn btn-light newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className="btn btn-light disabledNewBtn" style={{ marginRight: '1em', minWidth: '15em' }} id='printButon' disabled><FaFile /> Imprimir informe</button>
                    </BeShowed>
                    <BeShowed show={permissionsAccess === 3 || permissionsAccess === 'Reportes Recursos Humanos'}>
                        <button className="btn btn-light newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className={"btn btn-light " + (props.dateFrom > props.dateTo || !props.load  || props.consuptions?.length < 1 ?"disabledNewBtn":"newBtn")} id='printButon' disabled={props.dateFrom > props.dateTo || !props.load || props.consuptions?.length < 1 } style={props.dateFrom <= props.dateTo && props.load > 0 ? { minWidth: '15em' } : { minWidth: '15em', backgroundColor: 'grey' }}
                            onClick={showRenderPDF} ><FaFile /> Imprimir informe</button>
                    </BeShowed>
                </div>
            </div>
            <Viewer MyDoc={MyDoc}reportOf='producción y consumo de baldes de sabores de helados' showPdf={showPdf} cancel={cancel} title={"(" + !props.dateFrom?new Date().toLocaleDateString():dateText(props.dateFrom+ '-01', false, true) + 
            " a " + !props.dateTo?new Date().toLocaleDateString():dateText(props.dateTo+ '-01', false, true) + ")"} description={(!description ? '' : description)} ></Viewer>
        </>
    );
}

export default Options;