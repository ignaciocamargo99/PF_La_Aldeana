import { useGetActiveFlavors } from 'hooks/useGetActiveFlavors';
import { useEffect, useState } from 'react';
import DateInput from './components/DateInput';
import FranchiseDetails from './components/FranchiseDetails';
import FranchiseInput from './components/FranchiseInput';
import WholeSaleTables from './components/WholeSaleTables';

const WholeSalesViewBody = () => {

    const { activeFlavors, loadingFlavors } = useGetActiveFlavors();

    const [inputDate, setInputDate] = useState('');
    const [selectedFranchise, setSelectedFranchise] = useState(null);
    const [allFlavors, setAllFlavors] = useState();

    useEffect(() => {
        if (activeFlavors?.length > 0) {
            setAllFlavors(activeFlavors)
        } else {
            setAllFlavors([])
        }
    }, [activeFlavors])

    const handleAddFlavor = (flavorData) => {
        const auxFlavors = [...allFlavors].map(flavor => {
            if (+flavor.idFlavor === +flavorData.idFlavor) {
                flavor.toSell = true;
            }
            return flavor;
        })

        setAllFlavors(auxFlavors)
    }

    const handleRemoveFlavor = (flavorData) => {
        const auxFlavors = [...allFlavors].map(flavor => {
            if (+flavor.idFlavor === +flavorData.idFlavor) {
                flavor.toSell = false;
                flavor.amountToSell = undefined;
            }
            return flavor;
        })

        setAllFlavors(auxFlavors)
    }

    return (
        <>
            <div style={{ maxWidth: '60em' }}>
                <DateInput value={inputDate} setValue={setInputDate} />
                <FranchiseInput setSelectedFranchise={setSelectedFranchise} />
                <FranchiseDetails franchise={selectedFranchise} />
            </div>
            <WholeSaleTables
                allFlavors={allFlavors}
                handleAddFlavor={handleAddFlavor}
                handleRemoveFlavor={handleRemoveFlavor}
                loadingFlavors={loadingFlavors}
            />
            <div className='buttons'>
                <button className='btn btn-light sendOk' onClick={() => alert('En desarrollo...')}>Registrar</button>
                <button className='btn btn-light cancel' onClick={() => window.location.reload()}>Cancelar</button>
            </div>
        </>
    )
}

export default WholeSalesViewBody