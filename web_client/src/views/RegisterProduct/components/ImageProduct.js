import React from "react";
import '../styles/Form.css';

const ImageProduct = () => {
    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="productImage2" className="form-label">Imagen</label>
                </div>
                <div className="form-control-input">
                    <input className="form-control" type="file" id="productImage2"></input>
                </div>
            </div>
        </>
    );
};

export default ImageProduct;