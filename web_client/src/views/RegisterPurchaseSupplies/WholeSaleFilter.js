import { useEffect, useState } from 'react';
import getWholeSales from './customHooks/getWholeSales';
import WholeSaleTablePagination from './WholeSaleTablePagination';
import { formatDateEnd, formatDateStart } from './formatDate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validateFloatNumbers from "utils/validateFloatNumbers";

export const WholeSaleFilter = ({ currentElements, permissionsAccess }) => {
    const [filteredElements, setFilteredElements] = useState([]);
    const [startDate, setStartDate] = useState(formatDateStart());
    const [endDate, setEndDate] = useState(formatDateEnd());
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => setFilteredElements(currentElements), [currentElements]);

    useEffect(() => {
        getWholeSales('FINISH', startDate, endDate).then((result) => {
            if (nameSearch !== "") {
                const filteredElementsList = result.filter((elem) => {
                    return elem.number.toString().includes(nameSearch);
                });
    
                setFilteredElements(filteredElementsList);
            } else {
                setFilteredElements(result);
            }
        })
    }, [startDate, endDate, nameSearch]);

    const handleStartDate = (e) => {
        setStartDate(formatDateStart(e.target.value));

    }

    const handleFinalDate = (e) => {
        setEndDate(formatDateEnd(e.target.value));

    }

    const validateNumber = (e) => {
        if (e.target.value.length > 15) e.target.value = e.target.value.slice(0, 15);
    }

    return (
        <>
            <div className="formRow">
            </div>
            {(startDate && endDate) &&
                (
                <>
                    <div className="formRow">
                        <div className="col-3 me-3">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Fecha desde</span>
                                <input type="date" className="form-control"
                                    aria-label="Sizing example input"
                                    max={endDate}
                                    onChange={handleStartDate}
                                    aria-describedby="inputGroup-sizing-default" value={startDate} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Fecha hasta</span>
                                <input type="date" className="form-control"
                                    aria-label="Sizing example input"
                                    min={startDate}
                                    onChange={handleFinalDate}
                                    aria-describedby="inputGroup-sizing-default" value={endDate} />
                            </div>
                        </div>
                    </div>
                    <div className="formRow title-searcher">
                        <h4 className="text-secondary">Ingreso:</h4>
                        <div className="search-input">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                                </div>
                                <input id="inputSearchName" onInput={(e) => validateNumber(e)} onKeyDown={(e) => validateFloatNumbers(e)} 
                            aria-describedby="inputGroup-sizing-default" className="form-control" type="number" placeholder="Buscar..." onChange={(e) => setNameSearch(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                </>
                )
            }
            <WholeSaleTablePagination
                permissionsAccess={permissionsAccess}
                filteredElements={filteredElements}
            />
        </>
    )
}