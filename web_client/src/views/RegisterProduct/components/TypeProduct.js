import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../common/BeShowed";
import useHTTPGet from '../../../hooks/useHTTPGet';
import validateTypeProduct from '../../../utils/Validations/validateTypeProduct';

const PORT = require('../../../config');

const TypeProduct = (props) => {

    const typeProduct = useHTTPGet(PORT() + '/api/typeProduct');


    const inputType = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState("null");
    const [prevType, setPrevType] = useState("null");

    const handleType = () => {
        setPrevType(type);
        setType(inputType.current.value);
        console.log(type)
    }

    useEffect(() => {
        setErrorMessage(validateTypeProduct(inputType.current.value));
        if (inputType.current.value >= 0) {

            let data = props.data;

            data.type = inputType.current.value;

            props.load(data);
        }
    }, [type]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productType">Tipo*</label>
            </div>
            <div className="form-control-input">
                <input className="form-control " list="productTypesdatalist" id="productType" placeholder="Seleccione tipo de producto..." ref={inputType} onChange={handleType}>
                </input>
                <datalist id="productTypesdatalist">
                    {typeProduct?.map((tp) => {
                        return (
                            <option key={tp.id_product_type} value={tp.name}>
                            </option>
                        )
                    })}
                </datalist>
                <BeShowed show={errorMessage !== "null" && prevType !== "null"}>
                    <div style={{ color: 'red' }}>{errorMessage}</div>
                </BeShowed>
                {/*
                    <div className="d-flex-col form-add-btn">
                    <button type="button" className="btn btn-primary" >+</button>
                    </div>
                */}
            </div>
        </div>
    );
}

export default TypeProduct;