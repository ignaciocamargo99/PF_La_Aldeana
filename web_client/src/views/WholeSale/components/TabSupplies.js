import React from 'react'
import AddSuppliesTable from './AddSuppliesTable';
import WholesaleSuppliesDetails from './WholesaleSuppliesDetails';

const TabSupplies = ({ showTab, allSupplies, loadingSupplies, setAllSupplies }) => {

    const handleAddSupply = (supply, amount) => {
        let auxSupplies = [...allSupplies];
        for (let i = 0; i < auxSupplies.length; i++) {
            if (+auxSupplies[i].id_supply === +supply.id_supply) {
                auxSupplies[i].toSell = true;
                auxSupplies[i].amountToSell = +amount;
                break;
            }
        }

        setAllSupplies(auxSupplies);
    }

    const handleRemoveSupply = (supply) => {
        let auxSupplies = [...allSupplies];
        for (let i = 0; i < auxSupplies.length; i++) {
            if (+auxSupplies[i].id_supply === +supply.id_supply) {
                auxSupplies[i].toSell = false;
                delete auxSupplies[i].amountToSell;
                break;
            }
        }

        setAllSupplies(auxSupplies);
    }

    const modifySupplyAmountToSell = (supply, amount) => {
        let enableUpdate = false;
        let auxSupplies = [...allSupplies];

        for (let i = 0; i < auxSupplies.length; i++) {
            if (+auxSupplies[i].id_supply === +supply.id_supply) {
                // +1 -1
                const aux = +auxSupplies[i].amountToSell + amount;
                // remove supply from wholesale
                if (aux <= 0) {
                    auxSupplies[i].toSell = false;
                    delete auxSupplies[i].amountToSell;
                    enableUpdate = true;
                }
                // update supply amountToSell +1 -1
                if ((aux > 0) && (aux <= auxSupplies[i].stock)) {
                    auxSupplies[i].amountToSell = aux;
                    enableUpdate = true;
                }

                break;
            }
        }

        if (enableUpdate) {
            setAllSupplies(auxSupplies);
        }

    }

    return (
        <>
            {showTab && (
                <>
                    <h3 className="mt-2 ">Insumos</h3>
                    <AddSuppliesTable
                        supplies={allSupplies?.filter(s => !s.toSell)}
                        handleAddSupply={handleAddSupply}
                        loadingSupplies={loadingSupplies}
                    />
                    <WholesaleSuppliesDetails
                        supplies={allSupplies?.filter(s => s.toSell)}
                        handleRemoveSupply={handleRemoveSupply}
                        modifySupplyAmountToSell={modifySupplyAmountToSell}
                    />
                </>
            )}
        </>
    )
}

export default TabSupplies