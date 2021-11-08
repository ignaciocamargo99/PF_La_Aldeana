import React, { useEffect, useState } from 'react';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../../../common/TablePagination/Pagination';
import BeShowed from '../../../common/BeShowed';
import validateFloatNumbers from '../../../utils/validateFloatNumbers';

export default function InstallmentTable ({ installments, reading }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(() => {
        if (installments[0].amount > 0){
            handlerLoadingSpinner();

            if (installments.length !== listTable.length) setCurrentPage(1);
            setListTable(installments);
        }
    }, [installments]);

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = listTable.filter((elem) => {
                return elem.label.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
        } else {
            setFilteredElements(listTable);
        }
    }, [nameSearch, listTable]);

    const columnsHeaders = [
        {
            name: 'Mes',
            width: '40%'
        },
        {
            name: 'Monto',
            width: '30%'
        },
        {
            name: 'Pagado',
            width: '30%'
        }
    ];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    // Amounts
    const [isValidClassAmountInstallments, setIsValidClassAmountInstallments] = useState("form-control");

    const handleAmountInstallments = (element, i) => {
        if (element.amount > 0) {
            setIsValidClassAmountInstallments("form-control is-valid");
            installments[i].amount = element.amount;
        }
        else {
            setIsValidClassAmountInstallments("form-control");
            installments[i].amount = element.amount;
        }
    }

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando cuotas" />
            )}

            {!isLoadingSpinner && (
                <>
                    <div className="formRow title-searcher">
                        <h4 className="text-secondary">Cuotas de plan de pago:</h4>
                        <div className="search-input">
                            <FontAwesomeIcon icon={faSearch} />
                            <input id="inputSearchName" type="text" placeholder="Buscar..." onChange={(e) => setNameSearch(e.target.value)}></input>
                        </div>
                    </div>
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
                                {currentElements?.map((element, i) => {
                                    return (
                                        <tr key={i}>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.label} {element.month}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <BeShowed show={reading}>
                                                    <div className="form-control-input">
                                                        <input className={isValidClassAmountInstallments} id="amountInstallments" readOnly type="number" onChange={() => handleAmountInstallments(element, i)} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} value={element.amount} />
                                                    </div>
                                                </BeShowed>
                                                <BeShowed show={!reading}>
                                                    <div className="form-control-input">
                                                        <input className={isValidClassAmountInstallments} id="amountInstallments" readOnly type="number" onChange={() => handleAmountInstallments(element, i)} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} value={element.amount} />
                                                    </div>
                                                </BeShowed>
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.pay === 1 ? "Sí" : "No"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
                </>
            )}
        </>
    )
};