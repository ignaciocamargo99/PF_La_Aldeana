import FlavorsSearch from './FlavorsSearch';

const FlavorsTableFilter = ({
    flavorFamilies,
    flavorTypes,
    handleAddFlavor,
    initialFlavors,
}) => {

    console.log('FlavorsTableFilter');

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

    const flavors = orderFlavorsByFamilyFlavorName(initialFlavors)

    const thereAreNoFlavors = flavors?.length === 0;

    if (thereAreNoFlavors) {
        return (
            < label className="row justify-content-center fs-6">
                Actualmente no hay ningún sabor disponible.
            </label >
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
