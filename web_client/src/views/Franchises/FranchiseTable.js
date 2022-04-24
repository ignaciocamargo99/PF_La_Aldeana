import Axios from 'axios';
import { useEffect, useState } from 'react';
import BeShowed from '../../common/BeShowed';
import LoaderSpinner from '../../common/LoaderSpinner';
import displayError from '../../utils/ErrorMessages/errorMesage';
import TablePagination from './components/TablePagination/TablePagination';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import franchiseData from "./components/franchiseData";
import ReadFranchise from './components/ReadFranchise/ReadFranchise';
import EditFranchise from './components/EditFranchise/EditFranchise';

const PORT = require('../../config');

const FranchiseTable = (props) => {
    const [franchises, setFranchises] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [franchiseToEdit, setFranchiseToEdit] = useState({});
    const [franchiseToRead, setFranchiseToRead] = useState({});
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    let permissionsAccess = props.permissionsAccess;

    useEffect(() => {
        Axios.get(PORT() + '/api/franchises')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                setFranchises(auxSupply);
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteFranchise = (i) => {
        let aux = [];
        franchises?.forEach((e, j) => {
            if (j !== i) aux[j] = e;
        });
        setFranchises(aux);
    }

    const editFranchise = async (franchises) => {
        try {
            let aux = franchiseData(franchises)
            aux.editing = true;
            setFranchiseToEdit(aux);
            setIsEditing(true);
        }
        catch {
            displayError();
        }
    };

    const readFranchise = async (franchises) => {
        try {
            let aux = franchiseData(franchises)
            aux.reading = true;
            setFranchiseToRead(aux);
            setIsReading(true);
        }
        catch {
            displayError();
        }
    }

    const onClickBackToFranchises = () => {
        <div style={{ display: 'none' }}>{document.title = "Franchises"}</div>
        setIsReading(false);
        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '30%'
        },
        {
            name: 'Ciudad',
            width: '20%'
        },
        {
            name: 'Gerente',
            width: '20%'
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

    const onClickNewFranchise = () => window.location.replace('/app/newFranchise');

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Franquicias"}</div>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
                : franchises && franchises.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Franquicias</h1>
                            <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                <button id='newFranchiseButton' type="button" onClick={onClickNewFranchise} className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                            <BeShowed show={permissionsAccess === 1}>
                                <button id='newFranchiseButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron franquicias registrados hasta el momento...</h4>
                    </div>
                    : (
                        <>
                            <BeShowed show={!isEditing && !isReading}>
                                <div className="viewTitleBtn">
                                    <h1>Franquicias</h1>
                                    <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                        <button id='newFranchiseButton' type="button" onClick={onClickNewFranchise} className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                    </BeShowed>
                                    <BeShowed show={permissionsAccess === 1}>
                                        <button id='newFranchiseButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                    </BeShowed>
                                </div>
                                <div className="viewBody">
                                    <TablePagination
                                        columnsHeaders={columnsHeaders}
                                        currentElements={franchises}
                                        handleRead={readFranchise}
                                        handleEdit={editFranchise}
                                        handleDelete={deleteFranchise}
                                        permissionsAccess={permissionsAccess}
                                    ></TablePagination>
                                </div>
                            </BeShowed>
                            <BeShowed show={isEditing}>
                                <EditFranchise onClickCancelEdit={onClickBackToFranchises} franchiseToEdit={franchiseToEdit} />
                            </BeShowed>
                            <BeShowed show={isReading}>
                                <ReadFranchise onClickCancelRead={onClickBackToFranchises} franchiseToRead={franchiseToRead} />
                            </BeShowed>
                        </>
                    )}
        </>
    );
};

export default FranchiseTable;