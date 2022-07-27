import { useEffect, useState } from 'react';
import getWholeSales from '../customHooks/getWholeSales';
import WholeSaleTablePagination from './WholeSaleTablePagination';
import { formatDateEnd, formatDateStart } from './formatDate';

export const WholeSaleFilter = ({ currentElements, permissionsAccess }) => {
    const [filteredElements, setFilteredElements] = useState([]);
    const [startDate, setStartDate] = useState(formatDateStart());
    const [endDate, setEndDate] = useState(formatDateEnd());

    useEffect(() => setFilteredElements(currentElements), [currentElements]);

    useEffect(() => {
        getWholeSales('FINISH', startDate, endDate).then((result) => {
            setFilteredElements(result);
        })
    }, [startDate, endDate]);

    const handleStartDate = (e) => {
        setStartDate(formatDateStart(e.target.value));

    }

    const handleFinalDate = (e) => {
        setEndDate(formatDateEnd(e.target.value));

    }

    return (
        <>
            <div className="formRow">
            </div>
            {(startDate && endDate) &&
                (
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
                )
            }
            <WholeSaleTablePagination
                permissionsAccess={permissionsAccess}
                filteredElements={filteredElements}
            />
        </>
    )
}