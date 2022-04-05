import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxRead(props) {
    const readCheck = useRef(null);

    const readOnClick = (e) => {
        if(readCheck.current.checked) props.matrix[e][2] = 1;
        else props.matrix[e][2] = 0;
    }

    useEffect(() => {
        showPermissions(readCheck, props.permission, props.index, 'R', props.matrix)

    }, []);

    useEffect(() => {
        if (props.checkEnabledDisabled) {
            if ((props.checkEnabledDisabled[1] === false) && props.index === props.checkEnabledDisabled[0]) {
                readCheck.current.disabled = true;
            }
            else if(props.index === props.checkEnabledDisabled[0]) readCheck.current.disabled = false;
        }

    }, [props.checkEnabledDisabled])

    return (
        <input type="checkbox" id="readCheckBox" ref={readCheck} onClick={() => readOnClick(props.index)} />
    );
}