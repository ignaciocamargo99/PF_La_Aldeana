import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import { FaAngleRight } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import dateText from '../../../../utils/DateFormat/dateText';
import BeShowed from '../../../../common/BeShowed';
import Viewer from '../../ProductSales/components/PDFModalViewer';
import MyDocument from './PDFSalariesReport';

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
console.log(props.dateFrom , props.dateTo , props.load)
        if (props.dateFrom <= props.dateTo && props.load > 0) {
            let from = props.dateFrom;
            let to = props.dateTo;

            Axios.get(PORT() + `/api/salariesReport?from=${from}&to=${to}`)
                .then((res) => {
                    let data = [[],[]];
                    data[0] = res.data.res;
                    data[1] = res.data.totals;
                    console.log(data[0].length )
                    if (data[0].length > 0){
                        let salaries = data[0];
                        let labelsTotalised = [];
                        let datTotalised = [];
                        let totals = [];

                        props.setSalaries(data);
                        
                        data[1]?.forEach((e, i) => {
                            if (i < 6){
                                labelsTotalised.push(e.id);
                                datTotalised.push(e.quantity);
                                totals.push(e);
                            }
                        });

                        const totalised = {
                            type: 'pie',
                            labels: labelsTotalised,
                            datasets: [
                            {
                                label: '$',
                                data: datTotalised,
                            },
                            ],
                            total: data[1][5].quantity
                        };
                        setMyDoc(<MyDocument title={"(" + dateText(props.dateFrom, true, true) + " a " + dateText(props.dateTo, true, true) + ")"} description={(!description ? '' : description)} 
                        salaries={salaries} totalisedChart={totalised} totals={totals} />);
                    }

                    props.setLoaded(true);

                })
                .catch((error) => {
                    console.log('Oops...', 'Error en el servidor', error);
                    props.setLoaded(false);
                })
        } else {
            let date = new Date();
            let dateString = dateFormat(date);

            let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            let prevMounth = dateFormat(startDate);

            inputDateFrom.current.max = dateString;
            inputDateTo.current.max = dateString;
            inputDateFrom.current.min = '2021-01-01';
            inputDateTo.current.min = prevMounth;
            inputDateTo.current.value = dateString;
            inputDateFrom.current.value = prevMounth;
            props.setFrom(prevMounth);
            props.setTo(dateString);
        }

    }, [props.load, description]);

    const onChangeDateFrom = () => {
        props.setLoad(false);
        if (inputDateFrom.current.value < inputDateTo.current.value && inputDateFrom.current.value >= "2021-01-01") {
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
        if (inputDateTo.current.value >= "2021-01-01" && inputDateTo.current.value < dateString) {

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
            <div className="formRow">
                <label>Seleccione el rango de fechas sobre el que desea generar el informe.</label>
            </div>
            <div className="formRow d-flex justify-content-between">
                <label htmlFor="dateFrom" className="col-sm-2">Fecha desde*</label>
                <div className="col-sm-3" style={{ textAlign: 'right' }} >
                    <input type="date" style={{ maxWidth: "9em", marginRight: '1em' }} id='dateFrom' defaultValue={props.dateFrom} ref={inputDateFrom} min="2021-01-01" onChange={onChangeDateFrom} ></input>
                </div>

                <label htmlFor="dateTo" className="col-sm-2">Fecha hasta*</label>
                <div className="col-sm-3" style={{ textAlign: 'right' }} >
                    <input type="date" style={{ maxWidth: "9em", marginRight: '1em' }} id='dateTo' defaultValue={props.dateTo} ref={inputDateTo} min="2021-01-01" onChange={onChangeDateTo} ></input>
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
                        <button className="newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className="disabledNewBtn" style={{ marginRight: '1em', minWidth: '15em' }} id='printButon' disabled><FaFile /> Imprimir informe</button>
                    </BeShowed>
                    <BeShowed show={permissionsAccess === 3 || permissionsAccess === 'Reportes Recursos Humanos'}>
                        <button className="newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className="newBtn" id='printButon' disabled={props.dateFrom > props.dateTo || props.load <= 0} style={props.dateFrom <= props.dateTo && props.load > 0 ? { minWidth: '15em' } : { minWidth: '15em', backgroundColor: 'grey' }}
                            onClick={showRenderPDF} ><FaFile /> Imprimir informe</button>
                    </BeShowed>
                </div>
            </div>
            <Viewer MyDoc={MyDoc} showPdf={showPdf} cancel={cancel} title={"(" + !props.dateFrom?new Date().toLocaleDateString():dateText(props.dateFrom, true, true) + 
            " a " + !props.dateTo?new Date().toLocaleDateString():dateText(props.dateTo, true, true) + ")"} description={(!description ? '' : description)} ></Viewer>
        </>
    );
}

export default Options;