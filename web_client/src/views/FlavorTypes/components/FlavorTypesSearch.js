import SearchFilter from 'common/SearchFilter';
import React, { useEffect, useState } from 'react';
import FlavorTypesTablePagination from './FlavorTypesTablePagination';

const FlavorTypesSearch = ({ currentElements, readOnly }) => {
    const [filteredElements, setFilteredElements] = useState([]);
    const [nameFilterApplied, setNameFilterApplied] = useState('')

    useEffect(() => {
        setFilteredElements(currentElements);
    }, [currentElements]);

    useEffect(() => {
        let filteredList = [...currentElements];

        // filtering by name
        if (nameFilterApplied.trim() !== '') {
            filteredList = filteredList.filter(f => {
                return f.name.toUpperCase().includes(nameFilterApplied.toUpperCase());
            })
        }

        setFilteredElements(filteredList)
    }, [currentElements, nameFilterApplied])

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Categorías disponibles:</h4>
                <div className="search-input">
                    <SearchFilter
                        value={nameFilterApplied}
                        setValue={setNameFilterApplied}
                        placeholder="Buscar categorías..."
                    />
                </div>
            </div>
            <FlavorTypesTablePagination
                readOnly={readOnly}
                filteredElements={filteredElements}
            />

        </>
    )
}

export default FlavorTypesSearch