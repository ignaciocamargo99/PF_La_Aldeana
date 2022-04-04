import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoaderSpinner from "../../../common/LoaderSpinner";
import TablePagination from './TablePagination/TablePagination';

const PORT = require('../../../config')

export default function ListUsers() {
    const [views, setViews] = useState();
    const [permission, setPermission] = useState();
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

    // useEffect(() => {
    //     Axios.get(PORT() + '/api/permissions')
    //         .then((response) => {
    //             handlerLoadingSpinner();
    //             setViews(response.data);
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    // useEffect(() => {
    //     Axios.get(PORT() + '/api/views')
    //         .then((response) => setPermission(response.data))
    //         .catch((error) => console.error(error));
    // }, []);

    const cancelChanges = () => window.location.reload();
    
    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const columnsHeaders = [
        {
            name: 'Pantalla',
            // width: '40%'
        },
        {
            name: '¿Habilitada?',
            // width: '25%'
        },
        {
            name: 'Registrar',
            // width: '12%'
        },
        {
            name: 'Ver',
            // width: '12%'
        },
        {
            name: 'Editar'
        },
        {
            name: 'Eliminar'
        }
    ];

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Permisos"}</div>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." /> :
                views?.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Permisos</h1>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron pantallas para administrar los permisos...</h4>
                    </div>
                    : (
                        <>
                            <div className="viewTitleBtn">
                                <h1>Permisos</h1>
                            </div>
                            <div className="viewBody">
                                <TablePagination
                                    columnsHeaders={columnsHeaders}
                                    currentElements={views}
                                    permission={permission}
                                    cancelChanges = {cancelChanges}
                                />

                            </div>
                        </>
                    )}
        </>
    );


}