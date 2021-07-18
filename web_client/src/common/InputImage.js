import { useRef } from 'react';
import validateImage from '../utils/Validations/validateImages';

const InputImage = (props) => {

    //const [isImgLoad, setImgLoad] = useState(false);
    const inputImg = useRef(null);

    const handleImg = (e) => {
        //setImgLoad(true);
        const imageFile = inputImg.current
        validateImage(imageFile);
    }

    return (
        <>
            <div className="form-control-label">
                <label htmlFor={props.htmlfordata} >{props.label}</label>
            </div>
            <input type='file' className="form-control" accept="image/png, .jpeg, .jpg" ref={inputImg} onChange={handleImg} id="files"></input>
            {/* <BeShowed show={isImgLoad}>
                <img></img>
            </BeShowed> */}
        </>
    );
}

export default InputImage;