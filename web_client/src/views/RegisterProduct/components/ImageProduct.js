import React, { useRef } from "react";
import '../styles/Form.css';
import validateImage from '../../../utils/Validations/validateImages';

const ImageProduct = () => {

    const inputImg = useRef(null);

    const handleImg = () => {
        const objImg = inputImg.current;
        if(objImg.files[0] !== undefined) validateImage(objImg);
    }

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="productImage2" className="form-label">Imagen</label>
                </div>
                <div className="form-control-input">
                    <input className="form-control" accept="image/png, .jpeg, .jpg" ref={inputImg} onChange={handleImg} type="file" id="productImage2"></input>
                </div>
            </div>
        </>
    );
};

export default ImageProduct;