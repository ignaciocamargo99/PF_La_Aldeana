import React from "react";

const SectorProduct = (props) => {

    const handlerOnChange = (e) => {
        let data = props.data;
        if (e.target.value === "iceCreamShop") data.sector = 1;
        else data.sector = 2;
        props.load(data);
    }


    return (
        <div className="formRow">
            <div className="form-control-label">
                <label>Rubro*</label>
            </div>
            <div className="d-flex form-radio-group">
                <div className="form-check form-radio">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="iceCreamShop" value="iceCreamShop" onChange={(e) => handlerOnChange(e)}></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Heladería
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="coffeShop" value="coffeShop" onChange={(e) => handlerOnChange(e)}></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Cafetería
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SectorProduct;