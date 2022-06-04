import Axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import FlavorsSearch from './FlavorsSearch';
import displayError from 'utils/ErrorMessages/displayError';

const PORT = require('../../../config');

const FlavorsViewBody = ({ initialFlavors, permissionsAccess, flavorFamilies, flavorTypes, }) => {

    const orderFlavorsByFamilyFlavorName = (flavors) => {
        return flavors.sort((a, b) => {
            if (a.FlavorFamily.name < b.FlavorFamily.name) {
                return -1;
            }
            if (a.FlavorFamily.name > b.FlavorFamily.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    const [flavors, setflavors] = useState(orderFlavorsByFamilyFlavorName(initialFlavors))

    const thereAreNoFlavors = flavors.length === 0;

    const deleteFlavor = async (idFlavor) => {
        Axios.delete(PORT() + `/api/flavors/${idFlavor}`)
            .then(response => {
                if (response.data.flavorDeleted) {
                    swal("Sabor dado de baja exitosamente", {
                        icon: "success",
                    });
                    const updatedFlavorsList = flavors.filter(f => f.idFlavor !== idFlavor);

                    setflavors(updatedFlavorsList);
                } else {
                    displayError(response.data.message, 'Error al efectuar la baja');
                }
            })
            .catch((error) => {
                console.log(error);
                displayError();
            });
    }

    if (thereAreNoFlavors) {
        return (
            < h4 className="row justify-content-center">
                Actualmente no hay ningún sabor registrado.
            </h4 >
        )
    }
    else {
        return (
            <>
                <div style={{ display: 'none' }}>{document.title = "Sabores"}</div>
                <FlavorsSearch
                    flavorFamilies={flavorFamilies}
                    flavorTypes={flavorTypes}
                    currentElements={flavors}
                    deleteFlavor={deleteFlavor}
                    permissionsAccess={permissionsAccess}
                />
            </>
        )
    }
};

export default FlavorsViewBody;
