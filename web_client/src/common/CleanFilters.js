import React from 'react'

const CleanFilters = ({ onClick }) => {
    return (
        <div>
            <label
                className="me-3 text-decoration-underline text-primary"
                onClick={onClick}
                style={{ minWidth: '6em', cursor: 'pointer' }}
            >
                Limpiar filtros
            </label>
        </div >
    )
}

export default CleanFilters