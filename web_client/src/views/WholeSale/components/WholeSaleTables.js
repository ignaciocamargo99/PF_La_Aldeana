import { useGetFlavorFamilies } from 'hooks/useGetFlavorFamilies';
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes';
import React from 'react'
import AddFlavorsTable from './AddFlavorsTable'
import FlavorsToSellTable from './FlavorsToSellTable'

const WholeSaleTables = ({
    allFlavors,
    handleAddFlavor,
    handleRemoveFlavor,
    loadingFlavors,
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

    return (
        <div>
            <AddFlavorsTable
                flavorFamiliesMapped={flavorFamiliesMapped}
                flavorTypesMapped={flavorTypesMapped}
                flavors={allFlavors?.filter(f => !f.toSell)}
                handleAddFlavor={handleAddFlavor}
                loadingFlavors={loadingFlavors}
            />
            <FlavorsToSellTable
                flavorFamiliesMapped={flavorFamiliesMapped}
                flavorTypesMapped={flavorTypesMapped}
                flavorsToSell={allFlavors?.filter(f => f.toSell)}
                handleRemoveFlavor={handleRemoveFlavor}
            />
        </div>
    )
}

export default WholeSaleTables