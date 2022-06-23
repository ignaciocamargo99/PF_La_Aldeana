import React from 'react'
import Categories from './Categories';

const WholesaleFlavorsDetails = ({ flavors, handleRemoveFlavor }) => {

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
                />
            )}
        </>
    )
}

export default WholesaleFlavorsDetails