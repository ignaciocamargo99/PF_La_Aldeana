import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxNew(props) {
    const newCheck = useRef(null);

    const newOnChange = (e) => {
        props.pageElements.forEach((element, i) => {
            console.log(props.permission.name)
            console.log(i)
            if (props.permission.name === element.name) {
                if (props.permission.id_access === 1) newCheck.current.checked = true;
            }
        })
    }

    useEffect(() => {
        showPermissions(newCheck, props.permission, props.index, 'N');

    }, [])

    return (
        <input type="checkbox" id="newCheckBox" ref={newCheck} onChange={newOnChange} />
    );
}