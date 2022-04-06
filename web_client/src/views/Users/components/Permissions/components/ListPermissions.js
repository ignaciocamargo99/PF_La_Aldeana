import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoaderSpinner from "../../../../../common/LoaderSpinner";
import TablePagination from './TablePagination/TablePagination';

const PORT = require('../../../../../config')

export default function ListPermissions(props) {
    const [views, setViews] = useState();
    const [permission, setPermission] = useState();
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

    useEffect(() => {
        Axios.get(PORT() + '/api/permissions')
            .then((response) => {
                handlerLoadingSpinner();
                setViews(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (props.data.reading) {
            Axios.get(PORT() + '/api/views')
                .then((response) => setPermission(response.data))
                .catch((error) => console.error(error));
        }
        else setPermission([]);
    }, []);

    const cancelChanges = () => window.location.reload();

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const columnsHeaders = [
        {
            name: 'Pantalla',
            // width: '40%'
        },
        {
            name: '¿Habilitar permiso?',
            // width: '25%'
        }
        // {
        //     name: 'Ver',
        //     // width: '12%'
        // },
        // {
        //     name: 'Ver/Registrar'
        // },
        // {
        //     name: 'Todos'
        // }
    ];

    return (
        <>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." /> :
                views?.length === 0
                    ?
                    <div>
                        <h2>Datos generales</h2>
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron pantallas para administrar los permisos...</h4>
                    </div>
                    : (
                        <>
                            <h2>Permisos</h2>
                            <TablePagination
                                columnsHeaders={columnsHeaders}
                                currentElements={views}
                                permission={permission}
                                cancelChanges={cancelChanges}
                                matrix={props.matrix}
                                load={(childData) => props.load(childData)}
                                valueSelect = {props.valueSelect}
                            />
                        </>
                    )}
        </>
    );


}