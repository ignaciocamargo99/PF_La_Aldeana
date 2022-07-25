const filterFlavorsByCategory = (categoryId, flavors) => {
    return flavors.filter(f => +f.FlavorType.idFlavorType === +categoryId);
}

export default filterFlavorsByCategory;