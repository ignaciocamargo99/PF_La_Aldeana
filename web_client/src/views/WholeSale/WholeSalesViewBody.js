import { useState } from 'react';
import DateInput from './components/DateInput';
import FranchiseInput from './components/FranchiseInput';
import Tabs from './components/Tabs';

const WholeSalesViewBody = () => {

    const [wholesaleDate, setWholesaleDate] = useState('');
    const [wholesaleFranchise, setWholesaleFranchise] = useState(null);
    const [tabs, setTabs] = useState({ showFlavorsTab: true, showSuppliesTab: false, showTransportTab: false, showSummaryTab: false, })

    return (
        <>
            <div style={{ maxWidth: '60em' }}>
                <DateInput wholesaleDate={wholesaleDate} setWholesaleDate={setWholesaleDate} />
                <FranchiseInput wholesaleFranchise={wholesaleFranchise} setWholesaleFranchise={setWholesaleFranchise} />
            </div>
            <Tabs tabs={tabs} setTabs={setTabs} />
        </>
    )
}

export default WholeSalesViewBody