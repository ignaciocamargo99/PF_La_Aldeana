import React, { useEffect , useRef } from 'react';
import { updateReportDateTo, updateReportDateFrom, updateProductSales, updateTopTenProductSales, updateTypeProductSales } from '../../../../actions/ReportsActions';
import { connect } from 'react-redux';
import Axios from 'axios';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import {FaAngleRight} from 'react-icons/fa';
import {FaFile} from 'react-icons/fa';

const PORT = require('../../../../config');

const Options = (props) => {

    const inputDateFrom = useRef();
    const inputDateTo = useRef();

    useEffect(()=>{

        if (props.dateFrom <= props.dateTo && props.load > 0) {
            let from = props.dateFrom;
            let to = props.dateTo;

            Axios.get(PORT() + `/api/salesReport?from=${from}&to=${to}`)
                .then((res) => {
                    let data = res.data;
                    let sales = [];
                    let topTen = [];
                
                    data?.forEach((e, i)=>{
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

                        props.setLoaded(true);
                    } else {
                        sales?.forEach((e, i)=>{
                            if (i < 10){
                                topTen = [...topTen, e];
                            }
                        });
                        props.updateTopTenProductSales(topTen);

                        props.setLoaded(true);
                    }

                    })
                .catch((error) => {
                    console.log('Oops...','Error en el servidor',error);
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
            console.log(props.dateTo +' '+ props.dateFrom);
        }

    },[props.load]);

    const onChangeDateFrom = () => {
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

    const handlerLoader = () => props.setLoad(props.load + 1);

    return (
        <>

            <div className="formRow">
                <label>Seleccione el rango de fechas sobre el que desea generar el informe.</label>
            </div>
            <div className="formRow d-flex justify-content-between">
                
                <label htmlFor="dateFrom" className="col-sm-2">Fecha desde*</label>
                <div  className="col-sm-3" style={{textAlign: 'right'}} >
                    <input type="date" style={{maxWidth: "9em", marginRight: '1em'}} id='dateFrom' defaultValue={props.dateFrom} ref={inputDateFrom} min="2021-01-01" onChange={onChangeDateFrom} ></input>
                </div>

                <label htmlFor="dateTo" className="col-sm-2">Fecha hasta*</label>
                <div  className="col-sm-3" style={{textAlign: 'right'}} >
                    <input type="date" style={{maxWidth: "9em", marginRight: '1em'}} id='dateTo' defaultValue={props.dateTo} ref={inputDateTo} min="2021-01-01" onChange={onChangeDateTo} ></input>
                </div>
            </div>

            <div className="formRow d-flex justify-content-between">
                <div className="mx-auto">
                    <button className="sendAdd" style={{ marginRight: '1em', minWidth: '15em'}} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                    <button className="sendAdd" style={{ minWidth: '15em'}}><FaFile /> Imprimir informe</button>
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