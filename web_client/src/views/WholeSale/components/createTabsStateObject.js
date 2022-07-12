const createTabsStateObject = (showFlavorsTab, showSuppliesTab, showTransportTab, showSummaryTab) => {
    return {
        showFlavorsTab: showFlavorsTab,
        showSuppliesTab: showSuppliesTab,
        showTransportTab: showTransportTab,
        showSummaryTab: showSummaryTab,
    }
}

export default createTabsStateObject;