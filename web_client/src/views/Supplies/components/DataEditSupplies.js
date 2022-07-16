import BeShowed from 'common/BeShowed';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import DescriptionSupply from 'views/RegisterSupply/components/DescriptionSupply';
import MultiplePrice from 'views/RegisterSupply/components/MultiplePrice';
import NameSupply from 'views/RegisterSupply/components/NameSupply';
import Stock from 'views/RegisterSupply/components/Stock';
import TypeSupply from 'views/RegisterSupply/components/TypeSupply';

const DataEditSupplies = ({ data, load, ...props }) => {
    const inputIsFranchiseSupply = useRef(null);
    const [isFranchise, setIsFranchise] = useState();
    const [priceWholesale, setPriceWholesale] = useState();

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
        setPriceWholesale(data.price_wholesale)
        if (data.price_wholesale) {
            inputIsFranchiseSupply.current.checked = true;
            data.chkb_price_wholesale = true
            setIsFranchise(true);
        }
        else {
            inputIsFranchiseSupply.current.checked = false;
            data.chkb_price_wholesale = false
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