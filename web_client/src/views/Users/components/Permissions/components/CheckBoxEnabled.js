import React, { useEffect, useRef, useState } from "react";
import showPermissions from "../showPermissions";
import useHTTPGet from '../../../../../hooks/useHTTPGet';
const PORT = require('../../../../../config');

export default function CheckBoxEnabled(props) {
    const enabledDisabledCheck = useRef(null);
    let checkBox = props.checkEnabledDisabled;
    const access = useHTTPGet(PORT() + '/api/accesses');
    const [selectValue, setSelectValue] = useState("-1");
    const [permission, setPermission] = useState("null");
    const [prevPermission, setPrevPermission] = useState("null");


    const enabledChange = () => {
        checkBox.push(enabledDisabledCheck.current.checked);
        props.load(checkBox);
    }

    const enabledOnClick = (e) => {
        checkBox.push(e);
        props.load(checkBox);
        if (enabledDisabledCheck.current.checked) props.matrix[e][0] = 1;
        else props.matrix[e][0] = 0;
    }

    useEffect(() => {
        showPermissions(enabledDisabledCheck, props.permission, props.index, 'ED', props.matrix);
    }, []);



    const handleType = (e) => {
        setPrevPermission(permission);
        setPermission(e.target.value);
        setSelectValue(e.target.value);

        // MODIFICAR ESTA PARTE!!!!
        showPermissions(enabledDisabledCheck, props.permission, props.index, 'ED', props.matrix);
        props.load(selectValue);
    }

    return (
        // <input type="checkbox" id="enabledDisabledCheckBox" ref={enabledDisabledCheck}
        //     onChange={enabledChange} onClick={() => enabledOnClick(props.index)} />
        
        
        <select className="form-control" id="selectTypeProduct"
            value={selectValue}
            onChange={handleType}>
            {/* <BeShowed show={props.data.id_product_type && props.data.editing === true}>
                <option disabled value="-1">{getNameTypeProduct(typeProduct, props.data.id_product_type)}</option>
            </BeShowed> */}
            {/* <BeShowed show={!props.data.id_product_type || props.data.editing === false}> */}
            <option value="-1">No</option>
            {/* </BeShowed> */}
            {access && access.map((a, i) => {
                // if (product.id_sector === props.data.id_sector)
                return (<option key={i} value={a.id_access}>{a.name_access}</option>)
            })}
        </select>
    );
}