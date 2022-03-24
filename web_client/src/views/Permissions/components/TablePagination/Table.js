import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import CheckBoxNew from '../CheckBoxNew';
import CheckBoxRead from "../CheckBoxRead";
import CheckBoxEdit from "../CheckBoxEdit";
import CheckBoxDelete from "../CheckBoxDelete";
import CheckBoxEnabled from "../CheckBoxEnabled";

const PORT = require('../../../../config');

const Table = ({ pageElements, columnsHeaders, permission }) => {

    const [enabledDisabled, setEnabledDisabled] = useState();
    let checkEnabledDisabled = [];

    const load = (childData) => {
        setEnabledDisabled(childData);
    }

    return (
        <>
            <div className="formRow">
                <h4 className="text-secondary">Permisos para empleados:</h4>
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