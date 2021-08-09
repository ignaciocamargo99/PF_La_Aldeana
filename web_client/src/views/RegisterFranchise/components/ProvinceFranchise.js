import React, { useEffect, useRef, useState } from "react";
import validateTextOnly from '../../../utils/Validations/validateTextOnly';

export default function ProvinceFranchise (props) {
    const inputProvince = useRef(null);
    const [province, setProvince] = useState("null");
    const [prevProvince, setPrevProvince] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleProvince = () => {
        setPrevProvince(province);
        setProvince(inputProvince.current.value);
    }

    useEffect(() => {

        let val = inputProvince.current.value;

        if (val.trim().length > 0 && inputProvince.current.value.length <= 80) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.province = val.trim();
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            let data = props.data;
            data.province = "";
            props.load(data);
        }
    }, [province]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="province" >Provincia*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="province" type="text" maxLength="80" ref={inputProvince} placeholder="Ingrese provincia de la franquicia..." onChange={handleProvince}
                onKeyDown={(e) => validateTextOnly(e)}/>
            </div>
        </div>
    );
}