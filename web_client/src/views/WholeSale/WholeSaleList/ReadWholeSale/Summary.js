import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useHistory } from "react-router-dom";
import CardSummary from 'views/WholeSale/components/summaryTab/CardSummary';
import SuppliesReadSummary from '../SuppliesReadSummary';
import CharterReadSummary from './CharterReadSummary';
import FlavorsReadSummary from './FlavorsReadSummary';

const Summary = ({ wholesaleSummary, activeFlavors, supplies }) => {
    let history = useHistory();

    const calculateSubtotalFlavors = () => {
        let sumSubtotalFlavors = 0;
        wholesaleSummary.DetailSalesTypeFlavors.forEach((typeFlavor) => {
            sumSubtotalFlavors += typeFlavor.subtotal
        })
        return sumSubtotalFlavors
    }

    const subtotalFlavors = calculateSubtotalFlavors()

    const getFlavorsWholeSale = () => {
        const flavorsID = []
        wholesaleSummary.DetailSalesFlavors.forEach((typeFlavor) => flavorsID.push(typeFlavor.id_flavor))
        const newActiveFlavorsToShow = activeFlavors.filter((flavor) => flavorsID.includes(flavor.idFlavor))
        return newActiveFlavorsToShow
    }

    const flavors = getFlavorsWholeSale()

    const getSuppliesWholesale = () => {
        const arrToPushSupplies = []
        let arrNameSupplies;
        supplies.forEach((s) => {
            wholesaleSummary.DetailSalesSupplies.forEach((ds) => {
                if (s.id_supply === ds.id_supply) {
                    arrNameSupplies = [{
                        id_supply: s.id_supply,
                        name: s.name,
                        quantity: ds.quantity,
                        subtotal: ds.subtotal
                    }]
                    arrToPushSupplies.push(arrNameSupplies)
                }
            })
        })
        const newSupplies = arrToPushSupplies.flat()
        return newSupplies
    }

    const suppliesWholesale = getSuppliesWholesale()

    const flavorsCategoriesIds = flavors?.length > 0 ? [...new Set(flavors.map(f => +f.FlavorType.idFlavorType))] : [];
    const weightsByCategory = wholesaleSummary.DetailSalesTypeFlavors
    const bucketsNumber = wholesaleSummary.DetailSalesFlavors
    const subtotalSupplies = suppliesWholesale?.reduce((ac, curr) => ac + curr.subtotal, 0)

    const handleFinalize = () => history.push("/app/wholesales");

    return (
        <>
            <h3 className="mt-5 ">Detalle</h3>
            <div className='d-flex flex-wrap p-3 justify-content-center'>
                <Card className='me-5 mb-3' style={{ width: '40em' }}>
                    <CardContent>
                        <FlavorsReadSummary
                            flavorsCategoriesIds={flavorsCategoriesIds}
                            flavors={flavors}
                            weightsByCategory={weightsByCategory}
                            subtotalFlavors={subtotalFlavors}
                            bucketsNumber={bucketsNumber}
                        />
                        <hr />
                        <SuppliesReadSummary
                            suppliesWholesale={suppliesWholesale}
                            subtotalSupplies={subtotalSupplies}
                        />
                        <hr />
                        <CharterReadSummary name='Flete' value={wholesaleSummary.charter} />
                    </CardContent>
                </Card>
                <CardSummary
                    subtotalFlavors={subtotalFlavors}
                    subtotalSupplies={subtotalSupplies}
                    subtotalTransport={wholesaleSummary.charter}
                    total={wholesaleSummary.amount}
                    handleFinalize={handleFinalize}
                    labelBtn='Volver'
                />
            </div>
        </>
    );
}

export default Summary;