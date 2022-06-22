import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BeShowed from "common/BeShowed";
import LoaderSpinner from "common/LoaderSpinner";
import warningSizeImages from "utils/WarningMessages/warningSizeImages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

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
        if (inputImg.current && inputImg.current.value) {
            if (inputImg.current) {
                if (inputImg.current.files[0]) {
                    data.flagImageUpdate = true;
                    data.img = inputImg.current.files[0];
                }
                else data.flagImageUpdate = false;
                props.load(data);
            }
        }
    }, [previewImg]);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const handleDeleteImg = () => {
        let data = props.data;
        if (image) setImage([]);
        if (previewImg && inputImg.current) {
            inputImg.current.value = "";
            setPreviewImg(false);
        }

        data.flagImageUpdate = true;
        data.img = null;
        props.load(data);
    };

    return (
        <>
            <BeShowed show={!props.data.reading}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="productImage2" className="form-label">Imagen</label>
                    </div>
                    <div className="form-control-input-img">
                        <input className="form-control" accept="image/png, .jpeg, .jpg" ref={inputImg} onChange={handleImg} type="file" id="productImage2"></input>
                    </div>
                    <BeShowed show={(image && image.length > 0) || previewImg}>
                        <button className="btn btn-danger imgBtn" type="button" onClick={handleDeleteImg} ><FontAwesomeIcon icon={faMinus} /></button>
                    </BeShowed>
                    <BeShowed show={!previewImg && (image && image.length === 0)}>
                        <button className="disabledImgBtn" type="button" disabled><FontAwesomeIcon icon={faMinus} /></button>
                    </BeShowed>
                </div>
            </BeShowed>
            {!isLoadingSpinner
                ?
                (previewImg || (image && image.length > 0))
                    ?
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
                    :
                    <h4 className="row justify-content-center" style={{ color: '#C16100' }}>Este producto no tiene una imagen asociada aún...</h4>
                :
                <>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <LoaderSpinner color="primary" loading="Cargando imagen. Aguarde..." />
                        </div>
                    </div>
                </>
            }
        </>
    );
};