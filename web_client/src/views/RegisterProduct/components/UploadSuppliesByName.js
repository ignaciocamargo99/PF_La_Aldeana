import { useRef, useState } from 'react';
import errorInputNameSupplies from '../../../utils/ErrorMessages/errorInputNameSupplies';
import BeShowed from '../../../common/BeShowed';

export default function UploadSuppliesByName(props) {
    const input = useRef(null)
    const [showOptions, setShowOptions] = useState(false)

    const upload = () => {
        let x = -1
        props.supplies.map((supply, i) => {
            if (supply.nombre.toUpperCase() === input.current.value.toUpperCase()) {
                x = supply.id_supply
            }
        })
        if (x !== -1) {
            props.upload(x)
            input.current.value = ""
            updateShowOptions()
        }
        else {
            errorInputNameSupplies()
        }

    }

    const updateShowOptions = () => {
        if (input.current.value.length >= 3) {
            setShowOptions(true)
        }
        else {
            setShowOptions(false)
        }
    }

    return (

        <div>
            <BeShowed show={showOptions}>
                <datalist id="listSupplies">
                    {console.log(props.supplies)}
                    {props.supplies.map((supply, i) => {
                        return (<option value={supply.name} key={i}></option>)
                    })}
                </datalist>
            </BeShowed>
            <div className="mb-3 row">
                <input className="form-control col-md-4" type="search" list="listSupplies" placeholder="Buscar insumo" maxLength="100" onChange={updateShowOptions} ref={input} />
                <button className="btn btn-primary" onClick={upload}>+</button>
            </div>
        </div>
    )
}