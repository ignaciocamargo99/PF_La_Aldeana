import React, { useState , useRef} from 'react';
import { useEffect } from 'react';
import BeShowed from '../../../common/BeShowed';

const UploadByName = (props) => {

    const input = useRef(null);
    const [showOptions, setShowOptions] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null);
    
    const upload = () => {
        console.log(props.list)
        let x = -1;
        props.list.forEach((item) => {
            if (item.name.toUpperCase() === input.current.value.toUpperCase()) {
                x = item.dni;
            }
        })
        if (x !== -1) {
            props.upload(x);
        }
        else {
            setErrorMessage(`El ${props.itemName} no se encuentra disponible`);
        }
    }

    const updateShowOptions = () => {
        setErrorMessage(null);
        setShowOptions(true);
        upload();
    }

    useEffect(() => {
        console.log('no hay lista')
        input.current.value = ''
        input.current.innerHTML = ''
    }, [props.date.current && props.date.current.value])

    return(
        <>
            <BeShowed show={showOptions}>
                <datalist id={props.listName}>
                    {props.list.map((item, i) => {
                        return (<option value={item.name} key={i}></option>)
                    })}
                </datalist>
            </BeShowed>
            <div className="form-control-input">
                <input className={errorMessage?'form-control is-invalid':props.className}  style={{maxWidth: '100em', marginLeft: 'auto'}} type="search" list={props.listName} placeholder={props.placeholder} maxLength={props.maxLength} ref={input} onChange={updateShowOptions} defaultValue={props.default}/>    
                <BeShowed show={errorMessage !== "null"}>
                    <div><b style={{ color: 'red' }}>{errorMessage}</b></div>
                </BeShowed>
            </div>
        </>
    );
}

export default UploadByName;