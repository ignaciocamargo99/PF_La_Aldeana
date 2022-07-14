import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { postWholesale } from 'helpers/postWholesale';
import calculateCategorySubtotal from '../calculateCategorySubtotal';
import calculateSuppliesSubtotal from '../calculateSuppliesSubtotal';
import calculateSupplySubtotal from '../calculateSupplySubtotal';
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

    const filterFlavorsAndCalculateItsCategorySubtotal = (categoryId) => {
        const flavorsOfCategory = filterFlavorsByCategory(categoryId, wholesaleFlavors);
        const categoryWeight = getCategoryWeight(categoryId, wholesaleBucketsWeights);
        const categoryPrice = flavorsOfCategory[0].FlavorType.price;

        return calculateCategorySubtotal(categoryWeight, categoryPrice);
    }

    const calculateFlavorsSubtotal = () => {
        let subtotalFlavors = 0;

        flavorsCategoriesIds.forEach(categoryId => {
            subtotalFlavors += filterFlavorsAndCalculateItsCategorySubtotal(categoryId);
        })

        return subtotalFlavors;
    }

    const subtotalFlavors = calculateFlavorsSubtotal();

    const subtotalSupplies = calculateSuppliesSubtotal(wholesaleSupplies);

    const total = +subtotalFlavors + +wholesaleTransportCost + +subtotalSupplies;

    const handleFinalize = () => {

        // to do validación
        // to do sweet alert 
        // to do mover funciones a otro file

        const flavorsPayload = wholesaleFlavors.map((f) => {
            return {
                id_flavor: f.idFlavor,
                quantity: f.amountToSell,
            };
        });

        const categoriesPayload = wholesaleBucketsWeights.map((cat) => {
            return {
                id_type_flavor: cat.idFlavorType,
                weight: cat.weight,
                subtotal: filterFlavorsAndCalculateItsCategorySubtotal(cat.idFlavorType),
            }
        });

        const suppliesPayload = wholesaleSupplies.map((s) => {
            return {
                id_supply: s.id_supply,
                quantity: s.amountToSell,
                subtotal: calculateSupplySubtotal(s),
            }
        });

        let wholesalePayload = {
            date: wholesaleDate,
            amount: total,
            id_franchise: wholesaleFranchise.id_franchise,
            charter: wholesaleTransportCost,
            flavors: flavorsPayload,
            type_flavors: categoriesPayload,
            supplies: suppliesPayload,
        };

        console.log(wholesalePayload)
        postWholesale(wholesalePayload)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
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
                            handleFinalize={handleFinalize}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default TabSummary