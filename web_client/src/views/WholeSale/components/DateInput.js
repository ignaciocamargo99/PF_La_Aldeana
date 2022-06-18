import React from 'react'

const DateInput = ({ value, setValue }) => {
    const onChangeInputDate = ({ target }) => {
        setValue(target.value);
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="date" >Fecha*</label>
            </div>
            <div className="form-control-input-mw-50">
                <input
                    id="date"
                    type="date"
                    className="form-control"
                    value={value}
                    onChange={onChangeInputDate}
                >
                </input>
            </div>
        </div>
    )
}

export default DateInput