import React, { useEffect, useRef, useState } from "react";
import showPermissions from "./showPermissions";

export default function CheckBoxEnabled(props) {
    const enabledDisabledCheck = useRef(null);
    const [selectValue, setSelectValue] = useState('0');


    useEffect(() => {
        showPermissions(enabledDisabledCheck, props.permission, props.index, 'ED', props.matrix);
    }, []);

    const onClickSelectValue = (e) => {
        let matrixValuesSelected = props.matrix
        if(selectValue === '0'){
            matrixValuesSelected[e][0] = 1;
            matrixValuesSelected[e][1] = 0;
            matrixValuesSelected[e][2] = 0;
            matrixValuesSelected[e][3] = 0;
        }
        else{
            // Ver
            if (selectValue === '1') {
                matrixValuesSelected[e][0] = 0;
                matrixValuesSelected[e][2] = 0;
                matrixValuesSelected[e][3] = 0;
                matrixValuesSelected[e][selectValue] = 1;
            }
            // Ver/Registrar
            else if (selectValue === '2') {
                matrixValuesSelected[e][0] = 0;
                matrixValuesSelected[e][1] = 0;
                matrixValuesSelected[e][3] = 0;
                matrixValuesSelected[e][selectValue] = 1;
            }
            // Todos
            else if (selectValue === '3') {
                matrixValuesSelected[e][0] = 0;
                matrixValuesSelected[e][1] = 0;
                matrixValuesSelected[e][2] = 0;
                matrixValuesSelected[e][selectValue] = 1;
            }
        }
        console.log(props.matrix);
        props.loadMatrix(props.matrix);
    }



    const handleSelectValue = (e) => {
        setSelectValue(e.target.value);
        // showPermissions(enabledDisabledCheck, props.permission, props.index, 'ED', props.matrix);
        // props.load(selectValue);
    }

    return (
        // <input type="checkbox" id="enabledDisabledCheckBox" ref={enabledDisabledCheck}
        //     onChange={enabledChange} onClick={() => enabledOnClick(props.index)} />


        <select className="form-control" id="selectTypeProduct"
            value={selectValue}
            onChange={handleSelectValue}
            onClick={() => onClickSelectValue(props.index)}>
            {/* <BeShowed show={props.data.id_product_type && props.data.editing === true}>
                <option disabled value="-1">{getNameTypeProduct(typeProduct, props.data.id_product_type)}</option>
            </BeShowed> */}
            {/* <BeShowed show={!props.data.id_product_type || props.data.editing === false}> */}
            <option value="0">No</option>
            {/* </BeShowed> */}
            {props.access && props.access.map((a, i) => {
                // if (product.id_sector === props.data.id_sector)
                return (<option key={i} value={a.id_access}>{a.name_access}</option>)
            })}
        </select>
    );
}