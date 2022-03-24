import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";


export default function CheckBoxNew(props) {
    const newCheck = useRef(null);

    // const newOnChange = (e) => {
    //     props.pageElements.forEach((element, i) => {
    //         console.log(props.permission.name)
    //         console.log(i)
    //         if (props.permission.name === element.name) {
    //             if (props.permission.id_access === 1) newCheck.current.checked = true;
    //         }
    //     })
    // }

    useEffect(() => {
        showPermissions(newCheck, props.permission, props.index, 'N');

    }, []);

    useEffect(() => {
        if (props.valueCheck) {
            if ((props.valueCheck[1] === false) && props.index === props.valueCheck[0]) {
                newCheck.current.disabled = true;
            }
            else if(props.index === props.valueCheck[0]) newCheck.current.disabled = false;
        }

    }, [props.valueCheck])

    return (
        <input type="checkbox" id="newCheckBox" ref={newCheck} />
    );
}