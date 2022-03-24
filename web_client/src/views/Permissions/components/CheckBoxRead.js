import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxRead(props) {
    const readCheck = useRef(null);

    const readChange = (e) => {
        props.pageElements.forEach((element, i) => {
            console.log(props.permissions.name)
            console.log(i)
            if (props.permissions.name === element.name) {
                if (props.permissions.id_access === 1) readCheck.current.checked = true;
            }
        })
    }

    useEffect(() => {
        showPermissions(readCheck, props.permission, props.index, 'R')

    }, []);

    useEffect(() => {
        if (props.valueCheck) {
            if ((props.valueCheck[1] === false) && props.index === props.valueCheck[0]) {
                readCheck.current.disabled = true;
            }
            else if(props.index === props.valueCheck[0]) readCheck.current.disabled = false;
        }

    }, [props.valueCheck])

    return (
        <input type="checkbox" id="readCheckBox" ref={readCheck} onChange={readChange} />
    );
}