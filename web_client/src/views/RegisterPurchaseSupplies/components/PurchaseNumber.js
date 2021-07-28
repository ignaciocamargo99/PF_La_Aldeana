import React, { useEffect , useRef} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updatePurchaseNumber , updatePurchaseDate } from '../../../actions/PurchaseSuppliesActions';

const PORT = require('../../../config');

const PurchaseNumber = (props) => {

    const inputDate = useRef()

    useEffect(()=>{
        let date = new Date()
        let dateString = `${date.getFullYear()}-${date.getMonth()>=9?date.getMonth()+1:'0'+ (date.getMonth()+1)}-${date.getDate()}`
        inputDate.current.max = dateString
        props.updatePurchaseDate(dateString)
        axios.get(PORT() + `/api/purchase/last`)
        .then((respone) => {
            if(respone.data[0].last_number !== null){
                props.updatePurchaseNumber(respone.data[0].last_number + 1)
            }
        })
        .catch((err) => console.log(err))
    },[true === false])


    const onChangeDate = () => {
        let date = new Date()
        let dateString = `${date.getFullYear()}-${date.getMonth()>=9?date.getMonth()+1:'0'+ (date.getMonth()+1)}-${date.getDate()}`
        if(inputDate.current.value > dateString){
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
                <label htmlFor="purchaseNumber" className="col-sm-6">Compra N° {props.purchaseNumber} &nbsp;</label>
                <input type="date" id='PurchaseDate' className="col-sm-6" defaultValue={props.purchaseDate} ref={inputDate} onChange={onChangeDate}></input>
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