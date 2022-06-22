import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DynamicSearch = (props) => {
    return (
        <div className='row align-items-center'>
            <div className='col-sm-2'>
                <label>Buscar <FontAwesomeIcon icon={faSearch} /></label>
            </div>
            <div className='col-sm-5'>
                <input className="form-control" id="inputSearchName" type="text" placeholder={props.placeholder} value={props.searchState} onChange={(e) => props.setSearchState(e.target.value)}></input>
            </div>
        </div>
    )
}

export default DynamicSearch