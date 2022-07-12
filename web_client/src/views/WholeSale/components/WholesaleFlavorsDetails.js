import React from 'react'
import Categories from './Categories';

const WholesaleFlavorsDetails = ({
    bucketsWeights,
    flavors,
    handleRemoveFlavor,
    modifyFlavorAmountToSell,
    setBucketsWeights,
}) => {

    const thereAreFlavorsToSell = flavors?.length > 0;

    return (
        <>
            <h3>Detalle de Sabores</h3>
            {!thereAreFlavorsToSell && (
                <label className='fs-6'>Aún no ha seleccionado ningún sabor para la venta.</label>
            )}
            {thereAreFlavorsToSell && (
                <Categories
                    flavors={flavors}
                    handleRemoveFlavor={handleRemoveFlavor}
                    modifyFlavorAmountToSell={modifyFlavorAmountToSell}
                    bucketsWeights={bucketsWeights}
                    setBucketsWeights={setBucketsWeights}
                />
            )}
        </>
    )
}

export default WholesaleFlavorsDetails