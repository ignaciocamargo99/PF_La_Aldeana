import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateProductionFlavors } from '../../../actions/FlavorActions';
import LoaderSpinner from '../../../common/LoaderSpinner';
import Pagination from '../../../common/TablePagination/Pagination';
import warningMessage from '../../../utils/WarningMessages/warningMessage';
import FlavorsAmount from './FlavorsAmount';
import TableFlavorsDown from './TableFlavorsDown';

const PORT = require('../../../config');

const FlavorsTable = ({ updateProductionFlavors, data }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [destinyTable, setDestinyTable] = useState([]);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [flavorsToRead, setFlavorsToRead] = useState([]);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/flavors')
            .then((response) => {
                handlerLoadingSpinner();
                let auxFlavor = response.data;
                auxFlavor?.map((e, i) => e.quantity = 0);
                setListTable(auxFlavor);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

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

    const upload = (flavor, quantity) => {
        if (quantity > 0) {
            flavor.quantity = quantity;

            if (destinyTable.some(s => s.id_flavor == flavor.id_flavor)) {
                let auxDestiny = [...destinyTable];
                setDestinyTable(auxDestiny);
                updateProductionFlavors(auxDestiny);
            } else {
                let selectedFlavors = [...destinyTable, flavor].sort();
                setDestinyTable(selectedFlavors);
                updateProductionFlavors(selectedFlavors);
            };
        }
        else {
            warningMessage("Atención", "Se debe ingresar una cantidad válida para el sabor.", "info");
        };
    };

    const download = (flavorSelected) => {
        let newDestinyTable = destinyTable.filter((flavor) => flavor.id_flavor != flavorSelected.id_flavor);

        setDestinyTable(newDestinyTable);
        updateProductionFlavors(newDestinyTable);
    };

    const columnsHeaders = [
        {
            name: 'Sabor',
            width: '40%'
        },
        {
            name: 'Cantidad (Baldes)',
            width: '30%'
        },
        {
            name: 'Agregar',
            width: '30%'
        }
    ];

    useEffect(() => {
        Axios.get(PORT() + `/api/productions/${data.id_production}`)
            .then((response) => {
                handlerLoadingSpinner();
                setFlavorsToRead(response.data);
                if(data.editing) {
                    setDestinyTable(response.data);
                    updateProductionFlavors(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando sabores" />
            )}

            {!isLoadingSpinner && (
                <>
                    {!data.reading && (
                        <>
                            <div className="formRow title-searcher">
                                <h4 className="text-secondary">Sabores disponibles:</h4>
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
                                                    <FlavorsAmount flavor={element} addAmountOfFlavor={upload} />
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
                            <TableFlavorsDown flavors={destinyTable} download={download} data={data}></TableFlavorsDown>
                        </>
                    )}
                    {data.reading && flavorsToRead.length > 0 && (<TableFlavorsDown flavors={flavorsToRead} data={data}></TableFlavorsDown>)}
                </>
            )}
        </>
    )
};

const mapStateToProps = state => {
    return {
        productionFlavors: state.productionFlavors
    }
}

const mapDispatchToProps = {
    updateProductionFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(FlavorsTable);