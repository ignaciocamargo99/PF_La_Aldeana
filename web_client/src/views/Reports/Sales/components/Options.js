import React, { useEffect , useRef, useState} from 'react';
import { updateReportDateTo, updateReportDateFrom, updateProductSales, updateTopTenProductSales, updateTypeProductSales } from '../../../../actions/ReportsActions';
import { connect } from 'react-redux';
import Axios from 'axios';
import dateFormat from '../../../../utils/DateFormat/dateFormat';

const PORT = require('../../../../config');

const Options = (props) => {
    let [data, setData] = useState({})

    const inputDateFrom = useRef()
    const inputDateTo = useRef()

    useEffect(()=>{
        let date = new Date()
        let dateString = dateFormat(date)
        inputDateFrom.current.max = dateString
        inputDateTo.current.max = dateString
        props.updateReportDateFrom(dateString)
        props.updateReportDateTo(dateString)
    },[true])

    useEffect(()=>{
        inputDateFrom.current.max = props.dateTo

        if (props.dateFrom < props.dateTo) {
            let dates = {from: props.dateFrom, to: props.dateTo };
            let date = JSON.stringify(dates);

            Axios.get(PORT() + `/api/salesReport/${date}`)
                .then((res) => {
                    let data = res.data
                    let sales = []
                    let topTen = []
                
                    data?.map((e, i)=>{
                        if (i < data.length -1){
                            sales = [...sales, e]
                        } else {
                            props.updateTypeProductSales(e)
                        }
                    })
                
                    sales = sales.sort((a,b) => a.quantity < b.quantity ? 1 : -1)
                
                    props.updateProductSales(sales)
                
                    if (sales.length < 10) {
                        props.updateTopTenProductSales(sales)
                    } else {
                        sales?.map((e, i)=>{
                            if (i < 10){
                                topTen = [...topTen, e]
                            }
                        })
                        props.updateTopTenProductSales(topTen)
                    }
                    })
                .catch((error) => {
                    console.log('Oops...','Error en el servidor',error)
                })
        } else {
            props.updateReportDateFrom(props.dateTo)
        }

    },[props.dateFrom, props.dateTo])

    const onChangeDateFrom = () => {
        let date = new Date()
        let dateString = dateFormat(date)
        if(inputDateFrom.current.value > dateString || inputDateFrom.current.value < "2021-01-01"){
            props.updateReportDateFrom(dateString)
            inputDateFrom.current.value = dateString
        }
        else{
            props.updateReportDateFrom(inputDateFrom.current.value)
        }
    }

    const onChangeDateTo = () => {
        let date = new Date()
        let dateString = dateFormat(date)
        if(inputDateTo.current.value > dateString || inputDateTo.current.value < "2021-01-01"){
            props.updateReportDateTo(dateString)
            inputDateTo.current.value = dateString
        }
        else{
            props.updateReportDateTo(inputDateTo.current.value)
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