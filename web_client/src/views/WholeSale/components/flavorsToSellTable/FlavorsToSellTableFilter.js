import FlavorsToSellTableSearch from './FlavorsToSellTableSearch';

const FlavorsToSellTableFilter = ({ flavorsToSell, flavorFamilies, flavorTypes, handleRemoveFlavor }) => {

    const orderFlavorsByFamilyFlavorName = (flavors) => {
        if (flavors?.length > 0) {
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

        return [];
    }

    return (
        <>
            <FlavorsToSellTableSearch
                flavorFamilies={flavorFamilies}
                flavorTypes={flavorTypes}
                currentElements={orderFlavorsByFamilyFlavorName(flavorsToSell)}
                handleRemoveFlavor={handleRemoveFlavor}
            />
        </>
    )
};

export default FlavorsToSellTableFilter;
