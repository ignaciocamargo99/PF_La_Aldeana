import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../../common/BeShowed";
import getPermission from "./getPermission";

export default function CheckBoxEnabled(props) {
    const [selectValue, setSelectValue] = useState('0');
    const selectorRef = useRef(null);
    let matrixValuesSelected = props.matrix;

    useEffect(() => {
        if (props.data.editing || props.matrix) {
            let permissions1 = [];
            let idPermission = [];
            permissions1 = props.permission.find((permission) => permission.id_permission === props.index + 1);
            if (permissions1) {
                idPermission = props.access.find(a => a.name_access === permissions1.name_access);
                setSelectValue(idPermission.id_access)
                //Armamos la matriz...
                if (props.matrix) props.matrix[props.index][permissions1.id_access] = 1;
            }
            else {
                if (props.matrix) props.matrix[props.index][0] = 1;
                setSelectValue('0')
            }
            props.loadMatrix(props.matrix);
        }
    }, [])

    const onClickSelectValue = (e) => {
        if (!props.data.reading) {
            if (selectValue === '0') {
                matrixValuesSelected[e][0] = 1;
                matrixValuesSelected[e][1] = 0;
                matrixValuesSelected[e][2] = 0;
                matrixValuesSelected[e][3] = 0;
            }
            else {
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
            props.loadMatrix(props.matrix);
        }
    };

    const handleSelectValue = (e, i) => {
        setSelectValue(e.target.value);
        if (!props.data.reading) {
            if (e.target.value === '0') {
                matrixValuesSelected[i][0] = 1;
                matrixValuesSelected[i][1] = 0;
                matrixValuesSelected[i][2] = 0;
                matrixValuesSelected[i][3] = 0;
            }
            else {
                // Ver
                if (e.target.value === '1') {
                    matrixValuesSelected[i][0] = 0;
                    matrixValuesSelected[i][2] = 0;
                    matrixValuesSelected[i][3] = 0;
                    matrixValuesSelected[i][e.target.value] = 1;
                }
                // Ver/Registrar
                else if (e.target.value === '2') {
                    matrixValuesSelected[i][0] = 0;
                    matrixValuesSelected[i][1] = 0;
                    matrixValuesSelected[i][3] = 0;
                    matrixValuesSelected[i][e.target.value] = 1;
                }
                // Todos
                else if (e.target.value === '3') {
                    matrixValuesSelected[i][0] = 0;
                    matrixValuesSelected[i][1] = 0;
                    matrixValuesSelected[i][2] = 0;
                    matrixValuesSelected[i][e.target.value] = 1;
                }
            }
            props.loadMatrix(props.matrix);
        }
    }

    return (
        <select className="form-control" id="selectTypeProduct"
            value={selectValue}
            onChange={(e) => handleSelectValue(e, props.index)}
            onClick={() => onClickSelectValue(props.index)} ref={selectorRef}>
            <BeShowed show={props.data.reading}>
                <option disabled value="0">{getPermission(props.permission, props.access, props.index, props.data.reading)}</option>
            </BeShowed>
            <BeShowed show={props.data.editing}>
                <option value="0">No</option>
                {props.access && props.access.map((a, i) => {
                    return (<option key={i} value={a.id_access}>{a.name_access}</option>)
                })}
            </BeShowed>
            <BeShowed show={!props.data.reading && !props.data.editing}>
                <option value="0">No</option>
                {props.access && props.access.map((a, i) => {
                    return (<option key={i} value={a.id_access}>{a.name_access}</option>)
                })}
            </BeShowed>

        </select>
    );
}