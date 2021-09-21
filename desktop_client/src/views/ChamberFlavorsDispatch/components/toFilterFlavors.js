export default function toFilterFlavors(nameToSearch, flavorsToDispatch, allFlavorsToDispatch, updateFlavors) {
    if (nameToSearch.trim() && nameToSearch.length >= 10) {
        let x = [];
        x.length = flavorsToDispatch.length;
        flavorsToDispatch.filter((flavor, i) => {
            if (flavor.name.toUpperCase().includes(nameToSearch.toUpperCase().trim())) x[i] = flavor;
        });
        updateFlavors(x);
    }
    else {
        let x = []
        x.length = allFlavorsToDispatch.length;
        allFlavorsToDispatch.filter((flavor, i) => {
            if (flavor.name.toUpperCase().includes(nameToSearch.toUpperCase().trim())) x[i] = flavor;
        });
        updateFlavors(x);
    }
}

