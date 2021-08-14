import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import warningSizeImages from "../../../utils/WarningMessages/warningSizeImages";

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
    }


    useEffect(() => {
        let data = props.data;
        data.img = inputImg.current.files[0];
        props.load(data);
    }, [previewImg]);

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
            <BeShowed show={previewImg}>
                <img className="rounded mx-auto d-block img-thumbnail" id="imagenPrevisualizacion" src={previewImg}></img>
            </BeShowed>
        </>
    );
};

export default ImageProduct;