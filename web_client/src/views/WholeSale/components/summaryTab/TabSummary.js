import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import calculateSuppliesSubtotal from '../calculateSuppliesSubtotal';
import CardSummary from './CardSummary';
import FlavorsSummaryDetail from './FlavorsSummaryDetail';
import ItemSummary from './ItemSummary';
import SuppliesSummaryDetail from './SuppliesSummaryDetail';

const TabSummary = ({
    showTab,
    wholesaleDate,
    wholesaleFranchise,
    wholesaleFlavors,
    wholesaleBucketsWeights,
    wholesaleSupplies,
    wholesaleTransportCost,
}) => {

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
                                <FlavorsSummaryDetail
                                    flavorsCategoriesIds={flavorsCategoriesIds}
                                    flavors={wholesaleFlavors}
                                    weightsByCategory={wholesaleBucketsWeights}
                                    subtotalFlavors={subtotalFlavors}
                                />
                                <br></br>
                                <SuppliesSummaryDetail supplies={wholesaleSupplies} subtotalSupplies={subtotalSupplies} />
                                <br></br>
                                <ItemSummary name={'Flete'} value={wholesaleTransportCost} />
                            </CardContent>
                        </Card>
                        <CardSummary
                            subtotalFlavors={subtotalFlavors}
                            subtotalSupplies={subtotalSupplies}
                            subtotalTransport={wholesaleTransportCost}
                            total={total}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default TabSummary