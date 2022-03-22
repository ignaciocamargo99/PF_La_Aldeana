import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxEdit(props) {
    const editCheck = useRef(null);

    const editOnChange = (e) => {
        props.pageElements.forEach((element, i) => {
            console.log(props.permission.name)
            console.log(i)
            if (props.permission.name === element.name) {
                if (props.permission.id_access === 1) editCheck.current.checked = true;
            }
        })
    }
    
    useEffect(() => {
        showPermissions(editCheck, props.permission, props.index, 'E');

    }, [])

    return (
        <input type="checkbox" id="editCheckBox" ref={editCheck} onChange={editOnChange} />
    );
}