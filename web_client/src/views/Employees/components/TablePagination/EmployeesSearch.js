import SearchFilter from 'common/SearchFilter';
import React, { useEffect, useState } from 'react';
import EmployeesTablePagination from './EmployeesTablePagination';

const EmployeesSearch = ({ currentElements, handleRead, handleEdit, permissionsAccess }) => {

    const readOnly = +permissionsAccess === 1;

    const [filteredElements, setFilteredElements] = useState([]);
    const [nameFilterApplied, setNameFilterApplied] = useState('');

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
    }, [currentElements, nameFilterApplied]);

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Empleados activos:</h4>
                <div className="search-input">
                    <SearchFilter
                        value={nameFilterApplied}
                        setValue={setNameFilterApplied}
                        placeholder="Buscar empleado..."
                    />
                </div>
            </div>
            <EmployeesTablePagination
                readOnly={readOnly}
                permissionsAccess={permissionsAccess}
                handleRead={handleRead}
                handleEdit={handleEdit}
                filteredElements={filteredElements}
            />
        </>
    )
};

export default EmployeesSearch;
