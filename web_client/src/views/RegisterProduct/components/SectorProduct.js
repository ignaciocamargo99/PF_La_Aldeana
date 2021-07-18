import React from "react";
import '../styles/Form.css';

const SectorProduct = () => {
    return (
        <div className="formRow">
            <div className="form-control-label">
                <label>Rubro*</label>
            </div>
            <div className="d-flex form-radio-group">
                <div className="form-check form-radio">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Heladería
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Cafetería
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SectorProduct;