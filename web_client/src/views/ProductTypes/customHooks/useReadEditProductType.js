import { useState, useEffect } from "react";
import displayError from "utils/ErrorMessages/displayError";

export const useReadEditProductType = (productType, action) => {
    const [state, setstate] = useState({
        productTypeToDo: []
    });

    useEffect(() => {
        if (action !== '') {
            /* Creating a new object with the same properties as the object passed as parameter. */
            let aux = {
                id_product_type: productType.id_product_type,
                name: productType.name,
                description: productType.description,
                send_delivery: productType.send_delivery,
                id_sector: productType.SectorModel.id_sector,
                name_sector: productType.SectorModel.name,
                description_sector: productType.SectorModel.description
            }
            if (action === 'R') {
                try {
                    aux.reading = true;
                    setstate({
                        productTypeToDo: aux
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
                        productTypeToDo: aux
                    })
                }
                catch {
                    displayError();
                }
            }
        }
    }, [action, productType])

    return state;
}
