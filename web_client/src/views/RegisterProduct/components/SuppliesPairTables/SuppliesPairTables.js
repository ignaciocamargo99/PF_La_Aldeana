import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
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

            if (data.editing) {
                fillSuppliesOfProduct(allSupplies)
            };

            fillSuppliesTable(allSupplies);

            handlerLoadingSpinner();
        }
        catch (error) {
            console.log(error);
            displayError();
        }
    }, []);

    const fillSuppliesTable = (supplies) => {
        supplies?.map((e, i) => e.amount = 0);
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
                amount: data.supplies.find(s => s.id_supply == id_supply).number_supply
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
                        s.amount = amount;
                    }
                })

                data.supplies = auxDestiny;
                setDestinyTable(auxDestiny);
            } else {
                supply.amount = amount;
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

        console.log(newDestinyTable)
        data.supplies = newDestinyTable;
        setDestinyTable(newDestinyTable);
        load(data);


        console.log(data.supplies)
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
            {isLoadingSpinner && (
                <SpinnerTableSupplies></SpinnerTableSupplies>
            )}
            {!isLoadingSpinner && (
                <>
                    <div className="formRow title-searcher">
                        <h4 className="text-secondary">Insumos disponibles:</h4>
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
                    <TableSuppliesDown download={download} supplies={destinyTable} />
                </>
            )}
        </>
    );
};