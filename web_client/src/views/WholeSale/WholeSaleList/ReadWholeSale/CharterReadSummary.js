import React from 'react'

const CharterReadSummary = ({ name, value }) => {
    return (
        <>
            <h3>{name}</h3>
            <div className='d-flex justify-content-between'>
                <label>&nbsp;Costo</label>
                <label>$&nbsp;{value || '0'}</label>
            </div>
        </>
    )
}

export default CharterReadSummary