import React from 'react'

const DateInput = ({ value, setValue }) => {
    const onChangeInputDate = ({ target }) => {
        setValue(target.value);
    }

    return (
        <div className="d-flex justify-content-between mb-2">
            <label className="align-self-center w-25" htmlFor="date" >Fecha</label>
            <input
                id="date"
                type="date"
                className="form-control align-self-center w-50"
                value={value}
                onChange={onChangeInputDate}
            >
            </input>
        </div>
    )
}

export default DateInput