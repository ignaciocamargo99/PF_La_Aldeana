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

    }, []);

    useEffect(() => {
        if (props.valueCheck) {
            if ((props.valueCheck[1] === false) && props.index === props.valueCheck[0]) {
                editCheck.current.disabled = true;
            }
            else if(props.index === props.valueCheck[0]) editCheck.current.disabled = false;
        }

    }, [props.valueCheck])

    return (
        <input type="checkbox" id="editCheckBox" ref={editCheck} onChange={editOnChange} />
    );
}