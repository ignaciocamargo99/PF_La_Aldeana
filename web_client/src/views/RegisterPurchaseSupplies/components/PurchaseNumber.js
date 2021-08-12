import React, { useEffect , useRef} from 'react';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import { connect } from 'react-redux';
import axios from 'axios';
import { updatePurchaseNumber , updatePurchaseDate } from '../../../actions/PurchaseSuppliesActions';
import { Spinner } from 'reactstrap';
import BeShowed from '../../../common/BeShowed';

const PORT = require('../../../config');

const PurchaseNumber = (props) => {

    const inputDate = useRef()

    useEffect(()=>{
        let date = new Date()
        let dateString = dateFormat(date)
        inputDate.current.max = dateString
        props.updatePurchaseDate(dateString)
        axios.get(PORT() + `/api/purchase/last`)
        .then((respone) => {
            if(respone.data[0].last_number !== null){
                props.updatePurchaseNumber(respone.data[0].last_number + 1)
            }else{
                props.updatePurchaseNumber(1)
            }
        })
        .catch((err) => console.log(err))
    },[true])


    const onChangeDate = () => {
        let date = new Date()
        let dateString = dateFormat(date)
        if(inputDate.current.value > dateString || inputDate.current.value < "2021-01-01"){
            props.updatePurchaseDate(dateString)
            inputDate.current.value = dateString
        }
        else{
            props.updatePurchaseDate(inputDate.current.value)
        }
    }

    return(
        <div className="formRow">
            <div className="form-control-label offset-sm-9">
                <BeShowed show={props.purchaseNumber === null}> 
                    <Spinner size="sm" color="secondary" /><label htmlFor="purchaseNumber" className="col-sm-4">...&nbsp;</label>
                </BeShowed>
                <BeShowed show={props.purchaseNumber !== null}>
                    <label htmlFor="purchaseNumber" className="col-sm-6">Compra N° {props.purchaseNumber} &nbsp;</label>
                </BeShowed>
                <input type="date" id='PurchaseDate' className="col-sm-6" defaultValue={props.purchaseDate} ref={inputDate} min="2021-01-01" onChange={onChangeDate}></input>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        purchaseNumber: state.purchaseNumber,
        purchaseDate: state.purchaseDate
    }
}

const mapDispatchToProps = {
    updatePurchaseNumber,
    updatePurchaseDate
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseNumber);