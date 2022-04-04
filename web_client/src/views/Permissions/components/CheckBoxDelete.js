import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxDelete(props) {
    const deleteCheck = useRef(null);

    const deleteOnClick = (e) => {
        if(deleteCheck.current.checked) props.matrix[e][4] = 1;
        else props.matrix[e][4] = 0;
    }

    useEffect(() => {
        showPermissions(deleteCheck, props.permission, props.index, 'D', props.matrix);

    }, []);

    useEffect(() => {
        if (props.checkEnabledDisabled) {
            if ((props.checkEnabledDisabled[1] === false) && props.index === props.checkEnabledDisabled[0]) {
                deleteCheck.current.disabled = true;
            }
            else if(props.index === props.checkEnabledDisabled[0]) deleteCheck.current.disabled = false;
        }

    }, [props.checkEnabledDisabled])

    return (
        <input type="checkbox" id="deleteCheckBox" ref={deleteCheck} onClick={() => deleteOnClick(props.index)} />
    );
}