import React, { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import { connect } from 'react-redux';
import { updateAmountDelivery, updatePayTypeDelivery, updateErrorAmountDelivery } from '../../../actions/DeliverySalesActions';
import ModalFlavorShow from './ModalFlavorShow';
import SaleDetails from './SaleDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import '../../../assets/Buttons.css'

const Pay = (props) => {
    
    const [nameShow,setNameShow] = useState('');
    const [showDetail,setShowDeatil] = useState(false);
    const [showModalView,setShowModalView] = useState(false);

    const onChangeAmount = (amount) => {
        props.updateErrorAmountDelivery(false)
        props.updateAmountDelivery(amount)
        if(amount < props.total){
            props.updateErrorAmountDelivery(true)
        }
    }

    useEffect(() => {
        onChangeAmount(props.amount)
    },[props.total])

    return(
        <>
            <div className="formRow">
                <h3><b>Pago</b></h3>
                </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Tipo de pago* </label>
                </div>
                <div className="form-control-input">
                    <select className="form-control" style={{fontFamily:'abel'}} readOnly>
                        <option selected>{props.payType}</option>
                    </select>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Monto a abonar por el cliente*</label>
                </div>
                <div className="form-control-input">
                    <input type="number" className={props.errorAmount?"form-control":"form-control is-valid"} placeholder="Ingrese el monto con el que abona el cliente..." onChange={(e) => {onChangeAmount(e.target.value)}} value={props.amount}></input>
                    <BeShowed show={props.errorAmount}>
                        <label><b style={{color:'gray'}}>Cantidad entera mayor al total</b></label>
                    </BeShowed>
                </div>
            </div>
            <BeShowed show={!props.errorAmount}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label>Vuelto para el cliente: <b>${props.amount - props.total}</b></label>
                    </div>
                </div>
            </BeShowed>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Total: <b>${props.total}</b></label>
                </div>
            </div>
            <div className="formRow">
                <label>Mostrar detalle de la venta</label>&nbsp;
                <button style={{width: '7%',height: '5%'}} className="sendNew" onClick={() => {setShowDeatil(!showDetail)}}> 
                    <FontAwesomeIcon icon={faInfo}/>
                </button>
            </div>
            <BeShowed show={showDetail}>
                <h3 style={{textAlign: 'center'}}><b>Detalle de venta</b></h3>
                <SaleDetails buttons={false} setNameShow={setNameShow} setShowModalView={setShowModalView}/>
                <ModalFlavorShow show={showModalView} setShowModalShow={setShowModalView} productName={nameShow} flavorsToView={props.flavorsProduct}/>
            </BeShowed>
        </>
    )
}

const mapStateToProps = state => {
    return {
        payType: state.payTypeDelivery,
        amount: state.amountDelivery,
        total: state.totalDelivery,
        errorAmount: state.errorAmountDelivery,
        total: state.totalDelivery,
        flavorsProduct: state.flavorsProductDelivery
    }
}

const mapDispatchToProps = {
    updateAmountDelivery,
    updatePayTypeDelivery,
    updateErrorAmountDelivery
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay);