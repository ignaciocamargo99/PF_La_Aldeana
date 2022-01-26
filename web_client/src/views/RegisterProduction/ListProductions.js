import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import BeShowed from "../../common/BeShowed";
import LoaderSpinner from "../../common/LoaderSpinner";
import BodyTable from "../../common/Table/BodyTable";
import HeaderTable from "../../common/Table/HeaderTable";
import Table from '../../common/Table/Table';
import TablePagination from "./components/TablePagination/TablePagination";
// import DeleteEmployeeButton from './DeleteEmployeeButton';
// import EditEmployee from "./EditEmployee/EditEmployee";
// import EditEmployeeButton from "./EditEmployee/EditEmployeeButton";
// import ReadEmployee from './ReadEmployee/ReadEmployee';
// import ReadEmployeeButton from "./ReadEmployee/ReadEmployeeButton";

const PORT = require('../../config');

export default function ListProductions() {

    const [allProductions, setAllProductions] = useState([]);
    // const [employeeDataToEdit, setEmployeeDataToEdit] = useState({});
    // const [employeeDataToRead, setEmployeeDataToRead] = useState({});
    // const [isEditing, setIsEditing] = useState(false);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    // const [isReading, setIsReading] = useState(false);

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
            width: '20%'
        },
        {
            name: 'Sabor',
            width: '15%'
        },
        {
            name: 'Descripción sabor',
            width: '35%'
        },
        {
            name: 'Ver',
            width: '10%'
        },
        {
            name: 'Editar'
        },
        {
            name: 'Eliminar'
        }
    ];

    const onClickNewProduction = () => window.location.replace('/app/production');

    // const onClickNewEmployee = () => {
    //     window.location.replace('/app/registerEmployees');
    // };

    return (
        <>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." /> :

                allProductions?.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Producciones</h1>
                            <button id='editEmployeeButton' type="button" onClick={onClickNewProduction} className="newBtn"><FontAwesomeIcon icon={faPlus} />Nuevo</button>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron producciones registrados hasta el momento.</h4>
                    </div>
                    : (
                        // <BeShowed show={!isEditing && !isReading}>
                        <>
                            <div className="viewTitleBtn">
                                <h1>Producciones</h1>
                                <button id='editEmployeeButton' onClick={onClickNewProduction} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </div>
                            <div className="viewBody">
                                <TablePagination
                                    columnsHeaders={columnsHeaders}
                                    currentElements={allProductions}
                                />
                                
                            </div>
                            </>
                        // </BeShowed>
                    )}

            {/* {isEditing &&
                <EditEmployee goBack={goBackToAllEmployeesTable} employeeData={employeeDataToEdit} />
            }

            {isReading &&
                <ReadEmployee goBack={goBackToAllEmployeesTable} employeeData={employeeDataToRead} />
            } */}
        </>
    );
}

