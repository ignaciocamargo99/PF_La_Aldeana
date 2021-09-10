import React, { useEffect , useRef, useState} from 'react';
import { updateReportDateTo, updateReportDateFrom, updateProductSales, updateTopTenProductSales, updateTypeProductSales } from '../../../../actions/ReportsActions';
import { connect } from 'react-redux';
import Axios from 'axios';
import dateFormat from '../../../../utils/DateFormat/dateFormat';

const PORT = require('../../../../config');

const Options = (props) => {

    const inputDateFrom = useRef();
    const inputDateTo = useRef();

    useEffect(()=>{
        let date = new Date();
        let dateString = dateFormat(date);
        inputDateFrom.current.max = dateString;
        inputDateTo.current.max = dateString;
        inputDateFrom.current.min = '2021-01-01';
        inputDateTo.current.min = '2021-01-01';
        inputDateTo.current.value = dateString;
        inputDateFrom.current.value = '2021-01-01';
        props.updateReportDateFrom('2021-01-01');
        props.updateReportDateTo(dateString);
    },[true])

    useEffect(()=>{
        console.log(inputDateFrom.current.value + ' '+ props.dateFrom);
        console.log(inputDateTo.current.value + ' '+ props.dateTo);

        if (props.dateFrom <= props.dateTo) {
            let from = props.dateFrom;
            let to = props.dateTo;

            Axios.get(PORT() + `/api/salesReport?from=${from}&to=${to}`)
                .then((res) => {
                    let data = res.data;
                    let sales = [];
                    let topTen = [];
                
                    data?.map((e, i)=>{
                        if (i < data.length -1){
                            sales = [...sales, e];
                        } else {
                            props.updateTypeProductSales(e);
                        }
                    });
                
                    sales = sales.sort((a,b) => a.quantity < b.quantity ? 1 : -1);
                
                    props.updateProductSales(sales);
                
                    if (sales.length < 10) {
                        props.updateTopTenProductSales(sales);
                    } else {
                        sales?.map((e, i)=>{
                            if (i < 10){
                                topTen = [...topTen, e];
                            }
                        });
                        props.updateTopTenProductSales(topTen);
                    }
                    })
                .catch((error) => {
                    console.log('Oops...','Error en el servidor',error);
                })
        } else {
            inputDateFrom.current.value = inputDateTo.current.value;
            props.updateReportDateFrom(props.dateTo);
        }

    },[props.dateFrom, props.dateTo]);

    const onChangeDateFrom = () => {
        let date = new Date();
        let dateString = dateFormat(date);
        if(inputDateFrom.current.value < inputDateTo.current.value && inputDateFrom.current.value >= "2021-01-01"){
            inputDateTo.current.min = inputDateFrom.current.value;
            props.updateReportDateFrom(inputDateFrom.current.value);
        }
        else{
            props.updateReportDateFrom(inputDateTo.current.value);
            inputDateFrom.current.value = inputDateTo.current.value;
        }
    }

    const onChangeDateTo = () => {
        let date = new Date();
        let dateString = dateFormat(date);
        if(inputDateTo.current.value >= "2021-01-01" && inputDateTo.current.value < dateString){

            inputDateFrom.current.max = inputDateTo.current.value;
            props.updateReportDateTo(inputDateTo.current.value);
        }
        else{
            props.updateReportDateTo(dateString);
            inputDateTo.current.value = dateString;
        }
    }

    return (
        <>

            <div className="formRow">
                <label>Seleccione el rango de fechas sobre el que desea generar el informe.</label>
            </div>
            <div className="formRow">
                <label htmlFor="dateFrom" className="col-sm-4">Fecha desde*</label>
                <div  className="col-sm-2" >
                    <input type="date" style={{minWidth: "10em"}} id='dateFrom' defaultValue={props.dateFrom} ref={inputDateFrom} min="2021-01-01" onChange={onChangeDateFrom} ></input>
                </div>

                <label htmlFor="dateTo" className="col-sm-4">Fecha hasta*</label>
                <div  className="col-sm-2" >
                    <input type="date" style={{minWidth: "10em"}} id='dateTo' defaultValue={props.dateTo} ref={inputDateTo} min="2021-01-01" onChange={onChangeDateTo} ></input>
                </div>
            </div>
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