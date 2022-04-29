import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import warningSizeImages from "../../../utils/WarningMessages/warningSizeImages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const ImageProduct = (props) => {

    const [previewImg, setPreviewImg] = useState();
    const inputImg = useRef(null);

    const handleImg = (e) => {
        const objImg = inputImg.current;
        if (objImg.files[0]) {
            if (objImg.files[0].size > 500000) {
                inputImg.current.value = "";
                warningSizeImages();
                return;
            }
            else setPreviewImg(URL.createObjectURL(e.target.files[0]));
        }
        else {
            setPreviewImg(false);
        }
    };

    useEffect(() => {
        let data = props.data;
        data.img = inputImg.current.files[0];
        props.load(data);
    }, [previewImg]);

    const handleDeleteImg = () => {
        if (inputImg && inputImg.current) {
            inputImg.current.value = "";
            setPreviewImg(false);
        }
    }

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="productImage2" className="form-label">Imagen</label>
                </div>
                <div className="form-control-input-img">
                    <input className="form-control" accept="image/png, .jpeg, .jpg" ref={inputImg} onChange={handleImg} type="file" id="productImage2"></input>
                </div>
                <BeShowed show={inputImg.current && inputImg.current.value !== ''}>
                    <button className="btn btn-danger imgBtn" type="button" onClick={handleDeleteImg} ><FontAwesomeIcon icon={faMinus} /></button>
                </BeShowed>
                <BeShowed show={inputImg.current && inputImg.current.value === ''}>
                    <button className="disabledImgBtn" type="button" disabled><FontAwesomeIcon icon={faMinus} /></button>
                </BeShowed>
            </div>
            <BeShowed show={previewImg}>
                <img className="rounded mx-auto d-block img-thumbnail" id="imagenPrevisualizacion" src={previewImg} />
            </BeShowed>
        </>
    );
};

export default ImageProduct;