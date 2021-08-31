import React, {useRef} from 'react';
import { isDeliverySupply, isFranchiseSupply } from '../../../actions/SupplyActions';
import { connect } from 'react-redux';

const ChecksSupply = (props) => {

    const inputIsDeliverySupply = useRef(null);
    const inputIsFranchiseSupply = useRef(null);
    
    const handlerOnChange = (e) => {
        if (e.target.value === "isDeliverySupply") props.isDeliverySupply(!props.deliverySupply);
        if (e.target.value === "isFranchiseSupply") props.isFranchiseSupply(!props.franchiseSupply);
    }

    return(
        <div className="formRow justify-content-sm-center">
            <div class="form-check form-check-inline col-sm-3">
                <input class="form-check-input" type="checkbox" id="isDeliverySupply" value="isDeliverySupply" ref={inputIsDeliverySupply} onChange={(e) => handlerOnChange(e)} />
                <label class="form-check-label" for="isDeliverySupply">Se envía por delivery?</label>
            </div>
            <div class="form-check form-check-inline col-sm-3">
                <input class="form-check-input" type="checkbox" id="isFranchiseSupply" value="isFranchiseSupply" ref={inputIsFranchiseSupply} onChange={(e) => handlerOnChange(e)} />
                <label class="form-check-label" for="isFranchiseSupply">Se envía a franquicias?</label>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        deliverySupply: state.deliverySupply,
        franchiseSupply: state.franchiseSupply
    }
}

const mapDispatchToProps = {
    isDeliverySupply,
    isFranchiseSupply
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecksSupply);