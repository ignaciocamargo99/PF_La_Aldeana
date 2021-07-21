import React, { useRef, useState } from "react";
import validateImage from '../../../utils/Validations/validateImages';
import BeShowed from "../../../common/BeShowed";

const ImageProduct = () => {

    const [previewImg, setPreviewImg] = useState();

    const inputImg = useRef(null);

    const handleImg = (e) => {
        const objImg = inputImg.current;
        if (objImg.files[0] !== undefined) {
            validateImage(objImg);
            setPreviewImg(URL.createObjectURL(e.target.files[0]));
        }
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
            <BeShowed show={inputImg}>
                <img className="rounded mx-auto d-block img-thumbnail" id="imagenPrevisualizacion" src={previewImg}></img>
            </BeShowed>
        </>
    );
};

export default ImageProduct;