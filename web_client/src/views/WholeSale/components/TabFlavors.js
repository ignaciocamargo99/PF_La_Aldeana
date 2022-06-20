import React from 'react';
import AddFlavorsTable from './AddFlavorsTable';
import { useGetFlavorFamilies } from 'hooks/useGetFlavorFamilies';
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes';

const TabFlavors = ({ allFlavors, loadingFlavors, showTab }) => {
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
        <>
            {showTab && (
                <AddFlavorsTable
                    flavorFamiliesMapped={flavorTypesMapped}
                    flavorTypesMapped={flavorTypes}
                    flavors={allFlavors?.filter(f => !f.toSell)}
                    handleAddFlavor={() => { }}
                    loadingFlavors={loadingFlavors}
                />
            )}
        </>
    )
}

export default TabFlavors