import React, { useEffect, useRef, useState } from 'react';
import { updateReportDateTo, updateReportDateFrom, updateProductSales, updateTopTenProductSales, updateTypeProductSales } from '../../../../actions/ReportsActions';
import { connect } from 'react-redux';
import Axios from 'axios';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import { FaAngleRight } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import dateText from '../../../../utils/DateFormat/dateText';
import BeShowed from '../../../../common/BeShowed';
import Viewer from './PDFModalViewer';
import MyDocument from './PDFProductSalesReport';

const PORT = require('../../../../config');

const Options = (props) => {
    const inputDateFrom = useRef();
    const inputDateTo = useRef();
    const [showPdf, setShowPDF] = useState(false);
    let permissionsAccess = props.permissionsAccess;
    const [MyDoc, setMyDoc] = useState('');
    const [allSales, setAllSales] = useState('');

    const inputDescriptionReport = useRef();
    const [description, setDescription] = useState(null);

    const onChangeDescriptionReport = () => setDescription(inputDescriptionReport.current.value);

    useEffect(() => {

        if (props.dateFrom <= props.dateTo && props.load > 0) {
            let from = props.dateFrom;
            let to = props.dateTo;

            Axios.get(PORT() + `/api/salesReport?from=${from}&to=${to}`)
                .then((res) => {
                    let data = res.data;
                    let aux = [];
                    let sales = [];
                    let topTen = [];
                    let type = [];
                    let labels = [];
                    let dat = [];
                    let labelsTypes = [];
                    let datTypes = [];

                    data?.forEach((e, i) => {
                        if (i < data.length - 1) {
                            sales = [...sales, e];
                            aux = [...aux, e];
                        } else {
                            props.updateTypeProductSales(e);
                            type.push(e);
                        }
                    });

                    setAllSales(aux);
                    props.updateProductSales(aux);
                    
                    sales = sales.sort((a, b) => a.quantity < b.quantity ? 1 : -1);

                    type[0].types?.forEach((e, i) => {
                        labelsTypes.push(e.id);
                        datTypes.push(e.quantity);
                    });

                    if (sales.length < 10) {
                        props.updateTopTenProductSales(sales);
                        topTen = sales;

                        sales?.forEach((e, i) => {
                                labels.push(e.name);
                                dat.push(e.quantity);
                        });

                        props.setLoaded(true);
                    } else {
                        sales?.forEach((e, i) => {
                            if (i < 10) {
                                topTen = [...topTen, e];
                                labels.push(e.name);
                                dat.push(e.quantity);
                            }
                        });
                        props.updateTopTenProductSales(topTen);

                        props.setLoaded(true);
                    }
                    
                    const top = {
                        type: 'bar',
                        labels: labels,
                        datasets: [
                        {
                            label: 'número de unidades vendidas',
                            data: dat,
                        },
                        ],
                    };
                    const types = {
                        type: 'outlabeledPie',
                        labels: labelsTypes,
                        datasets: [
                        {
                            label: 'número de ventas',
                            data: datTypes,
                        },
                        ],
                        total: type[0].total
                    };
                    setMyDoc(<MyDocument user={props.user} title={"(" + dateText(props.dateFrom, true, true) + " a " + dateText(props.dateTo, true, true) + ")"} description={(!description ? '' : description)} 
                    topChart={top} sales={aux} typesChart={types} top={topTen} types={type[0].types} />);

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
            props.updateReportDateFrom(prevMounth);
            props.updateReportDateTo(dateString);
        }

    }, [props.load, description]);

    const onChangeDateFrom = () => {
        props.setLoad(false);
        if (inputDateFrom.current.value < inputDateTo.current.value && inputDateFrom.current.value >= "2021-01-01") {
            inputDateTo.current.min = inputDateFrom.current.value;
            props.updateReportDateFrom(inputDateFrom.current.value);
        }
        else {
            props.updateReportDateFrom(inputDateTo.current.value);
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
            props.updateReportDateTo(inputDateTo.current.value);
        }
        else {
            props.updateReportDateTo(dateString);
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
                    <BeShowed show={permissionsAccess === 3}>
                        <button className="btn btn-light newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className={props.dateFrom > props.dateTo || props.load <= 0 || allSales.length <1?"btn btn-light disabledNewBtn":"btn btn-light newBtn"} id='printButon' disabled={props.dateFrom > props.dateTo || props.load <= 0 || allSales.length <1} style={props.dateFrom <= props.dateTo && props.load > 0 ? { minWidth: '15em' } : { minWidth: '15em', backgroundColor: 'grey' }}
                            onClick={showRenderPDF} ><FaFile /> Imprimir informe</button>
                    </BeShowed>
                </div>
            </div>
            <Viewer MyDoc={MyDoc} reportOf='venta de productos' showPdf={showPdf} cancel={cancel} title={"(" + dateText(props.dateFrom, true, true) + " a " + dateText(props.dateTo, true, true) + ")"} description={(!description ? '' : description)} ></Viewer>
        </>
    );
}

const mapStateToProps = state => {
    return {
        dateTo: state.dateTo,
        dateFrom: state.dateFrom,
        productSales: state.productSales,
        topTenProductSales: state.topTenProductSales,
        typeProductSales: state.typeProductSales
    }
}

const mapDispatchToProps = {
    updateReportDateTo,
    updateReportDateFrom,
    updateProductSales,
    updateTopTenProductSales,
    updateTypeProductSales
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);