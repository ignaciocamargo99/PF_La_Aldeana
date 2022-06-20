import { useState } from 'react';
import DateInput from './components/DateInput';
import FranchiseInput from './components/FranchiseInput';

const WholeSalesViewBody = () => {

    const [wholesaleDate, setWholesaleDate] = useState('');
    const [wholesaleFranchise, setWholesaleFranchise] = useState(null);

    return (
        <>
            <div style={{ maxWidth: '60em' }}>
                <DateInput wholesaleDate={wholesaleDate} setWholesaleDate={setWholesaleDate} />
                <FranchiseInput wholesaleFranchise={wholesaleFranchise} setWholesaleFranchise={setWholesaleFranchise} />
            </div>
        </>
    )
}

export default WholeSalesViewBody