import getLastDayOfPreviousonthAsDate from './getLastMonthDate';

const DateRange = ({
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    setShowReportSection,
    showReportSection,
}) => {
    const maxDatePossible = getLastDayOfPreviousonthAsDate();

    const onChangeDateFrom = (e) => {
        if (showReportSection) {
            setShowReportSection(false);
        }

        const updateDate = e.target.value;
        if (updateDate > dateTo) {
            setDateFrom(updateDate)
            setDateTo(updateDate)
            return;
        }

        setDateFrom(updateDate);
    }

    const onChangeDateTo = (e) => {
        if (showReportSection) {
            setShowReportSection(false);
        }

        const updateDate = e.target.value;
        if (updateDate < dateFrom) {
            setDateFrom(updateDate)
            setDateTo(updateDate)
            return;
        }

        setDateTo(updateDate)
    }

    return (
        <div className="formRow d-flex justify-content-between">
            <label className="col-sm-5">Seleccione el rango de fechas sobre el que desea generar el informe:</label>

            <div className="search-input">
                <div className="input-group" style={{ marginLeft: 'auto' }}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Fecha desde</span>
                    </div>
                    <input
                        className="form-control"
                        max={maxDatePossible}
                        onChange={onChangeDateFrom}
                        type="month"
                        value={dateFrom}
                    ></input>
                </div>
            </div>
            <div className="search-input">
                <div className="input-group">
                    <div className="input-group-prepend" style={{ marginLeft: 'auto' }}>
                        <span className="input-group-text" id="inputGroup-sizing-default">Fecha hasta</span>
                    </div>
                    <input
                        className="form-control"
                        max={maxDatePossible}
                        onChange={onChangeDateTo}
                        style={{ maxWidth: "9em" }}
                        type="month"
                        value={dateTo}
                    ></input>
                </div>
            </div>
        </div>
    )
}

export default DateRange