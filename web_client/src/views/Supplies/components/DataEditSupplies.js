import React, { useRef, useState, useEffect } from 'react';
import NameSupply from 'views/RegisterSupply/components/NameSupply';
import DescriptionSupply from 'views/RegisterSupply/components/DescriptionSupply';
import SinglePrice from 'views/RegisterSupply/components/SinglePrice';
import MultiplePrice from 'views/RegisterSupply/components/MultiplePrice';
import TypeSupply from 'views/RegisterSupply/components/TypeSupply';
import Stock from 'views/RegisterSupply/components/Stock';
import BeShowed from 'common/BeShowed'
import { connect } from 'react-redux';

const DataEditSupplies = ({ data, load, ...props }) => {
    const inputIsDeliverySupply = useRef(null);
    const inputIsFranchiseSupply = useRef(null);
    const [isDelivery, setIsDelivery] = useState();
    const [isFranchise, setIsFranchise] = useState();
    const [priceRetail, setPriceRetail] = useState();
    const [priceWholesale, setPriceWholesale] = useState();

    const onChangeChkBoxDelivery = (e) => {
        if (!e.target.checked) {
            setIsDelivery(false);
            data.price_retail = null;
            data.chkb_price_retail = false;
            load(data);
        }
        else {
            setIsDelivery(true);
            data.chkb_price_retail = true;
            load(data)
        }
    }

    const onChangeChkBoxFranchise = (e) => {
        if (!e.target.checked) {
            setIsFranchise(false);
            data.price_wholesale = null;
            data.chkb_price_wholesale = false
            load(data);
        }
        else {
            setIsFranchise(true);
            data.chkb_price_wholesale = true;
            load(data);
        }
    }

    useEffect(() => {
        setPriceRetail(data.price_retail);
        setPriceWholesale(data.price_wholesale)
        if (data.price_retail && data.price_wholesale) {
            inputIsFranchiseSupply.current.checked = true;
            inputIsDeliverySupply.current.checked = true;
            data.chkb_price_retail = true
            data.chkb_price_wholesale = true
            setIsDelivery(true);
            setIsFranchise(true);
        }
        else if (data.price_retail) {
            inputIsFranchiseSupply.current.checked = false;
            inputIsDeliverySupply.current.checked = true;
            data.chkb_price_retail = true
            data.chkb_price_wholesale = false
            setIsDelivery(true);
            setIsFranchise(false);
        }

        else if (data.price_wholesale) {
            inputIsFranchiseSupply.current.checked = true;
            inputIsDeliverySupply.current.checked = false;
            data.chkb_price_retail = false
            data.chkb_price_wholesale = true
            setIsDelivery(false);
            setIsFranchise(true);
        }
        else {
            inputIsFranchiseSupply.current.checked = false;
            inputIsDeliverySupply.current.checked = false;
            data.chkb_price_retail = false
            data.chkb_price_wholesale = false
            setIsDelivery(false);
            setIsFranchise(false);
        }
    }, [])

    return (
        <>
            <NameSupply data={data} load={(childData) => load(childData)} />
            <DescriptionSupply data={data} load={(childData) => load(childData)} />
            <div className="price-form-body ">
                <div className="price-title">
                    <label >Precio</label>
                </div>
                <div className="price-container" style={{ marginBottom: '12px' }}>
                    <div className="form-check form-check-inline col-sm-3" style={{ alignSelf: 'center' }}>
                        <input className="form-check-input" type="checkbox" id="isDeliverySupply" defaultValue={priceRetail} ref={inputIsDeliverySupply} onChange={(e) => onChangeChkBoxDelivery(e)} />
                        <label className="price-type-label price-label" htmlFor="isDeliverySupply">¿Se envía por delivery?</label>
                    </div>
                    <BeShowed show={isDelivery}>
                        <SinglePrice data={data} load={(childData) => load(childData)} />
                    </BeShowed>
                </div>
                <div className="price-container">
                    <div className="form-check form-check-inline col-sm-3" style={{ alignSelf: 'center' }}>
                        <input className="form-check-input" type="checkbox" id="isFranchiseSupply" defaultValue={priceWholesale} ref={inputIsFranchiseSupply}
                            onChange={(e) => onChangeChkBoxFranchise(e)} />
                        <label className="price-type-label price-label" htmlFor="isFranchiseSupply">¿Se envía a franquicias?</label>
                    </div>
                    <BeShowed show={isFranchise}>
                        <MultiplePrice data={data} load={(childData) => load(childData)} />
                    </BeShowed>
                </div>
            </div>
            <div className="price-title">
                <label >Stock*</label>
            </div>
            <TypeSupply data={data} load={(childData) => load(childData)} />
            <BeShowed show={props.typeSupply > 0 && props.typeSupply < 3}>
                <Stock data={data} load={(childData) => load(childData)} />
            </BeShowed>

        </>
    );
}

const mapStateToProps = state => {
    return {
        typeSupply: state.typeSupply,
    }
}

export default connect(mapStateToProps)(DataEditSupplies);