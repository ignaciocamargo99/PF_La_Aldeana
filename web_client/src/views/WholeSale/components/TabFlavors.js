import React from 'react';
import AddFlavorsTable from './AddFlavorsTable';
import { useGetFlavorFamilies } from 'hooks/useGetFlavorFamilies';
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes';
import WholesaleFlavorsDetails from './WholesaleFlavorsDetails';

const TabFlavors = ({
    allFlavors,
    bucketsWeights,
    loadingFlavors,
    setAllFlavors,
    setBucketsWeights,
    showTab,
}) => {

    const { flavorTypes } = useGetFlavorTypes();
    const { flavorFamilies } = useGetFlavorFamilies();

    const flavorTypesMapped = flavorTypes?.length > 0 ? [...flavorTypes] : [];
    flavorTypesMapped?.map((e) => {
        e.id = e.idFlavorType;
        e.value = e.name;
        return e;
    })

    const flavorFamiliesMapped = flavorFamilies?.length > 0 ? [...flavorFamilies] : [];
    flavorFamiliesMapped?.map((e) => {
        e.id = e.id_family_flavor;
        e.value = e.name;
        return e;
    })

    const handleAddFlavor = (flavor, amount) => {
        let auxFlavors = [...allFlavors];
        for (let i = 0; i < auxFlavors.length; i++) {
            if (+auxFlavors[i].idFlavor === +flavor.idFlavor) {
                auxFlavors[i].toSell = true;
                auxFlavors[i].amountToSell = +amount;
                break;
            }
        }

        setAllFlavors(auxFlavors);
    }

    const handleRemoveFlavor = (flavor) => {
        let auxFlavors = [...allFlavors];
        for (let i = 0; i < auxFlavors.length; i++) {
            if (+auxFlavors[i].idFlavor === +flavor.idFlavor) {
                auxFlavors[i].toSell = false;
                delete auxFlavors[i].amountToSell;
                break;
            }
        }

        setAllFlavors(auxFlavors);
    }

    const modifyFlavorAmountToSell = (flavor, amount) => {
        let enableUpdate = false;
        let auxFlavors = [...allFlavors];

        for (let i = 0; i < auxFlavors.length; i++) {
            if (+auxFlavors[i].idFlavor === +flavor.idFlavor) {
                // +1 -1
                const aux = +auxFlavors[i].amountToSell + amount;
                // remove flavor from wholesale
                if (aux <= 0) {
                    auxFlavors[i].toSell = false;
                    delete auxFlavors[i].amountToSell;
                    enableUpdate = true;
                }
                // update flavor amountToSell +1 -1
                if ((aux > 0) && (aux <= auxFlavors[i].stock)) {
                    auxFlavors[i].amountToSell = aux;
                    enableUpdate = true;
                }

                break;
            }
        }

        if (enableUpdate) {
            setAllFlavors(auxFlavors);
        }

    }

    return (
        <>
            {showTab && (
                <>
                    <h3 className="mt-2 ">Sabores</h3>
                    <AddFlavorsTable
                        flavorFamiliesMapped={flavorTypesMapped}
                        flavorTypesMapped={flavorTypes}
                        flavors={allFlavors?.filter(f => !f.toSell)}
                        handleAddFlavor={handleAddFlavor}
                        loadingFlavors={loadingFlavors}
                    />
                    <WholesaleFlavorsDetails
                        flavors={allFlavors?.filter(f => f.toSell)}
                        handleRemoveFlavor={handleRemoveFlavor}
                        modifyFlavorAmountToSell={modifyFlavorAmountToSell}
                        bucketsWeights={bucketsWeights}
                        setBucketsWeights={setBucketsWeights}
                    />
                </>
            )}
        </>
    )
}

export default TabFlavors