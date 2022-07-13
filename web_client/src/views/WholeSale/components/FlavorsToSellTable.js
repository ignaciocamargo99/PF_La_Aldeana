import FlavorsToSellTableFilter from "./flavorsToSellTable/FlavorsToSellTableFilter";

const FlavorsToSellTable = ({
    flavorFamiliesMapped,
    flavorTypesMapped,
    flavorsToSell,
    handleRemoveFlavor,
}) => {

    const thereAreFlavorsToSell = flavorsToSell?.length > 0;

    return (
        <>
            <h3>Detalle de Venta</h3>
            {!thereAreFlavorsToSell && (
                <label >Aún no ha seleccionado ningún sabor para la venta.</label>
            )}
            {thereAreFlavorsToSell && (
                <FlavorsToSellTableFilter
                    flavorFamilies={flavorFamiliesMapped}
                    flavorTypes={flavorTypesMapped}
                    flavorsToSell={flavorsToSell}
                    handleRemoveFlavor={handleRemoveFlavor}
                />
            )}
        </>
    )
}

export default FlavorsToSellTable