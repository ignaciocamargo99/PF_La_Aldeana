import React from 'react'

const ItemDetailPlaceholder = ({ description, value }) => {
    return (
        <div className='d-flex justify-content-between text-black-50'>
            <label>&nbsp;{description}</label>
            <label>$&nbsp;{value || '---'}</label>
        </div>
    )
}

export default ItemDetailPlaceholder