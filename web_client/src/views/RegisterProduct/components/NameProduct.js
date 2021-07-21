import React, { useRef } from "react";

const NameProduct = () => {
    const inputName = useRef(null);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productName" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <input className="form-control" id="productName" type="text" ref={inputName} placeholder="Ingrese nombre del producto...">
                </input>
            </div>
        </div>
    );
}

export default NameProduct;