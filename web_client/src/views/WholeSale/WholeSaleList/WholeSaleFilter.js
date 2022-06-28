import { useEffect, useState } from 'react';
import getWholeSales from '../customHooks/getWholeSales';
import WholeSaleTablePagination from './WholeSaleTablePagination';
import { formatDateEnd, formatDateStart } from './formatDate';

export const WholeSaleFilter = ({ currentElements, readOnly }) => {
    const [filteredElements, setFilteredElements] = useState([]);
    const [chkFinalSale, setChkFinalSale] = useState(false);
    const [chkPendingSale, setChkPendingSale] = useState(true);
    const [startDate, setStartDate] = useState(formatDateStart());
    const [endDate, setEndDate] = useState(formatDateEnd());

    useEffect(() => setFilteredElements(currentElements), [currentElements]);

    useEffect(() => {
        localStorage.setItem('PENDING_SALES', JSON.stringify(currentElements))
    }, []);

    useEffect(() => {
        if (chkFinalSale) {
            getWholeSales('FINISH', startDate, endDate).then((result) => {
                setFilteredElements(result);
            })
        }
    }, [startDate, endDate, chkFinalSale]);

    const handleChangePending = (e) => {
        e.target.checked = true;
        setChkPendingSale(true);
        setChkFinalSale(false);
        const pendingSales = JSON.parse(localStorage.getItem('PENDING_SALES'));
        setFilteredElements(pendingSales);
    }

    const handleChangeFinal = (e) => {
        e.target.checked = true;
        setChkPendingSale(false);
        setChkFinalSale(true);
        getWholeSales('FINISH', startDate, endDate).then((result) => {
            setFilteredElements(result);
        })
    }

    const handleStartDate = (e) => {
        setStartDate(formatDateStart(e.target.value));

    }

    const handleFinalDate = (e) => {
        setEndDate(formatDateEnd(e.target.value));

    }

    return (
        <>
            <div className="formRow">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio"
                        name="flexRadioDefault" id="flexRadioDefault1"
                        onChange={handleChangePending} checked={chkPendingSale}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Pendientes
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio"
                        name="flexRadioDefault" id="flexRadioDefault2"
                        onChange={handleChangeFinal} checked={chkFinalSale}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Finalizadas
                    </label>
                </div>
            </div>
            {(chkFinalSale && startDate && endDate) &&
                (
                    <div className="formRow">
                        <div className="col-3 me-3">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Fecha desde</span>
                                <input type="date" className="form-control"
                                    aria-label="Sizing example input"
                                    // min={startDate} max={endDate}
                                    onChange={handleStartDate}
                                    aria-describedby="inputGroup-sizing-default" value={startDate} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Fecha hasta</span>
                                <input type="date" className="form-control"
                                    aria-label="Sizing example input"
                                    // min={startDate}
                                    onChange={handleFinalDate}
                                    aria-describedby="inputGroup-sizing-default" value={endDate} />
                            </div>
                        </div>
                    </div>
                )
            }
            <WholeSaleTablePagination
                readOnly={readOnly}
                filteredElements={filteredElements}
            />
        </>
    )
}