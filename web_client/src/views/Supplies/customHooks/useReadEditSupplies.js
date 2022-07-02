import { useState, useEffect } from "react";
import displayError from "utils/ErrorMessages/displayError";

export const useReadEditSupplies = (supply, action) => {
    const [state, setstate] = useState({
        supplyToDo: []
    });

    useEffect(() => {
        if (action !== '') {
            /* Creating a new object with the same properties as the object passed as parameter. */
            let aux = {
                id_supply: supply.id_supply,
                name: supply.name,
                description: supply.description,
                id_supply_type: supply.id_supply_type,
                price_wholesale: supply.price_wholesale,
                stock_unit: supply.stock_unit,
                name_type_supply: supply.name_type_supply
            }
            if (action === 'R') {
                try {
                    aux.reading = true;
                    setstate({
                        supplyToDo: aux
                    })
                }
                catch {
                    displayError();
                }
            }
            else {
                try {
                    aux.editing = true;
                    setstate({
                        supplyToDo: aux
                    })
                }
                catch {
                    displayError();
                }
            }
        }
    }, [action, supply])

    return state;
}