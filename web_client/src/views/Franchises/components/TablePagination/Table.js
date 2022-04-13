import React from 'react';
import DeleteFranchiseButton from "../DeleteFranchiseButton";
import EditFranchiseButton from '../EditFranchise/EditFranchiseButton';
import ReadFranchiseButton from "../ReadFranchise/ReadFranchiseButton";

const Table = ({ pageElements, columnsHeaders, handleRead, handleEdit, handleDelete, permissionsAccess }) => {
    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Franquicias activas:</h4>
            </div>
            {(pageElements && pageElements.length > 0)
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.city}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name_manager}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadFranchiseButton franchise={element} read={handleRead} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditFranchiseButton franchise={element} edit={handleEdit} permissionsAccess={permissionsAccess} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteFranchiseButton deleteFranchise={handleDelete} franchise={element} index={i} permissionsAccess={permissionsAccess} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen franquicias con el nombre ingresado...</h4>
            }

        </>
    )
};

export default Table;
