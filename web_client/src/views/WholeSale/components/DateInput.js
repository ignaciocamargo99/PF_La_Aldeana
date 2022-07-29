import React from 'react'

const DateInput = ({ wholesaleDate, setWholesaleDate, read }) => {

    const onChangeInputDate = ({ target }) => {
        setWholesaleDate(target.value);
    }

    return (
        <div className="d-flex justify-content-between mb-2 ">
            <label className="align-self-center w-25 fs-6" htmlFor="date" >Fecha</label>
            {read && (
                <input
                    id="date"
                    defaultValue={wholesaleDate}
                    type="date"
                    className="form-control align-self-center w-50 fs-6"
                    readOnly
                />
            )}

            {!read && (
                <input
                    id="date"
                    value={wholesaleDate}
                    type="date"
                    className="form-control align-self-center w-50 fs-6"
                    onChange={onChangeInputDate}
                />
            )}
        </div>
    )
}

export default DateInput