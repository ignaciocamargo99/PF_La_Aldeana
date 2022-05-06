import React, { useEffect, useRef, useState } from 'react';
import { updateReportDateTo, updateReportDateFrom, updateProductSales, updateTopTenProductSales, updateTypeProductSales } from '../../../../actions/ReportsActions';
import { connect } from 'react-redux';
import Axios from 'axios';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import { FaAngleRight } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import dateText from '../../../../utils/DateFormat/dateText';
import BeShowed from '../../../../common/BeShowed';
import Viewer from './PDFProductSalesReport';

const PORT = require('../../../../config');

const Options = (props) => {
    const inputDateFrom = useRef();
    const inputDateTo = useRef();
    const [showPdf, setShowPDF] = useState(false);
    let permissionsAccess = props.permissionsAccess;

    useEffect(() => {

        if (props.dateFrom <= props.dateTo && props.load > 0) {
            let from = props.dateFrom;
            let to = props.dateTo;

            Axios.get(PORT() + `/api/salesReport?from=${from}&to=${to}`)
                .then((res) => {
                    let data = res.data;
                    let sales = [];
                    let topTen = [];

                    data?.forEach((e, i) => {
                        if (i < data.length - 1) {
                            sales = [...sales, e];
                        } else {
                            props.updateTypeProductSales(e);
                        }
                    });

                    sales = sales.sort((a, b) => a.quantity < b.quantity ? 1 : -1);

                    props.updateProductSales(sales);

                    if (sales.length < 10) {
                        props.updateTopTenProductSales(sales);

                        props.setLoaded(true);
                    } else {
                        sales?.forEach((e, i) => {
                            if (i < 10) {
                                topTen = [...topTen, e];
                            }
                        });
                        props.updateTopTenProductSales(topTen);

                        props.setLoaded(true);
                    }

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

    }, [props.load]);

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

    const inputDescriptionReport = useRef();
    const [description, setDescription] = useState(null);

    const onChangeDescriptionReport = () => setDescription(inputDescriptionReport.current.value);

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
                    <BeShowed show={permissionsAccess === 3}>
                        <button className="newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className="newBtn" id='printButon' disabled={props.dateFrom > props.dateTo || props.load <= 0} style={props.dateFrom <= props.dateTo && props.load > 0 ? { minWidth: '15em' } : { minWidth: '15em', backgroundColor: 'grey' }}
                            onClick={showRenderPDF} ><FaFile /> Imprimir informe</button>
                    </BeShowed>
                </div>
            </div>
            <Viewer showPdf={showPdf} cancel={cancel} title={"(" + dateText(props.dateFrom, true, true) + " a " + dateText(props.dateTo, true, true) + ")"} description={(!description ? '' : description)} ></Viewer>
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