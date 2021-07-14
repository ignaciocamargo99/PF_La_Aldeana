import { useRef, useState } from 'react';
import BeShowed from './BeShowed';

const InputImage = (props) => {

    const [isImgLoad, setImgLoad] = useState(false);

    const handleImg = () => {
        setImgLoad(true);
    }

    return(
        <>
            <label className='col-3'>{props.label}</label>
            <input type='file' className='inputText col-8' onChange={handleImg}></input>
            <BeShowed show={isImgLoad}>
                <img></img>
            </BeShowed>
        </>
    );
}

export default InputImage;