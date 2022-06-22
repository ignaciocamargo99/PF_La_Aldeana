import { useGetActiveFlavors } from 'hooks/useGetActiveFlavors';
import { useEffect, useState } from 'react';
import DateInput from './components/DateInput';
import FranchiseInput from './components/FranchiseInput';
import TabFlavors from './components/TabFlavors';
import Tabs from './components/Tabs';
import TabSummary from './components/TabSummary';
import TabSupplies from './components/TabSupplies';
import TabTransport from './components/TabTransport';

const WholeSalesViewBody = () => {

    console.log('WholeSalesViewBody');

    const { activeFlavors, loadingFlavors } = useGetActiveFlavors();

    // wholesale date
    const [wholesaleDate, setWholesaleDate] = useState('');
    // wholesale franchise
    const [wholesaleFranchise, setWholesaleFranchise] = useState(null);
    // wholesale flavors (only when flavor.toSell === true)
    const [allFlavors, setAllFlavors] = useState();

    const [tabs, setTabs] = useState({ showFlavorsTab: true, showSuppliesTab: false, showTransportTab: false, showSummaryTab: false, })

    useEffect(() => {
        if (activeFlavors?.length > 0) {
            console.log('hola');
            setAllFlavors(activeFlavors)
        } else {
            console.log('hola');
            setAllFlavors([])
        }
    }, [activeFlavors])

    return (
        <>
            <div style={{ maxWidth: '40em' }}>
                <DateInput wholesaleDate={wholesaleDate} setWholesaleDate={setWholesaleDate} />
                <FranchiseInput wholesaleFranchise={wholesaleFranchise} setWholesaleFranchise={setWholesaleFranchise} />
            </div>
            <Tabs tabs={tabs} setTabs={setTabs} />
            <TabFlavors allFlavors={allFlavors} loadingFlavors={loadingFlavors} showTab={tabs.showFlavorsTab} />
            <TabSupplies showTab={tabs.showSuppliesTab} />
            <TabTransport showTab={tabs.showTransportTab} />
            <TabSummary showTab={tabs.showSummaryTab} />
        </>
    )
}

export default WholeSalesViewBody