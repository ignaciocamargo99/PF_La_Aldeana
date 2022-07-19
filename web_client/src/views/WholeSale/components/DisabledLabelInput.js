import React from 'react'

const DisabledLabelInput = ({ name, value }) => {
    return (
        <div className="d-flex justify-content-between mb-2">
            <label className="align-self-center w-25 fs-6">{name}</label>
            <input
                className="form-control align-self-center w-50 fs-6"
                defaultValue={value}
                disabled
            >
            </input>
        </div>
    )
}

export default DisabledLabelInput