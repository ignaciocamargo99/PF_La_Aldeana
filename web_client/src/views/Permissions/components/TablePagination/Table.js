import React, { useState } from 'react';
import CheckBoxDelete from "../CheckBoxDelete";
import CheckBoxEdit from "../CheckBoxEdit";
import CheckBoxEnabled from "../CheckBoxEnabled";
import CheckBoxNew from '../CheckBoxNew';
import CheckBoxRead from "../CheckBoxRead";

const PORT = require('../../../../config');

const Table = ({ pageElements, columnsHeaders, permission, cancelChanges }) => {

    const [enabledDisabled, setEnabledDisabled] = useState();
    let checkEnabledDisabled = [];

    const load = (childData) => {
        setEnabledDisabled(childData);
    }

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Permisos para empleados:</h4>
                <div className="search-input">
                    <button className='sendOk'>Confirmar</button>
                    <button className='cancel' onClick={cancelChanges}>Cancelar</button>
                </div>
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
                                            <CheckBoxEnabled pageElements={pageElements} permission={permission} index={i} load={load}
                                                valueCheck={checkEnabledDisabled} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxNew pageElements={pageElements} permission={permission} index={i}
                                                valueCheck={enabledDisabled} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxRead pageElements={pageElements} permission={permission} index={i}
                                                valueCheck={enabledDisabled} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxEdit pageElements={pageElements} permission={permission} index={i}
                                                valueCheck={enabledDisabled} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <CheckBoxDelete pageElements={pageElements} permission={permission} index={i}
                                                valueCheck={enabledDisabled} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen productos con el nombre ingresado...</h4>
            }

        </>
    )
};

export default Table;