import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxDelete(props) {
    const deleteCheck = useRef(null);

    const deleteOnChange = (e) => {
        props.pageElements.forEach((element, i) => {
            console.log(props.permission.name)
            console.log(i)
            if (props.permission.name === element.name) {
                if (props.permission.id_access === 1) deleteCheck.current.checked = true;
            }
        })
    }

    useEffect(() => {
        showPermissions(deleteCheck, props.permission, props.index, 'D');

    }, [])

    return (
        <input type="checkbox" id="deleteCheckBox" ref={deleteCheck} onChange={deleteOnChange} />
    );
}