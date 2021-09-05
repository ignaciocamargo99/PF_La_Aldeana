import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import useHTTPGet from '../../../hooks/useHTTPGet';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';

const PORT = require('../../../config');

export default function FlavorsAmount(props) {

    const validate = (e) => {
        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
    }
    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productName" >Cantidad de sabores</label>
            </div>
            <div className="form-control-input">
                <input className="form-control" id="flavorsAmount"
                    type="number" maxLength="80" placeholder="Ingrese cantidad de sabores de helado..."
                    onInput={(e) => validate(e)}
                    onKeyDown={(e) => validateFloatNumbers(e)} />
            </div>
        </div>
    );
}