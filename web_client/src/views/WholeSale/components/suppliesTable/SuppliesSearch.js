import CleanFilters from 'common/CleanFilters';
import SearchFilter from 'common/SearchFilter';
import { useEffect, useState } from 'react';
import SuppliesTablePagination from './SuppliesTablePagination';

const SuppliesSearch = ({ currentElements, handleAddSupply }) => {
    const [filteredElements, setFilteredElements] = useState(currentElements);

    const [nameFilterApplied, setNameFilterApplied] = useState('')

    useEffect(() => {
        let filteredList = currentElements?.length > 0 ? [...currentElements] : [];
        // filtering by name
        if (nameFilterApplied.trim() !== '') {
            filteredList = filteredList.filter(f => {
                return f.name.toUpperCase().includes(nameFilterApplied.toUpperCase());
            })
        }

        setFilteredElements(filteredList)
    }, [currentElements, nameFilterApplied])

    const cleanFilters = () => {
        setNameFilterApplied('');
    }

    return (
        <>
            <div className="form-row-margin-down title-searcher">
                <div>
                </div>
                <div className="search-input" >
                    <SearchFilter
                        value={nameFilterApplied}
                        setValue={setNameFilterApplied}
                        placeholder="Buscar insumos..."
                    />
                    <CleanFilters onClick={cleanFilters} />
                </div>
            </div>
            <SuppliesTablePagination handleAddSupply={handleAddSupply} filteredElements={filteredElements} />
        </>
    )
}

export default SuppliesSearch