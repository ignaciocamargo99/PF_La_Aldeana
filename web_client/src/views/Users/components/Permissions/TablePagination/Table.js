import React from 'react';
import useHTTPGet from '../../../../../hooks/useHTTPGet';
import SelectPermission from "../SelectPermission";

const PORT = require('../../../../../config');

const Table = ({ pageElements, columnsHeaders, permission, loadMatrix, valueSelect }) => {
    const access = useHTTPGet(PORT() + '/api/accesses');

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
                                            <SelectPermission pageElements={pageElements} permission={permission}
                                                index={i} loadMatrix={loadMatrix} matrix={valueSelect} access={access} />
                                        </td>
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