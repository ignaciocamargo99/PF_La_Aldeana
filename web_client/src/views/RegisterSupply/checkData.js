export default function checkData(props) {
    let data = {
        nameSupply: props.name,
        descriptionSupply: props.description,
        typeSupply: props.id_supply_type,
        multiplePrice: props.price_wholesale,
        singlePrice: props.price_retail,
        lotSupply: props.stock_lot,
        unitSupply: props.stock_unit,
        unitPerLotSupply: props.unit_x_lot,
        franchiseSupply: props.franchiseSupply,
        deliverySupply: props.deliverySupply
    }

    if (data.typeSupply === 2){
        if (data.nameSupply !== '' && data.nameSupply !== 'null' && data.franchiseSupply && data.multiplePrice > 0 &&
        data.lotSupply > 0 && data.unitSupply > 0 && data.unitPerLotSupply > 0) {
            return true;
        }

        if (data.nameSupply !== '' && data.nameSupply !== 'null' && data.deliverySupply &&
        data.singlePrice > 0 && data.lotSupply > 0 && data.unitSupply > 0 && data.unitPerLotSupply > 0) {
            return true;
        }

        if (data.nameSupply !== '' && data.nameSupply !== 'null' && !data.deliverySupply &&
        !data.franchiseSupply && data.lotSupply > 0 && data.unitSupply > 0 && data.unitPerLotSupply > 0 && data.singlePrice === 0 && data.multiplePrice === 0) {
            return true;
        }
    } else if(data.typeSupply === 1){
        if (data.nameSupply !== '' && data.nameSupply !== 'null' && data.franchiseSupply && data.multiplePrice > 0 &&
        data.unitSupply > 0) {
            return true;
        }

        if (data.nameSupply !== '' && data.nameSupply !== 'null' && data.deliverySupply &&
        data.singlePrice > 0 && data.unitSupply > 0) {
            return true;
        }

        if (data.nameSupply !== '' && data.nameSupply !== 'null' && !data.deliverySupply && !data.franchiseSupply && data.unitSupply > 0 &&
        data.singlePrice === 0 && data.multiplePrice === 0) {
            return true;
        }
    } else if(data.typeSupply === 3) {
        if (data.nameSupply !== '' && data.nameSupply !== 'null' && data.franchiseSupply && data.multiplePrice > 0) {
            return true;
        }

        if (data.nameSupply !== '' && data.nameSupply !== 'null' && data.deliverySupply && data.singlePrice > 0) {
            return true;
        }

        if (data.nameSupply !== '' && data.nameSupply !== 'null' && !data.deliverySupply && !data.franchiseSupply &&
        data.singlePrice === 0 && data.multiplePrice === 0) {
            return true;
        }
    }

    if (data.franchiseSupply && data.deliverySupply && (data.singlePrice <= 0 || data.multiplePrice <= 0)) return false;
    
    return false;
}
/*

        setReady(false);

        if (props.typeSupply === 2){
            if (props.nameSupply !== '' && props.nameSupply !== 'null' && props.franchiseSupply && props.multiplePrice > 0 &&
            props.lotSupply > 0 && props.unitSupply > 0 && props.unitPerLotSupply > 0) {
                setReady(true);

            }

            if (props.nameSupply !== '' && props.nameSupply !== 'null' && props.deliverySupply &&
            props.singlePrice > 0 && props.lotSupply > 0 && props.unitSupply > 0 && props.unitPerLotSupply > 0) {
                setReady(true);
            }

            if (props.nameSupply !== '' && props.nameSupply !== 'null' && !props.deliverySupply &&
            !props.franchiseSupply && props.lotSupply > 0 && props.unitSupply > 0 && props.unitPerLotSupply > 0 && props.singlePrice === 0 && props.multiplePrice === 0) {
                setReady(true);
            }
        } else if(props.typeSupply === 1){
            if (props.nameSupply !== '' && props.nameSupply !== 'null' && props.franchiseSupply && props.multiplePrice > 0 &&
            props.unitSupply > 0) {
                setReady(true);
            }

            if (props.nameSupply !== '' && props.nameSupply !== 'null' && props.deliverySupply &&
            props.singlePrice > 0 && props.unitSupply > 0) {
                setReady(true);
            }

            if (props.nameSupply !== '' && props.nameSupply !== 'null' && !props.deliverySupply && !props.franchiseSupply && props.unitSupply > 0 &&
            props.singlePrice === 0 && props.multiplePrice === 0) {
                setReady(true);
            }
        } else if(props.typeSupply === 3) {
            if (props.nameSupply !== '' && props.nameSupply !== 'null' && props.franchiseSupply && props.multiplePrice > 0) {
                setReady(true);
            }

            if (props.nameSupply !== '' && props.nameSupply !== 'null' && props.deliverySupply && props.singlePrice > 0) {
                setReady(true);
            }

            if (props.nameSupply !== '' && props.nameSupply !== 'null' && !props.deliverySupply && !props.franchiseSupply &&
            props.singlePrice === 0 && props.multiplePrice === 0) {
                setReady(true);
            }
        }

        if (props.franchiseSupply && props.deliverySupply && (props.singlePrice <= 0 || props.multiplePrice <= 0)) setReady(false);

*/