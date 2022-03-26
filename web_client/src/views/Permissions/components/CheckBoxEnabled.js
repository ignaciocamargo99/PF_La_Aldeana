import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxEnabled(props) {
    const enabledDisabledCheck = useRef(null);
    let checkBox = props.checkEnabledDisabled;

    const enabledChange = () => {
        checkBox.push(enabledDisabledCheck.current.checked);
        props.load(checkBox);
    }

    const enabledOnClick = (e) => {
        checkBox.push(e);
        props.load(checkBox);
        if(enabledDisabledCheck.current.checked) props.matrix[e][0] = 1;
        else props.matrix[e][0] = 0;
    }

    useEffect(() => {
        showPermissions(enabledDisabledCheck, props.permission, props.index, 'ED', props.matrix);
    }, [])

    return (
        <input type="checkbox" id="enabledDisabledCheckBox" ref={enabledDisabledCheck}
            onChange={enabledChange} onClick={() => enabledOnClick(props.index)} />
    );
}