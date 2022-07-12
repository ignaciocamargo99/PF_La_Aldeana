import { useGetActiveFlavors } from 'hooks/useGetActiveFlavors';
import { useGetSupplies } from 'hooks/useGetSupplies';
import { useEffect, useState } from 'react';
import createTabsStateObject from './components/createTabsStateObject';
import DateInput from './components/DateInput';
import FranchiseInput from './components/FranchiseInput';
import NextTab from './components/NextTab';
import TabFlavors from './components/TabFlavors';
import Tabs from './components/Tabs';
import TabSummary from './components/TabSummary';
import TabSupplies from './components/TabSupplies';
import TabTransport from './components/TabTransport';

const WholeSalesViewBody = () => {

    const { activeFlavors, loadingFlavors } = useGetActiveFlavors();
    const { supplies, loadingSupplies } = useGetSupplies({ forWholesale: true });

    // wholesale date
    const [wholesaleDate, setWholesaleDate] = useState('');
    // wholesale franchise
    const [wholesaleFranchise, setWholesaleFranchise] = useState(null);
    // wholesale flavors (only when flavor.toSell === true)
    const [allFlavors, setAllFlavors] = useState();
    // wholesale flavors buckets weights
    const [bucketsWeights, setBucketsWeights] = useState([]);
    // wholesale supplies (only when supply.toSell === true)
    const [allSupplies, setAllSupplies] = useState();
    // wholesale transport
    // to do

    const [tabs, setTabs] = useState(createTabsStateObject(true, false, false, false));

    useEffect(() => {
        if (activeFlavors?.length > 0) {
            setAllFlavors(activeFlavors)
        } else {
            setAllFlavors([])
        }
    }, [activeFlavors])

    useEffect(() => {
        if (supplies?.length > 0) {
            setAllSupplies(supplies)
        } else {
            setAllSupplies([])
        }
    }, [supplies])

    return (
        <>
            <div style={{ maxWidth: '40em' }}>
                <DateInput wholesaleDate={wholesaleDate} setWholesaleDate={setWholesaleDate} />
                <FranchiseInput wholesaleFranchise={wholesaleFranchise} setWholesaleFranchise={setWholesaleFranchise} />
            </div>
            <Tabs tabs={tabs} setTabs={setTabs} />
            <TabFlavors
                showTab={tabs.showFlavorsTab}
                allFlavors={allFlavors}
                setAllFlavors={setAllFlavors}
                bucketsWeights={bucketsWeights}
                setBucketsWeights={setBucketsWeights}
                loadingFlavors={loadingFlavors}
            />
            <TabSupplies
                showTab={tabs.showSuppliesTab}
                allSupplies={allSupplies}
                setAllSupplies={setAllSupplies}
                loadingSupplies={loadingSupplies}
            />
            <TabTransport showTab={tabs.showTransportTab} />
            <TabSummary showTab={tabs.showSummaryTab} />
            <NextTab tabs={tabs} setTabs={setTabs} />
        </>
    )
}

export default WholeSalesViewBody