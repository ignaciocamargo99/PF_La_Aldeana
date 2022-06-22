import SearchFilter from 'common/SearchFilter';
import React, { useEffect, useState } from 'react';
import ComboFilter from 'common/ComboFilter';
import ProductsTablePagination from './TablePagination/ProductsTablePagination';
import CleanFilters from 'common/CleanFilters';

const ProductsSearch = ({ currentElements, allSectors, allProductTypes, handleRead, handleEdit, handleDelete, permissionsAccess }) => {

    const [filteredElements, setFilteredElements] = useState([]);
    const readOnly = +permissionsAccess === 1;
    const ID_FOR_RESET = -1;

    const [nameFilterApplied, setNameFilterApplied] = useState('');
    const [idProductTypeFilterApplied, setidProductTypeFilterApplied] = useState(ID_FOR_RESET);
    const [idSectorFilterApplied, setidSectorFilterApplied] = useState(ID_FOR_RESET);

    useEffect(() => {
        setFilteredElements(currentElements);
    }, [currentElements]);

    useEffect(() => {
        let filteredList = [...currentElements];

        // filtering by sector
        if (+idSectorFilterApplied > 0) {
            filteredList = filteredList.filter(f => {
                return +f.id_sector === +idSectorFilterApplied
            })
        }

        // filtering by productType
        if (+idProductTypeFilterApplied > 0) {
            filteredList = filteredList.filter(f => {
                return +f.id_product_type === +idProductTypeFilterApplied
            })
        }

        // filtering by name
        if (nameFilterApplied.trim() !== '') {
            filteredList = filteredList.filter(f => {
                return f.name.toUpperCase().includes(nameFilterApplied.toUpperCase());
            })
        }

        setFilteredElements(filteredList)
    }, [currentElements, nameFilterApplied, idProductTypeFilterApplied, idSectorFilterApplied]);

    const cleanFilters = () => {
        setNameFilterApplied('');
        setidProductTypeFilterApplied(ID_FOR_RESET);
        setidSectorFilterApplied(ID_FOR_RESET);
    }

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Productos disponibles:</h4>
                <div className="search-input">
                    <ComboFilter
                        elements={allSectors}
                        value={idSectorFilterApplied}
                        setValue={setidSectorFilterApplied}
                        placeholder='Rubro...'
                        width='9'
                    >
                    </ComboFilter>
                    <ComboFilter
                        elements={allProductTypes}
                        value={idProductTypeFilterApplied}
                        setValue={setidProductTypeFilterApplied}
                        placeholder='Tipo...'
                        width='9'
                    >
                    </ComboFilter>
                    <SearchFilter
                        value={nameFilterApplied}
                        setValue={setNameFilterApplied}
                        placeholder="Buscar producto..."
                    />
                    <CleanFilters onClick={cleanFilters} />
                </div>
            </div>
            <ProductsTablePagination
                readOnly={readOnly}
                filteredElements={filteredElements}
                handleRead={handleRead}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                permissionsAccess={permissionsAccess}
            ></ProductsTablePagination>
        </>
    )
}

export default ProductsSearch