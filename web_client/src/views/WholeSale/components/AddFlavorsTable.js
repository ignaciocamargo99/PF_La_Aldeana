import FlavorsTableFilter from './flavorsTable/FlavorsTableFilter';

const AddFlavorsTable = ({
    flavorFamiliesMapped,
    flavorTypesMapped,
    flavors,
    handleAddFlavor,
    loadingFlavors,
}) => {

    console.log('AddFlavorsTable');

    return (
        <>
            <label className="fs-6" htmlFor="date" >Agregue los sabores a vender:</label>
            <div className='mt-3 ps-5 pe-5'>
                <div>
                    {(loadingFlavors) && (
                        <div className="mt-3 mb-5 d-flex justify-content-center">
                            <div>
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                &nbsp;
                                <label className="text-black-50 fs-6">Cargando tabla de sabores...</label>
                            </div>
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
        </>
    )
}

export default AddFlavorsTable