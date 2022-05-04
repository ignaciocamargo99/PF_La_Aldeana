import { useState, useEffect } from "react";
import displayError from "utils/ErrorMessages/displayError";

export const useReadEditProductType = (productType, action) => {
    const [state, setstate] = useState({
        productTypeData: [],
        actionTable: '',
    });

    useEffect (() => {
        if(action === 2){
            let aux = {
                id_product_type: productType.id_product_type,
                name: productType.name,
                description: productType.description,
                id_sector: productType.SectorModel.id_sector,
                name_sector: productType.SectorModel.name,
                description_sector: productType.SectorModel.description
            }
        
            const readProductType = async (aux) => {
                try {
                    aux.reading = true;
                    setstate({
                        productTypeData: aux,
                        actionTable: 'R'
                    })
                }
                catch {
                    displayError();
                }
            }
            const editProductType = async (aux) => {
                try {
                    aux.editing = true;
                    setstate({
                        productTypeData: aux,
                        actionTable: 'E'
                    })
                }
                catch {
                    displayError();
                }
            }
        
            if (action === 1) readProductType(aux);
            else editProductType(aux);
        }
    })

    return state;
}
