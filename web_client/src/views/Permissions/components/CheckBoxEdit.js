import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxEdit(props) {
    const editCheck = useRef(null);

    const editOnClick = (e) => {
        if(editCheck.current.checked) props.matrix[e][3] = 1;
        else props.matrix[e][3] = 0;
    }
    
    useEffect(() => {
        showPermissions(editCheck, props.permission, props.index, 'E', props.matrix);

    }, []);

    useEffect(() => {
        if (props.checkEnabledDisabled) {
            if ((props.checkEnabledDisabled[1] === false) && props.index === props.checkEnabledDisabled[0]) {
                editCheck.current.disabled = true;
            }
            else if(props.index === props.checkEnabledDisabled[0]) editCheck.current.disabled = false;
        }

    }, [props.checkEnabledDisabled])

    return (
        <input type="checkbox" id="editCheckBox" ref={editCheck} onClick={() => editOnClick(props.index)} />
    );
}