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

    const { activeFlavors, loadingFlavors } = useGetActiveFlavors();

    const [wholesaleDate, setWholesaleDate] = useState('');
    const [wholesaleFranchise, setWholesaleFranchise] = useState(null);
    const [tabs, setTabs] = useState({ showFlavorsTab: true, showSuppliesTab: false, showTransportTab: false, showSummaryTab: false, })
    const [allFlavors, setAllFlavors] = useState();

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