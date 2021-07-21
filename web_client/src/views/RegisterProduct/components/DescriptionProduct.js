import React from "react";

const DescriptionProduct = () => {
    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productDescription">Descripción</label>
            </div>
            <div className="form-control-input">
                <textarea className="form-control" id="productDescription" placeholder="Ingrese descripción del producto..." rows="3"></textarea>
            </div>
        </div>
    );
}

export default DescriptionProduct;