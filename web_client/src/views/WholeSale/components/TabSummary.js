import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import calculateSuppliesSubtotal from './calculateSuppliesSubtotal';

const TabSummary = ({
    showTab,
    wholesaleDate,
    wholesaleFranchise,
    wholesaleFlavors,
    wholesaleBucketsWeights,
    wholesaleSupplies,
    wholesaleTransportCost,
}) => {

    const getSuppliesPlaceHolder = () => {
        let suppliesPlaceholder = '0 insumos seleccionados';
        if (wholesaleSupplies && wholesaleSupplies.length > 0) {
            suppliesPlaceholder = wholesaleSupplies.length === 1 ? `${wholesaleSupplies.length} insumo seleccionado` : `${wholesaleSupplies.length} insumos seleccionados`;
        }
        return suppliesPlaceholder;
    }

    const suppliesPlaceholder = getSuppliesPlaceHolder();

    const flavorsCategoriesIds = wholesaleFlavors?.length > 0 ? [...new Set(wholesaleFlavors.map(f => +f.FlavorType.idFlavorType))] : [];

    const calculateFlavorsSubtotal = (flavorsCategoriesIds) => {
        let subtotalFlavors = 0;

        flavorsCategoriesIds.forEach(categoryId => {
            const flavorsOfCategory = wholesaleFlavors.filter(f => +f.FlavorType.idFlavorType === +categoryId);
            const categoryWeight = wholesaleBucketsWeights.find(bw => +bw.idFlavorType === +categoryId)?.weight || '';
            const categoryPrice = flavorsOfCategory[0].FlavorType.price;

            subtotalFlavors += categoryPrice * categoryWeight;
        })

        return subtotalFlavors;
    }

    const subtotalFlavors = calculateFlavorsSubtotal(flavorsCategoriesIds);

    const subtotalSupplies = calculateSuppliesSubtotal(wholesaleSupplies);

    const total = +subtotalSupplies + +wholesaleTransportCost + +subtotalFlavors;

    return (
        <>
            {showTab && (
                <>
                    <h3 className="mt-2 ">Resumen</h3>
                    <div className='d-flex p-3'>
                        <Card className='me-5' style={{ minWidth: '30em' }}>
                            <CardContent>
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <label>Sabores</label>
                                        <label>$&nbsp;{subtotalFlavors || '---'}</label>
                                    </div>
                                    {(!flavorsCategoriesIds || flavorsCategoriesIds.length < 1) && (
                                        <label className='text-black-50'>&nbsp;{'0 sabores seleccionados'}</label>
                                    )}
                                    {(flavorsCategoriesIds || flavorsCategoriesIds.length >= 1) && (
                                        flavorsCategoriesIds?.map(categoryId => {
                                            const flavorsOfCategory = wholesaleFlavors.filter(f => +f.FlavorType.idFlavorType === +categoryId);
                                            const catWeight = wholesaleBucketsWeights.find(bw => +bw.idFlavorType === +categoryId)?.weight || '';
                                            const category = flavorsOfCategory[0].FlavorType;

                                            const amount = flavorsOfCategory.length;
                                            const amountPlaceholder = amount === 1 ? `1 sabor seleccionado` : `${amount} sabores seleccionados`;

                                            return (
                                                <div className='d-flex justify-content-between text-black-50'>
                                                    <label>&nbsp;{`${catWeight || '---'} Kg ${category.name} (${amountPlaceholder})`}</label>
                                                    <label>$&nbsp;{category.price * catWeight}</label>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                                <br></br>
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <label>Insumos</label>
                                        <label>$&nbsp;{subtotalSupplies || '---'}</label>
                                    </div>
                                    <label className='text-black-50'>&nbsp;{suppliesPlaceholder}</label>
                                </div>
                                <br></br>
                                <div className="d-flex justify-content-between">
                                    <label>Flete</label>
                                    <label>$&nbsp;{wholesaleTransportCost || '---'}</label>
                                </div>
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                        <Card className="d-flex p-2 flex-column justify-content-between" style={{ minWidth: '20em' }}>
                            <CardContent>
                                <div className="d-flex justify-content-between">
                                    <label>Sabores</label>
                                    <label>$&nbsp;{'---'}</label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label>Insumos</label>
                                    <label>$&nbsp;{subtotalSupplies || '---'}</label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label>Flete</label>
                                    <label>$&nbsp;{wholesaleTransportCost || '---'}</label>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fs-4 fw-bold">
                                    <label>Total</label>
                                    <label>$&nbsp;{total}</label>
                                </div>
                            </CardContent>
                            <CardActions className="align-self-end">
                                <button type="button" className="btn btn-light">Guardar</button>
                                <button type="button" className="btn bg-la-aldeana-violeta text-white">Finalizar</button>
                            </CardActions>
                        </Card>
                    </div>
                </>
            )}
        </>
    )
}

export default TabSummary