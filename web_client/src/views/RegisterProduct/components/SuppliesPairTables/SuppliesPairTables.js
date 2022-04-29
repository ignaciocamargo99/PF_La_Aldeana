import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import BeShowed from '../../../../common/BeShowed';
import Pagination from '../../../../common/TablePagination/Pagination';
import displayError from '../../../../utils/ErrorMessages/displayError';
import warningCountProduct from '../../../../utils/WarningMessages/warningCountProduct';
import SpinnerTableSupplies from './SpinnerTableSupplies';
import SuppliesAmount from "./SuppliesAmount";
import TableSuppliesDown from "./TableSuppliesDown";

const PORT = require('../../../../config');

export default function SuppliesPairTables({ load, data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [destinyTable, setDestinyTable] = useState([]);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(async () => {
        try {
            const { data: allSupplies } = await getAllSupplies();

            if (data.editing) fillSuppliesOfProduct(allSupplies);

            fillSuppliesTable(allSupplies);
            handlerLoadingSpinner();
        }
        catch (error) {
            displayError();
        }
    }, []);

    const fillSuppliesTable = (supplies) => {
        supplies?.map((e, i) => e.number_supply = 0);
        setListTable(supplies);
    }

    const fillSuppliesOfProduct = (allSupplies) => {
        const suppliesIdsOfProduct = data.supplies.map(s => s.id_supply);

        const suppliesOfProductWithoutAmount = allSupplies.filter(s => {
            return suppliesIdsOfProduct.includes(s.id_supply)
        });

        const suppliesOfProduct = [...suppliesOfProductWithoutAmount].map(({ id_supply, name, description }) => {
            return {
                id_supply: id_supply,
                name: name,
                description: description,
                number_supply: data.supplies.find(s => s.id_supply == id_supply).number_supply
            }
        });

        setDestinyTable(suppliesOfProduct);
    }

    const getAllSupplies = () => {
        return Axios.get(PORT() + '/api/supplies');
    }

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = listTable.filter((elem) => {
                return elem.name.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
        } else {
            setFilteredElements(listTable);
        }
    }, [nameSearch, listTable]);

    const upload = (supply, amount) => {
        if (amount > 0) {

            if (destinyTable.some(s => s.id_supply == supply.id_supply)) {
                let auxDestiny = [...destinyTable];

                auxDestiny.forEach(s => {
                    if (s.id_supply === supply.id_supply) {
                        s.number_supply = amount;
                    }
                })
                data.supplies = auxDestiny;
                setDestinyTable(auxDestiny);
            } else {
                supply.number_supply = amount;
                let selectedSupplies = [...destinyTable, supply].sort();

                data.supplies = selectedSupplies;
                setDestinyTable(selectedSupplies);
            };
            load(data);
        }
        else {
            return warningCountProduct();
        };
    };

    const download = (supplySelected) => {
        let newDestinyTable = destinyTable.filter((supply) => supply.id_supply != supplySelected.id_supply);

        data.supplies = newDestinyTable;
        setDestinyTable(newDestinyTable);
        load(data);
    };

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '30%'
        },
        {
            name: 'Descripción',
            width: '30%'
        },
        {
            name: 'Cantidad',
            width: '20%'
        },
        {
            name: 'Acción',
            width: '20%'
        }
    ];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    return (
        <>
            <BeShowed show={!data.reading}>
                {isLoadingSpinner && (
                    <SpinnerTableSupplies></SpinnerTableSupplies>
                )}
                {!isLoadingSpinner && (
                    <>
                        <div className="formRow title-searcher">
                            <h4 className="text-secondary">Insumos disponibles:</h4>
                            <div className="search-input">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Buscar insumos..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                                </div>
                            </div>
                        </div>
                        {(currentElements && currentElements?.length > 0)
                            ?
                            <>
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
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.description}</td>
                                                        <SuppliesAmount supply={element} addAmountOfSupply={upload} />
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
                            </>
                            :
                            <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen insumos con el nombre ingresado...</h4>
                        }
                        <TableSuppliesDown download={download} supplies={destinyTable} data={data} />
                    </>
                )}
            </BeShowed>
            <BeShowed show={data.reading}>
                {!isLoadingSpinner ?
                    destinyTable.length > 0
                        ? <TableSuppliesDown download={download} supplies={destinyTable} data={data} />
                        : <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron insumos cargados para este producto...</h4>
                    : <SpinnerTableSupplies></SpinnerTableSupplies>
                }

            </BeShowed>

        </>
    );
};