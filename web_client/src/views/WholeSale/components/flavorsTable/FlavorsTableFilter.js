import FlavorsSearch from './FlavorsSearch';

const FlavorsTableFilter = ({
    flavorFamilies,
    flavorTypes,
    handleAddFlavor,
    initialFlavors,
}) => {

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

    const flavors = orderFlavorsByFamilyFlavorName(initialFlavors);

    const thereAreNoFlavors = flavors?.length === 0;

    if (thereAreNoFlavors) {
        return (
            < h4 className="row justify-content-center">
                Actualmente no hay ningún sabor disponible.
            </h4 >
        )
    }

    if (!thereAreNoFlavors) {
        return (
            <>
                <FlavorsSearch
                    flavorFamilies={flavorFamilies}
                    flavorTypes={flavorTypes}
                    currentElements={flavors}
                    handleAddFlavor={handleAddFlavor}
                />
            </>
        )
    }
};

export default FlavorsTableFilter;
