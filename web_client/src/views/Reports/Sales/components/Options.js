import React, { useEffect , useRef} from 'react';
import { updateReportDateTo, updateReportDateFrom } from '../../../../actions/ReportsActions';
import { connect } from 'react-redux';
import dateFormat from '../../../../utils/DateFormat/dateFormat';

const Options = (props) => {

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
        dateFrom: state.dateFrom
    }
}

const mapDispatchToProps = {
    updateReportDateTo,
    updateReportDateFrom
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);