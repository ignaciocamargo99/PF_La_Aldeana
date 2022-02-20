import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../../common/BeShowed";

export default function ProvinceFranchise(props) {
    const inputProvince = useRef(null);
    const [province, setProvince] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleProvince = () => setProvince(inputProvince.current.value);

    useEffect(() => {
        if (!props.data.reading) {
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
        }
    }, [province, props]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="province" >Provincia*</label>
            </div>
            <BeShowed show={!props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="province" type="text" maxLength="80" ref={inputProvince} placeholder="Ingrese provincia de la franquicia..."
                        onChange={handleProvince} defaultValue={props.data.province} />
                </div>
            </BeShowed>
            <BeShowed show={props.data.reading}>
                <div className="form-control-input">
                    <input className={isValidClass} id="province" type="text" maxLength="80" defaultValue={props.data.province} readOnly />
                </div>
            </BeShowed>
        </div>
    );
}