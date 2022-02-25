import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import BeShowed from "../../common/BeShowed";
import LoaderSpinner from "../../common/LoaderSpinner";
import displayError from '../../utils/ErrorMessages/displayError';
import EditProduction from "./components/EditProduction/EditProduction";
import ReadProduction from './components/ReadProduction/ReadProduction';
import TablePagination from "./components/TablePagination/TablePagination";
import productionData from './productionData';

const PORT = require('../../config');

export default function ListProductions() {

    const [allProductions, setAllProductions] = useState([]);
    const [productionToRead, setProductionToRead] = useState({});
    const [productionToEdit, setProductionToEdit] = useState({});
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isReading, setIsReading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/productions')
            .then(({ data }) => {
                handlerLoadingSpinner();
                setAllProductions(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteProduction = (i) => {
        let aux = [];
        allProductions?.forEach((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setAllProductions(aux);
    };

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const columnsHeaders = [
        {
            name: 'Fecha de producción',
            width: '40%'
        },
        {
            name: 'Cantidad de baldes producida',
            width: '25%'
        },
        {
            name: 'Ver',
            width: '12%'
        },
        {
            name: 'Editar'
        },
        {
            name: 'Eliminar'
        }
    ];

    const onClickNewProduction = () => window.location.replace('/app/production');

    const readProduction = async (production) => {
        try {
            let aux = productionData(production);
            aux.reading = true;
            setProductionToRead(aux);
            setIsReading(true);
        }
        catch {
            displayError();
        }
    }

    const goBackToAllProdctionsTable = () => {
        <div style={{ display: 'none' }}>{document.title = "Producciones"}</div>
        setIsReading(false);
        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const editProduction = async (production) => {
        try {
            let aux = productionData(production);
            aux.editing = true;
            setProductionToEdit(aux);
            setIsEditing(true);
        }
        catch {
            displayError();
        }
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Producciones"}</div>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." /> :

                allProductions?.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Producciones</h1>
                            <button id='newProductionButton' type="button" onClick={onClickNewProduction} className="newBtn"><FontAwesomeIcon icon={faPlus} />Nuevo</button>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron producciones registrados hasta el momento.</h4>
                    </div>
                    : (
                        <BeShowed show={!isEditing && !isReading}>
                            <>
                                <div className="viewTitleBtn">
                                    <h1>Producciones</h1>
                                    <button id='editProductionButton' onClick={onClickNewProduction} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                </div>
                                <div className="viewBody">
                                    <TablePagination
                                        columnsHeaders={columnsHeaders}
                                        currentElements={allProductions}
                                        handleRead={readProduction}
                                        handleEdit = {editProduction}
                                        handleDelete = {deleteProduction}

                                    />

                                </div>
                            </>
                        </BeShowed>
                    )}
            {isReading &&
                <ReadProduction onClickCancelRead={goBackToAllProdctionsTable} productionToRead={productionToRead} />
            }
            {isEditing &&
                <EditProduction onClickCancelEdit={goBackToAllProdctionsTable} productionToEdit={productionToEdit} />
            }
        </>
    );
}

