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
        if (props.dateFrom <= props.dateTo && props.load > 0) {
            let from = props.dateFrom;
            let to = props.dateTo;

            Axios.get(PORT() + `/api/salariesReport?from=${from}&to=${to}`)
                .then((res) => {
                    let data = [[],[]];
                    data[0] = res.data.res;
                    data[1] = res.data.totals;

                    props.setSalaries(data);
                    
                    if (data[0].length > 0){
                        let salaries = data[0];
                        let labelsTotalised = [];
                        let datTotalised = [];
                        let totals = [];
                        
                        data[1]?.forEach((e, i) => {
                            if (i < 3 || i === 4){
                                labelsTotalised.push(e.id);
                                datTotalised.push(e.quantity);
                                totals.push(e);
                            }
                        });

                        const totalised = {
                            type: 'outlabeledPie',
                            labels: labelsTotalised,
                            datasets: [
                            {
                                label: '$',
                                data: datTotalised,
                            },
                            ],
                            total: data[1][5].quantity
                        };
                        setMyDoc(<MyDocument user={props.user} title={"(" + dateText(props.dateFrom, true, true) + " a " + dateText(props.dateTo, true, true) + ")"} description={(!description ? '' : description)} 
                        salaries={salaries} totalisedChart={totalised} totals={totals} />);
                    }

                    props.setLoaded(true);

                })
                .catch((error) => {
                    console.log('Oops...', 'Error en el servidor', error);
                    props.setLoaded(false);
                })
        } else {
            let dat = new Date();
            let date = new Date(dat.getFullYear(), dat.getMonth() , -1);
            let dateString = dateFormat(date);

            let startDate = new Date(date.getFullYear(), date.getMonth(), 0);
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
            <div className="formRow d-flex justify-content-between">
                <label className="col-sm-5">Seleccione el rango de fechas sobre el que desea generar el informe.</label>

                <div className="search-input">
                    <div className="input-group" style={{marginLeft: 'auto'}}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Fecha desde</span>
                        </div>
                        <input  id='dateFrom'  className="form-control" type="date" defaultValue={props.dateFrom} ref={inputDateFrom} min="2021-01-01" onChange={onChangeDateFrom} ></input>
                    </div>
                </div>
                <div className="search-input">
                    <div className="input-group">
                        <div className="input-group-prepend" style={{marginLeft: 'auto'}}>
                            <span className="input-group-text" id="inputGroup-sizing-default">Fecha hasta</span>
                        </div>
                        <input type="date"  className="form-control" style={{ maxWidth: "9em"}} id='dateTo' defaultValue={props.dateTo} ref={inputDateTo} min="2021-01-01" onChange={onChangeDateTo} ></input>
                    </div>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Descripci??n adicional del reporte</label>
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
                        <button className={"btn btn-light " + (props.dateFrom > props.dateTo || !props.load  || props.salaries?.length < 1 ?"disabledNewBtn":"newBtn")} id='printButon' disabled={props.dateFrom > props.dateTo || !props.load || props.salaries?.length < 1 } style={props.dateFrom <= props.dateTo && props.load > 0 ? { minWidth: '15em' } : { minWidth: '15em', backgroundColor: 'grey' }}
                            onClick={showRenderPDF} ><FaFile /> Imprimir informe</button>
                    </BeShowed>
                </div>
            </div>
            <Viewer MyDoc={MyDoc}reportOf='salarios' showPdf={showPdf} cancel={cancel} title={"(" + !props.dateFrom?new Date().toLocaleDateString():dateText(props.dateFrom, true, true) + 
            " a " + !props.dateTo?new Date().toLocaleDateString():dateText(props.dateTo, true, true) + ")"} description={(!description ? '' : description)} ></Viewer>
        </>
    );
}

export default Options;