import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxNew(props) {
    const newCheck = useRef(null);

    const newOnClick = (e) => {
        if(newCheck.current.checked) props.matrix[e][1] = 1;
        else props.matrix[e][1] = 0;
    }

    useEffect(() => {
        showPermissions(newCheck, props.permission, props.index, 'N', props.matrix);

    }, []);

    useEffect(() => {
        if (props.checkEnabledDisabled) {
            if ((props.checkEnabledDisabled[1] === false) && props.index === props.checkEnabledDisabled[0]) {
                newCheck.current.disabled = true;
            }
            else if(props.index === props.checkEnabledDisabled[0]) newCheck.current.disabled = false;
        }
    }, [props.checkEnabledDisabled])

    return (
        <input type="checkbox" id="newCheckBox" ref={newCheck} onClick={() => newOnClick(props.index)}/>
    );
}