import React from 'react'

const DateInput = ({ wholesaleDate, setWholesaleDate }) => {

    console.log('DateInput');

    const onChangeInputDate = ({ target }) => {
        setWholesaleDate(target.value);
    }

    return (
        <div className="d-flex justify-content-between mb-2 ">
            <label className="align-self-center w-25 fs-6" htmlFor="date" >Fecha</label>
            <input
                id="date"
                value={wholesaleDate}
                type="date"
                className="form-control align-self-center w-50 fs-6"
                onChange={onChangeInputDate}
            >
            </input>
        </div>
    )
}

export default DateInput