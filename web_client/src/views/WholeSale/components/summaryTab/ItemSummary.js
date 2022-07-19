import React from 'react'

const ItemSummary = ({ name, value }) => {
    return (
        <div className={`d-flex justify-content-between`}>
            <label>{name}</label>
            <label>$&nbsp;{value || '---'}</label>
        </div>
    )
}

export default ItemSummary