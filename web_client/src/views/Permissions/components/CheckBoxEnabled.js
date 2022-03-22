import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxEnabled(props) {
    const enabledDisabledCheck = useRef(null);

    const enabledChange = (e, i) => {
        console.log(enabledDisabledCheck.current.checked);
        // if(enabledDisabledCheck.current.checked === false){
        // }
    }

    useEffect(() => {
        showPermissions(enabledDisabledCheck, props.permission, props.index, 'ED')
    }, [])

    return (
        <input type="checkbox" id="enabledDisabledCheckBox" ref={enabledDisabledCheck} onChange={(e) => enabledChange(e)} />
    );
}