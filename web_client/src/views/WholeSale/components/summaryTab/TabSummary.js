import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import calculateCategorySubtotal from '../calculateCategorySubtotal';
import calculateSuppliesSubtotal from '../calculateSuppliesSubtotal';
import filterFlavorsByCategory from '../filterFlavorsByCategory';
import getCategoryWeight from '../getCategoryWeight';
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

    const calculateFlavorsSubtotal = () => {
        let subtotalFlavors = 0;

        flavorsCategoriesIds.forEach(categoryId => {
            const flavorsOfCategory = filterFlavorsByCategory(categoryId, wholesaleFlavors);
            const categoryWeight = getCategoryWeight(categoryId, wholesaleBucketsWeights);
            const categoryPrice = flavorsOfCategory[0].FlavorType.price;

            subtotalFlavors += calculateCategorySubtotal(categoryWeight, categoryPrice);
        })

        return subtotalFlavors;
    }

    const subtotalFlavors = calculateFlavorsSubtotal();

    const subtotalSupplies = calculateSuppliesSubtotal(wholesaleSupplies);

    const total = +subtotalFlavors + +wholesaleTransportCost + +subtotalSupplies;

    const handleSave = () => {
        // to do
        alert('En desarrollo...')
    }

    const handleFinalize = () => {
        // to do
        // armar payload
        alert('En desarrollo...')
    }

    return (
        <>
            {showTab && (
                <>
                    <h3 className="mt-2 ">Resumen</h3>
                    <div className='d-flex flex-wrap p-3'>
                        <div>
                            <Card className='me-5 mb-3' style={{ minWidth: '30em' }}>
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
                        </div>
                        <CardSummary
                            subtotalFlavors={subtotalFlavors}
                            subtotalSupplies={subtotalSupplies}
                            subtotalTransport={wholesaleTransportCost}
                            total={total}
                            handleSave={handleSave}
                            handleFinalize={handleFinalize}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default TabSummary