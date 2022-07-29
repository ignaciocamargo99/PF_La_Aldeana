import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { postWholesale } from 'helpers/postWholesale';
import { WHOLESALE_PAGE } from 'routes/routes';
import Swal from 'sweetalert2';
import { sweetAlert2Error } from 'utils/ErrorMessages/sweetAlert2Error';
import { sweetAlert2Loading } from 'utils/LoadingMessages/sweetAlert2Loading';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import displaySuccess from 'utils/SuccessMessages/sucessSweetAlert2';
import { warnSweetAlert2 } from 'utils/WarningMessages/warnSweetAlert2';
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

    const searchCategoryNameById = (categoryId) => {
        return wholesaleFlavors?.find(f => +f.FlavorType?.idFlavorType === +categoryId)?.FlavorType.name || '';
    }

    const filterFlavorsAndCalculateItsCategorySubtotal = (categoryId) => {
        const flavorsOfCategory = filterFlavorsByCategory(categoryId, wholesaleFlavors);
        const categoryWeight = getCategoryWeight(categoryId, wholesaleBucketsWeights);
        const categoryPrice = flavorsOfCategory?.length > 0 ? flavorsOfCategory[0].FlavorType.price : 0;

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

    const warnNoValid = (msg) => {
        warnSweetAlert2('', msg);
        return false;
    }

    const isWholesaleDateValid = (date) => {
        if (!(date)) {
            return warnNoValid('Ingrese la fecha de venta.');
        }
        return true;
    }

    const isWholesaleFranchiseValid = (id_franchise) => {
        if (!(id_franchise)) {
            return warnNoValid('Seleccione la franquicia.');
        }
        return true;
    }

    const hasWholesaleOneSupplyOrFlavor = (supplies, thereAreFlavorsInWholesale) => {
        const thereAreSuppliesInWholesale = supplies?.length > 0;

        if ((!thereAreFlavorsInWholesale) && (!thereAreSuppliesInWholesale)) {
            return warnNoValid('Ingrese al menos 1 sabor o insumo para la venta.');
        }
        return true;
    }

    const isWholesaleFlavorsValid = (type_flavors, thereAreFlavorsInWholesale) => {
        if (!thereAreFlavorsInWholesale) {
            return true;
        }

        const weightsLoaded = type_flavors?.length > 0;

        if (!weightsLoaded) {
            return warnNoValid('Ingrese los pesos para los baldes de sabores.');
        }
        if (type_flavors.length < flavorsCategoriesIds.length) {
            return warnNoValid('Han quedado baldes de sabores sin peso ingresado.');
        }

        const categoriesWithoutWeight = type_flavors.filter(cat => !cat.weight);

        if (categoriesWithoutWeight.length > 0) {
            if (categoriesWithoutWeight.length === 1) {
                let catName = searchCategoryNameById(categoriesWithoutWeight[0].id_type_flavor) || 'correspondiente';
                return warnNoValid(`Ingrese el peso para los baldes de la categoría ${catName}.`);
            }
            if (categoriesWithoutWeight.length === flavorsCategoriesIds.length) {
                return warnNoValid('Ingrese los pesos para los baldes de sabores.');
            }
            if (categoriesWithoutWeight.length > 1) {
                return warnNoValid('Han quedado baldes de sabores sin peso ingresado.');
            }
        }

        return true;
    }

    const isWholesaleDataValid = (wholesaleData) => {
        const thereAreFlavorsInWholesale = wholesaleData?.flavors?.length > 0;

        return isWholesaleDateValid(wholesaleData?.date) &&
            isWholesaleFranchiseValid(wholesaleData?.id_franchise) &&
            hasWholesaleOneSupplyOrFlavor(wholesaleData?.supplies, thereAreFlavorsInWholesale) &&
            isWholesaleFlavorsValid(wholesaleData?.type_flavors, thereAreFlavorsInWholesale);
    }

    const createWholesalePayload = () => {
        const flavorsPayload = wholesaleFlavors?.map((f) => {
            return {
                id_flavor: f.idFlavor,
                quantity: f.amountToSell,
            };
        });

        const categoriesPayload = wholesaleBucketsWeights?.map((cat) => {
            return {
                id_type_flavor: cat.idFlavorType,
                weight: cat.weight,
                subtotal: filterFlavorsAndCalculateItsCategorySubtotal(cat.idFlavorType),
            }
        });

        const suppliesPayload = wholesaleSupplies?.map((s) => {
            return {
                id_supply: s.id_supply,
                quantity: s.amountToSell,
                subtotal: calculateSupplySubtotal(s),
            }
        });

        return {
            date: wholesaleDate,
            amount: total,
            id_franchise: wholesaleFranchise?.id_franchise,
            charter: wholesaleTransportCost || 0,
            flavors: flavorsPayload || [],
            type_flavors: categoriesPayload,
            supplies: suppliesPayload || [],
        };
    }

    const saveWholesale = (wholesalePayload) => {
        sweetAlert2Loading();
        postWholesale(wholesalePayload)
            .then(() => {
                displaySuccess('Venta registrada exitosamente.')
                    .then(() => window.location.replace(WHOLESALE_PAGE));
            })
            .catch((err) => {
                sweetAlert2Error('', 'Ha ocurrido un error en el servidor.')
                console.log(err);
            });
    }

    const handleFinalize = () => {
        const wholesalePayload = createWholesalePayload();

        if (isWholesaleDataValid(wholesalePayload)) {
            defaultQuestionSweetAlert2('¿Confirmar venta?').then((result) => {
                if (result.isConfirmed) {
                    saveWholesale(wholesalePayload);
                }
            })
        }
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
                            labelBtn='Finalizar'
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default TabSummary