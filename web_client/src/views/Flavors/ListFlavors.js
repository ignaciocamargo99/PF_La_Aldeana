import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetActiveFlavors } from '../../hooks/useGetActiveFlavors';
import ListFlavorsTable from './components/ListFlavorsTable';

const ListFlavors = () => {
    const { loadingFlavors, activeFlavors } = useGetActiveFlavors();

    const handleNewFlavorBtnClicked = () => {
        window.location.replace('/app/flavors/new');
    };

    return (
        <>
            {loadingFlavors &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {!loadingFlavors &&
                <>
                    <div className="viewTitleBtn">
                        <h1>Sabores</h1>
                        <button
                            onClick={handleNewFlavorBtnClicked}
                            type="button"
                            className="newBtn"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Nuevo
                        </button>
                    </div>
                    <div className="viewBody">
                        <ListFlavorsTable
                            initialFlavors={activeFlavors}
                        >
                        </ListFlavorsTable>
                    </div>
                </>
            }
        </>
    )
};

export default ListFlavors;
