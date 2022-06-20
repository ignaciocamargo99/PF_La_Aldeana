import React, { useEffect, useState } from 'react';
import SearchFilter from 'common/SearchFilter';
import ComboFilter from 'common/ComboFilter';
import FlavorsTablePagination from './FlavorsTablePagination';
import CleanFilters from 'common/CleanFilters';

const FlavorsSearch = ({ currentElements, flavorTypes, flavorFamilies, handleAddFlavor }) => {

console.log('FlavorsSearch')

    const [filteredElements, setFilteredElements] = useState(currentElements);
    const ID_FOR_RESET = -1;

    const [nameFilterApplied, setNameFilterApplied] = useState('')
    const [idFlavorTypeFilterApplied, setidFlavorTypeFilterApplied] = useState(ID_FOR_RESET)
    const [idFlavorFamilyFilterApplied, setidFlavorFamilyFilterApplied] = useState(ID_FOR_RESET)

    useEffect(() => {
        let filteredList = currentElements?.length > 0 ? [...currentElements] : [];

        // filtering by flavorType
        if (+idFlavorTypeFilterApplied > 0) {
            filteredList = filteredList.filter(f => {
                return +f.FlavorType.idFlavorType === +idFlavorTypeFilterApplied
            })
        }

        // filtering by flavorFamily
        if (+idFlavorFamilyFilterApplied > 0) {
            filteredList = filteredList.filter(f => {
                return +f.FlavorFamily.idFlavorFamily === +idFlavorFamilyFilterApplied
            })
        }

        // filtering by name
        if (nameFilterApplied.trim() !== '') {
            filteredList = filteredList.filter(f => {
                return f.name.toUpperCase().includes(nameFilterApplied.toUpperCase());
            })
        }

        setFilteredElements(filteredList)
    }, [currentElements, nameFilterApplied, idFlavorTypeFilterApplied, idFlavorFamilyFilterApplied])

    const cleanFilters = () => {
        setNameFilterApplied('');
        setidFlavorTypeFilterApplied(ID_FOR_RESET);
        setidFlavorFamilyFilterApplied(ID_FOR_RESET);
    }

    return (
        <>
            <div className="form-row-margin-down title-searcher">
                <div>
                </div>
                <div className="search-input" >
                    <ComboFilter
                        elements={flavorFamilies}
                        value={idFlavorFamilyFilterApplied}
                        setValue={setidFlavorFamilyFilterApplied}
                        placeholder='Familia...'
                        width='9'
                    >
                    </ComboFilter>
                    <ComboFilter
                        elements={flavorTypes}
                        value={idFlavorTypeFilterApplied}
                        setValue={setidFlavorTypeFilterApplied}
                        placeholder='Categoría...'
                        width='9'
                    >
                    </ComboFilter>
                    <SearchFilter
                        value={nameFilterApplied}
                        setValue={setNameFilterApplied}
                        placeholder="Buscar sabores..."
                    />
                    <CleanFilters onClick={cleanFilters} />
                </div>
            </div>
            <FlavorsTablePagination handleAddFlavor={handleAddFlavor} filteredElements={filteredElements} />
        </>
    )
};

export default FlavorsSearch;
