import FlavorsTableFilter from './flavorsTable/FlavorsTableFilter';

const AddFlavorsTable = ({
    flavorFamiliesMapped,
    flavorTypesMapped,
    flavors,
    handleAddFlavor,
    loadingFlavors,
}) => {

    return (
        <div className='mt-4'>
            <label htmlFor="date" >Agregue los sabores a vender:</label>
            <div>
                {(loadingFlavors) && (
                    <div className="mt-3 mb-5">
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        &nbsp;
                        <label className="text-black-50">Cargando tabla de sabores...</label>
                    </div>
                )}
                {(!loadingFlavors) && (
                    <FlavorsTableFilter
                        flavorFamilies={flavorFamiliesMapped}
                        flavorTypes={flavorTypesMapped}
                        handleAddFlavor={handleAddFlavor}
                        initialFlavors={flavors}
                    />
                )}
            </div>
        </div>
    )
}

export default AddFlavorsTable