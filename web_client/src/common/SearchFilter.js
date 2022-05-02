import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SearchFilter = ({ onChange, placeholder }) => {
    return (
        <>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                </div>
                <input type="text" className="form-control" placeholder={placeholder} onChange={(e) => onChange(e.target.value)} aria-describedby="inputGroup-sizing-default" />
            </div>
        </>
    )
}

export default SearchFilter