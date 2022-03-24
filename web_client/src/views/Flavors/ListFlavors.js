import React from 'react';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetActiveFlavors } from '../../hooks/useGetActiveFlavors';
import ListFlavorsTable from './components/ListFlavorsTable';

const ListFlavors = () => {
    const { loadingFlavors, activeFlavors } = useGetActiveFlavors();

    return (
        <>
            {loadingFlavors &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {!loadingFlavors &&
                <>
                    <div className="viewTitleBtn">
                        <h1>Sabores</h1>
                    </div>
                    <div className="viewBody">
                    <ListFlavorsTable
                        flavors={activeFlavors}
                        >
                    </ListFlavorsTable>
                        </div>
                </>
            }
        </>
    )
};

export default ListFlavors;
