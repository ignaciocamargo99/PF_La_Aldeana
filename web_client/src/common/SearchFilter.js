import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SearchFilter = ({ onChange }) => {
    return (
        <>
            <FontAwesomeIcon icon={faSearch} />
            <input id="inputSearchName" type="text" placeholder="Buscar..." onChange={(e) => onChange(e.target.value)}></input>
        </>
    )
}

export default SearchFilter