import React, { useEffect, useRef } from "react";
import BeShowed from "common/BeShowed";

const SectorProduct = (props) => {
    const rb1 = useRef(null);
    const rb2 = useRef(null);

    useEffect(() => {
        if (props.data.id_sector == 1) {
            rb1.current.checked = true;
            rb2.current.checked = false;
        } else if (props.data.id_sector == 2) {
            rb1.current.checked = false;
            rb2.current.checked = true;
        } else {
            rb1.current.checked = false;
            rb2.current.checked = false;
        }
    });

    const handlerOnChange = (e) => {
        let data = props.data;
        if (e.target.value === "iceCreamShop") data.id_sector = 1;
        else data.id_sector = 2;
        props.data.editing = false;
        // props.data.id_product_type = null;
        props.load(data);
    }


    return (
        <div className="formRow">
            <div className="form-control-label">
                <label>Rubro*</label>
            </div>
            <div className="d-flex form-radio-group">
                <div className="form-check form-radio">
                    <BeShowed show={!props.data.reading}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="iceCreamShop" value="iceCreamShop" onChange={(e) => handlerOnChange(e)} ref={rb1}></input>
                    </BeShowed>
                    <BeShowed show={props.data.reading}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="iceCreamShop" value="iceCreamShop" disabled ref={rb1}></input>
                    </BeShowed>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Heladería
                    </label>
                </div>
                <div className="form-check">
                    <BeShowed show={!props.data.reading}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="coffeShop" value="coffeShop" onChange={(e) => handlerOnChange(e)} ref={rb2}></input>
                    </BeShowed>
                    <BeShowed show={props.data.reading}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="coffeShop" value="coffeShop" disabled ref={rb2}></input>

                    </BeShowed>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Cafetería
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SectorProduct;