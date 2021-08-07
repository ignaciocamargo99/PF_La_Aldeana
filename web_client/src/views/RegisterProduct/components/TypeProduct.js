import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import useHTTPGet from '../../../hooks/useHTTPGet';
import validateTypeProduct from '../../../utils/Validations/validateTypeProduct';
import getNameTypeProduct from './getNameTypeProduct';

const PORT = require('../../../config');

export default function TypeProduct(props) {

    const typeProduct = useHTTPGet(PORT() + '/api/typeProducts');

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
            data.id_product_type = type;
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
                    <BeShowed show={props.data.id_product_type}>
                        <option disabled value="-1">{getNameTypeProduct(typeProduct, props.data.id_product_type)}</option>
                    </BeShowed>
                    <BeShowed show={!props.data.id_product_type}>
                        <option disabled value="-1">Seleccione tipo de producto...</option>
                    </BeShowed>
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