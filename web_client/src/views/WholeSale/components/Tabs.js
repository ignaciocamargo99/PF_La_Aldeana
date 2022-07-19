import createTabsStateObject from "./createTabsStateObject";

const Tabs = ({ tabs, setTabs }) => {

    const defaultTabStyle = 'nav-link text-dark';
    const activeTabStyle = 'nav-link active bg-la-aldeana-violeta text-white';
    const activeTabStyle2 = 'nav-link active bg-la-aldeana-naranja text-black fw-bold';

    const onClickTab = (tabName) => {
        let auxTabs = {};

        switch (tabName) {
            case 'showFlavorsTab':
                auxTabs = createTabsStateObject(true, false, false, false);
                break;
            case 'showSuppliesTab':
                auxTabs = createTabsStateObject(false, true, false, false);
                break;
            case 'showTransportTab':
                auxTabs = createTabsStateObject(false, false, true, false);
                break;
            case 'showSummaryTab':
                auxTabs = createTabsStateObject(false, false, false, true);
                break;
            default:
                auxTabs = createTabsStateObject(false, false, false, false);
                break;
        }

        setTabs(auxTabs);
    }

    return (
        <div>
            <ul className="nav nav-tabs justify-content-end">
                <li className="nav-item ">
                    <button className={tabs.showFlavorsTab ? activeTabStyle : defaultTabStyle} onClick={() => { onClickTab('showFlavorsTab') }}>Sabores</button>
                </li>
                <li className="nav-item">
                    <button className={tabs.showSuppliesTab ? activeTabStyle : defaultTabStyle} onClick={() => { onClickTab('showSuppliesTab') }}>Insumos</button>
                </li>
                <li className="nav-item">
                    <button className={tabs.showTransportTab ? activeTabStyle : defaultTabStyle} onClick={() => { onClickTab('showTransportTab') }}>Flete</button>
                </li>
                <li className="nav-item">
                    <button className={tabs.showSummaryTab ? activeTabStyle2 : defaultTabStyle} onClick={() => { onClickTab('showSummaryTab') }}>Finalizar</button>
                </li>
            </ul>
        </div>
    )
}

export default Tabs