import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'; 

const DynamicSearch = (props) => {
    return(
        <>
            <label className="col-sm-2">Buscar <FontAwesomeIcon icon={faSearch} /></label>
            <input className="col-sm-10" type="text" placeholder={props.placeholder} onChange={(e) => props.setSearchState(e.target.value)}></input>
        </>
    )
}

export default DynamicSearch