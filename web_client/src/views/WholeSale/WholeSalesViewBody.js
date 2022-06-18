import { useGetActiveFlavors } from 'hooks/useGetActiveFlavors';
import { useGetFranchises } from 'hooks/useGetFranchises';
import React, { useState } from 'react'
import DateInput from './components/DateInput';
import FlavorsTabs from './components/FlavorsTabs';
import FranchiseDetails from './components/FranchiseDetails';
import FranchiseInput from './components/FranchiseInput';
import SelectedFlavorsDetails from './components/SelectedFlavorsDetails';

const WholeSalesViewBody = () => {
    const { franchises } = useGetFranchises();
    const { activeFlavors: flavors, loadingFlavors } = useGetActiveFlavors();

    const [inputDate, setInputDate] = useState('');
    const [selectedFranchise, setSelectedFranchise] = useState(null);

    return (
        <>
            <DateInput value={inputDate} setValue={setInputDate} />
            <FranchiseInput franchises={franchises} setSelectedFranchise={setSelectedFranchise} />
            <FranchiseDetails franchise={selectedFranchise} />
            <br />
            <FlavorsTabs flavors={flavors} loading={loadingFlavors} />
            <br />
            <SelectedFlavorsDetails />
        </>
    )
}

export default WholeSalesViewBody