import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CheckBoxDelete from "../CheckBoxDelete";
import CheckBoxEdit from "../CheckBoxEdit";
import CheckBoxEnabled from "../CheckBoxEnabled";
import CheckBoxNew from '../CheckBoxNew';
import CheckBoxRead from "../CheckBoxRead";
import successMessage from "../../../../../../utils/SuccessMessages/successMessage"
import displayError from "../../../../../../utils/ErrorMessages/displayError"
const PORT = require('../../../../../../config');


const Table = ({ pageElements, columnsHeaders, permission, cancelChanges, matrix, load, valueSelect }) => {

    // const [enabledDisabled, setEnabledDisabled] = useState();
    // const [valueCheckBoxes, setValueCheckBoxes] = useState();
    // let checkEnabledDisabled = [];
    // let matrix = new Array();

    // useEffect(() => {
    //     for (let x = 0; x <= 7; x++) {
    //         matrix[x] = new Array();
    //         for (let y = 0; y <= 4; y++) {
    //             matrix[x][y] = 0;
    //         }
    //     };
    //     setValueCheckBoxes(matrix);
    // }, []);

    // const load = (childData) => {
    //     setEnabledDisabled(childData);
    //     console.log(matrix)
    // }

    // const onClickSaveChanges = () => {
    //     console.log(valueCheckBoxes);
    //     Axios.put(`${PORT()}/api/permissions`, valueCheckBoxes)
    //         .then((data) => {
    //             if (data.Ok) successMessage('Atención', 'Se han modificado los permisos para los empleados', 'success')
    //             else displayError('Ha ocurrido un error al guardar los cambios...')
    //         })
    //         .catch(error => console.log(error));
    // };

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Permisos establecidos:</h4>
                {/* <div className="search-input">
                    <button className='sendOk' onClick={onClickSaveChanges}>Guardar</button>
                    <button className='cancel' onClick={cancelChanges}>Cancelar</button>
                </div> */}
            </div>
            {(pageElements && pageElements.length > 0 && permission)
                ?
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
                        <thead>
                            <tr>
                                {columnsHeaders?.map((element, i) => {
                                    return (
                                        <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
                                            {element.name}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {pageElements?.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxEnabled pageElements={pageElements} permission={permission}
                                                index={i} load={load} matrix={valueSelect} />
                                        </td>
                                        {/* <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxNew pageElements={pageElements} permission={permission} index={i}
                                                checkEnabledDisabled={enabledDisabled} matrix={valueCheckBoxes} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxRead pageElements={pageElements} permission={permission} index={i}
                                                checkEnabledDisabled={enabledDisabled} matrix={valueCheckBoxes} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxEdit pageElements={pageElements} permission={permission} index={i}
                                                checkEnabledDisabled={enabledDisabled} matrix={valueCheckBoxes} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxDelete pageElements={pageElements} permission={permission} index={i}
                                                checkEnabledDisabled={enabledDisabled} matrix={valueCheckBoxes} />
                                        </td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>Aguarde...</h4>
            }

        </>
    )
};

export default Table;