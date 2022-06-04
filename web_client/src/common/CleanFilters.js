import React from 'react'

const CleanFilters = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="btn btn-info filter-btn"
        >
            Limpiar filtros
        </button>
    )
}

export default CleanFilters