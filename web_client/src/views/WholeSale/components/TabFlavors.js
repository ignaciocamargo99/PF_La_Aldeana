import React from 'react';
import AddFlavorsTable from './AddFlavorsTable';
import { useGetFlavorFamilies } from 'hooks/useGetFlavorFamilies';
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes';
import WholesaleFlavorsDetails from './WholesaleFlavorsDetails';

const TabFlavors = ({ allFlavors, loadingFlavors, showTab }) => {

    console.log('TabFlavors');

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
                <>
                    <h3 className="mt-2 ">Sabores</h3>
                    <AddFlavorsTable
                        flavorFamiliesMapped={flavorTypesMapped}
                        flavorTypesMapped={flavorTypes}
                        flavors={allFlavors?.filter(f => !f.toSell)}
                        handleAddFlavor={() => { }}
                        loadingFlavors={loadingFlavors}
                    />
                    <WholesaleFlavorsDetails />
                </>
            )}
        </>
    )
}

export default TabFlavors