import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import displayError from '../../utils/ErrorMessages/displayError';
import BeShowed from "../../common/BeShowed";
import LoaderSpinner from "../../common/LoaderSpinner";
import BodyTable from "../../common/Table/BodyTable";
import HeaderTable from "../../common/Table/HeaderTable";
import Table from '../../common/Table/Table';
import TablePagination from "./components/TablePagination/TablePagination";
import productionData from './productionData';
// import DeleteEmployeeButton from './DeleteEmployeeButton';
// import EditEmployee from "./EditEmployee/EditEmployee";
// import EditEmployeeButton from "./EditEmployee/EditEmployeeButton";
import ReadProduction from './components/ReadProduction/ReadProduction';
// import ReadEmployeeButton from "./ReadEmployee/ReadEmployeeButton";

const PORT = require('../../config');

export default function ListProductions() {

    const [allProductions, setAllProductions] = useState([]);
    // const [employeeDataToEdit, setEmployeeDataToEdit] = useState({});
    const [productionToRead, setProductionToRead] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/productions')
            .then(({ data }) => {
                handlerLoadingSpinner();
                setAllProductions(data);
            })
            .catch((error) => console.log(error));
    }, []);

    // const deleteEmployee = (i) => {
    //     let aux = [];
    //     allEmployees?.forEach((e, j) => {
    //         if (j !== i) {
    //             aux[j] = e;
    //         }
    //     });
    //     setAllEmployees(aux);
    // };

    // const handleEditEmpoyee = (selectedEmployeeForEdit) => {
    //     setEmployeeDataToEdit(selectedEmployeeForEdit);
    //     setIsEditing(true);
    // };

    // const handleReadEmpoyee = (selectedEmployeeForRead) => {
    //     setEmployeeDataToRead(selectedEmployeeForRead);
    //     setIsReading(true);
    // };

    // const goBackToAllEmployeesTable = () => {
    //     document.title = "Empleados";
    //     setIsEditing(false);
    //     setIsReading(false);
    //     window.scrollTo(0, 0);
    // };

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

    const onClickCancelRead = () => {
        <div style={{ display: 'none' }}>{document.title = "Producciones"}</div>
        setIsReading(false);
        window.scrollTo(0, 0);
    }

    return (
        <>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." /> :

                allProductions?.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Producciones</h1>
                            <button id='editProductionButton' type="button" onClick={onClickNewProduction} className="newBtn"><FontAwesomeIcon icon={faPlus} />Nuevo</button>
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
                                    />

                                </div>
                            </>
                        </BeShowed>
                    )}

            {/* {isEditing &&
                <EditEmployee goBack={goBackToAllEmployeesTable} employeeData={employeeDataToEdit} />
            }
*/}
            {isReading &&
                <ReadProduction onClickCancelRead={onClickCancelRead} productionToRead={productionToRead} />
            }
        </>
    );
}

