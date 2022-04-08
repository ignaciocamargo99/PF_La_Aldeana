import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import BeShowed from "../../common/BeShowed";
import LoaderSpinner from "../../common/LoaderSpinner";
import displayError from '../../utils/ErrorMessages/displayError';
import EditUser from "./components/EditUsers/EditUser";
import ReadUser from './components/ReadUsers/ReadUser';
import TablePagination from "./components/TablePagination/TablePagination";
import userData from './userData';

const PORT = require('../../config');

export default function ListUsers() {

    const [users, setUsers] = useState([]);
    const [userToRead, setUserToRead] = useState({});
    const [userToEdit, setUserToEdit] = useState({});
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isReading, setIsReading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/users')
            .then(({ data }) => {
                handlerLoadingSpinner();
                setUsers(data);
            })
            .catch((error) => console.log(error));
    }, []);

    // const deleteProduction = (i) => {
    //     let aux = [];
    //     allProductions?.forEach((e, j) => {
    //         if (j !== i) {
    //             aux[j] = e;
    //         }
    //     });
    //     setAllProductions(aux);
    // };

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const columnsHeaders = [
        {
            name: 'Usuario',
            width: '20%'
        },
        {
            name: 'Nombre/s',
            width: '25%'
        },
        {
            name: 'Apellido/s',
            width: '25%'
        },
        {
            name: 'Ver',
            width: '10%'
        },
        {
            name: 'Editar',
            width: '10%'
        },
        {
            name: 'Eliminar',
            width: '10%'
        }
    ];

    const onClickNewUser = () => window.location.replace('/app/registerUser');

    const readUser = async (user) => {
        try {
            let aux = userData(user)
            aux.reading = true;
            setUserToRead(aux);
            setIsReading(true);
        }
        catch {
            displayError();
        }
    }

    const goBackToAllUsersTable = () => {
        <div style={{ display: 'none' }}>{document.title = "Usuarios"}</div>
        setIsReading(false);
        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const editUser = async (user) => {

        try {
            let aux = userData(user)
            aux.editing = true;
            setUserToEdit(aux);
            setIsEditing(true);
        }
        catch {
            displayError();
        }
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Usuarios"}</div>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." /> :

                users?.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Usuarios</h1>
                            <button id='newUsersButton' type="button" onClick={onClickNewUser} className="newBtn"><FontAwesomeIcon icon={faPlus} />Nuevo</button>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron usuarios registrados hasta el momento.</h4>
                    </div>
                    : (
                        <BeShowed show={!isEditing && !isReading}>
                            <>
                                <div className="viewTitleBtn">
                                    <h1>Usuarios</h1>
                                    <button id='editUsersButton' onClick={onClickNewUser} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                </div>
                                <div className="viewBody">
                                    <TablePagination
                                        columnsHeaders={columnsHeaders}
                                        currentElements={users}
                                        handleRead={readUser}
                                        handleEdit={editUser}
                                    // handleDelete = {deleteProduction}
                                    />

                                </div>
                            </>
                        </BeShowed>
                    )}
            {isReading &&
                <ReadUser onClickCancelRead={goBackToAllUsersTable} userToRead={userToRead} />
            }
            {isEditing &&
                <EditUser onClickCancelEdit={goBackToAllUsersTable} userToEdit={userToEdit} />
            }
        </>
    );
}

