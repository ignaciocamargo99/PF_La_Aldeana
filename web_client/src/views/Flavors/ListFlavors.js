import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LoaderSpinner from 'common/LoaderSpinner';
import { useGetActiveFlavors } from 'hooks/useGetActiveFlavors';
import { useGetFlavorFamilies } from 'hooks/useGetFlavorFamilies'
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes'
import FlavorsViewBody from './components/FlavorsViewBody';
import BeShowed from 'common/BeShowed';

const ListFlavors = (props) => {
    const { loadingFlavors, activeFlavors } = useGetActiveFlavors();
    const { flavorTypes } = useGetFlavorTypes();
    const { flavorFamilies } = useGetFlavorFamilies();

    const flavorTypesMapped = [...flavorTypes];
    flavorTypesMapped?.map((e) => {
        e.id = e.idFlavorType;
        e.value = e.name;
        return e;
    })

    const flavorFamiliesMapped = [...flavorFamilies];
    flavorFamiliesMapped?.map((e) => {
        e.id = e.id_family_flavor;
        e.value = e.name;
        return e;
    })

    let permissionsAccess = props.permissionsAccess;

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
                        <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                            <button
                                onClick={handleNewFlavorBtnClicked}
                                type="button"
                                className="btn btn-light newBtn"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                        <BeShowed show={permissionsAccess === 1}>
                            <button
                                disabled
                                type="button"
                                className="disabledNewBtn"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                    </div>
                    <div className="viewBody">
                        <FlavorsViewBody
                            flavorFamilies={flavorFamiliesMapped}
                            flavorTypes={flavorTypesMapped}
                            initialFlavors={activeFlavors}
                            permissionsAccess={permissionsAccess}
                        />
                    </div>
                </>
            }
        </>
    )
};

export default ListFlavors;
