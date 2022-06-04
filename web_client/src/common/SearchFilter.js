import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import WindowClose from './WindowClose';

const SearchFilter = ({ value, setValue, placeholder }) => {

    const handleOnChange = (e) => {
        setValue(e.target.value.trim())
    }

    const clearClicked = () => {
        setValue('')
    }

    return (
        <div className='d-flex flex-row align-items-center'>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleOnChange}
                    aria-describedby="inputGroup-sizing-default"
                />
            </div>
            <WindowClose onNClick={clearClicked} />
        </div>
    )
}

export default SearchFilter