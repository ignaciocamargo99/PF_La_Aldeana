import { useRef, useState } from 'react';
import BeShowed from './BeShowed';

const InputImage = (props) => {

    const [isImgLoad, setImgLoad] = useState(false);

    const handleImg = () => {
        setImgLoad(true);
    }

    return(
        <>
            <div className="form-control-label">
                <label htmlFor={props.htmlfordata} >{props.label}</label>
            </div>
            <input type='file' className="form-control" onChange={handleImg} id={props.htmlfordata}></input>
            <BeShowed show={isImgLoad}>
                <img></img>
            </BeShowed>
        </>
    );
}

export default InputImage;