import React, { useState , useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import BeShowed from '../../../common/BeShowed';


const UploadByName = (props) => {

    const input = useRef(null)
    const [showOptions, setShowOptions] = useState(false)
    const [errorMessage,setErrorMessage] = useState(null)    
    
    const upload = () => {
        let x = -1
        props.list.forEach((item) => {
            if (item.name.toUpperCase() === input.current.value.toUpperCase()) {
                x = item.dni
            }
        })
        if (x !== -1) {
            props.upload(x)
            updateShowOptions()
        }
        else {
            setErrorMessage(`El ${props.itemName} no se encuentra disponible`)
        }
    }

    const updateShowOptions = () => {
        setErrorMessage(null)
        setShowOptions(true)
    }

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
                <input className={errorMessage?'form-control is-invalid':props.class} style={{marginLeft: '0.6em', maxWidth: '55em'}} type="search" list={props.listName} placeholder={props.placeholder} maxLength={props.maxLength} ref={input} onChange={updateShowOptions}/>    
            <BeShowed show={errorMessage !== "null"}>
                <div><b style={{ color: 'red' }}>{errorMessage}</b></div>
            </BeShowed>
            </div>
            <div className="form-control-button">
                <button className="btn" style={{backgroundColor: '#A5DEF9'}} onClick={upload}><FontAwesomeIcon style={{color: '#383C77'}} icon={faPlus} /></button>
            </div>
        </>
    )
}

export default UploadByName