import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../common/BeShowed";
import useHTTPGet from '../../../hooks/useHTTPGet';
import validateTypeProduct from '../../../utils/Validations/validateTypeProduct';

const PORT = require('../../../config');

export default function TypeProduct(props) {

    const typeProduct = useHTTPGet(PORT() + '/api/typeProduct');

    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState("null");
    const [prevType, setPrevType] = useState("null");

    const handleType = (e) => {
        setPrevType(type);
        setType(e.target.value);
    }

    useEffect(() => {
        setErrorMessage(validateTypeProduct(type));
        if (type >= 0) {
            let data = props.data;
            data.typeProduct = type;
            props.load(data);
        }
    }, [type]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productType">Tipo*</label>
            </div>
            <div className="form-control-input">
                <select className="form-control" id="selectTypeProduct"
                    defaultValue='-1'
                    onChange={handleType}>
                    <option disabled value="-1">Seleccione tipo de producto...</option>
                    {
                        typeProduct?.map((tp, i) => (
                            <option key={i} value={tp.id_product_type}>{tp.name}</option>
                        ))
                    }
                </select>
                <BeShowed show={errorMessage !== "null" && prevType !== "null"}>
                    <div style={{ color: 'red' }}>{errorMessage}</div>
                </BeShowed>
            </div>
        </div>
    );
}