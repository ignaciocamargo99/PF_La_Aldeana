import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../../../common/BeShowed";
import LoaderSpinner from "../../../../../common/LoaderSpinner";
import warningSizeImages from "../../../../../utils/WarningMessages/warningSizeImages";

const PORT = require('../../../../../config');

export default function ImageProduct(props) {
    const [image, setImage] = useState();
    const [previewImg, setPreviewImg] = useState();
    const inputImg = useRef(null);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

    const handleImg = (e) => {
        const objImg = inputImg.current;
        if (objImg.files[0]) {
            // Bytes
            if (objImg.files[0].size > 500000) {
                inputImg.current.value = "";
                warningSizeImages();
                return;
            }
            else setPreviewImg(URL.createObjectURL(e.target.files[0]));
        }
        else setPreviewImg(false);
    }

    useEffect(() => {
        Axios.get(PORT() + `/api/imageProduct/${props.data.id_product}`)
            .then((response) => {
                handlerLoadingSpinner();
                setImage(response.data);
                if (response.data) props.data.flagImageUpdate = false;
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        let data = props.data;
        if (inputImg.current.files[0]) {
            data.flagImageUpdate = true
            data.img = inputImg.current.files[0];
        }
        else data.flagImageUpdate = false;
        props.load(data);
    }, [previewImg]);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

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
            {isLoadingSpinner && (
                <>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <LoaderSpinner color="primary" />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <label className="text-muted" style={{ margin: '10px', padding: '10px 50px 50px 50px' }}>Cargando imagen. Aguarde...</label>
                        </div>
                    </div>
                </>
            )}

            {!isLoadingSpinner && (
                <>
                    <BeShowed show={previewImg}>
                        <img className="rounded mx-auto d-block img-thumbnail" id="imagenPrevisualizacion" src={previewImg}></img>
                    </BeShowed>
                    <BeShowed show={!previewImg && image}>
                        {image?.map((image) => (
                            <img className="rounded mx-auto d-block img-thumbnail" key={image} id="imagenPrevisualizacion" src={PORT() + '/' + image}></img>
                        ))}
                    </BeShowed>
                </>
            )}
        </>
    );
};