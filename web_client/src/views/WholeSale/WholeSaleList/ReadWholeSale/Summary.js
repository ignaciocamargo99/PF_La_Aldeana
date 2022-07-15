import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FlavorsSummaryDetail from 'views/WholeSale/components/summaryTab/FlavorsSummaryDetail';
import SuppliesSummaryDetail from 'views/WholeSale/components/summaryTab/SuppliesSummaryDetail';
import ItemSummary from 'views/WholeSale/components/summaryTab/ItemSummary';
import FlavorsReadSummary from './FlavorsReadSummary'

const Summary = ({ wholesaleSummary, activeFlavors }) => {
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


    const flavorsCategoriesIds = flavors?.length > 0 ? [...new Set(flavors.map(f => +f.FlavorType.idFlavorType))] : [];
    const weightsByCategory = wholesaleSummary.DetailSalesTypeFlavors
    const bucketsNumber = wholesaleSummary.DetailSalesFlavors

    return (
        <>
            <h3 className="mt-5 ">Detalle</h3>
            <div className='d-flex flex-wrap p-3 justify-content-center'>
                <Card className='me-5 mb-3' style={{ width: '50em' }}>
                    <CardContent>
                        <FlavorsReadSummary
                            flavorsCategoriesIds={flavorsCategoriesIds}
                            flavors={flavors}
                            weightsByCategory={weightsByCategory}
                            subtotalFlavors={subtotalFlavors}
                            bucketsNumber={bucketsNumber}
                        />
                        <hr />
                        <h3>Insumos</h3>
                        {/* <FlavorsSummaryDetail
                            flavorsCategoriesIds={flavorsCategoriesIds}
                            flavors={wholesaleFlavors}
                            weightsByCategory={wholesaleBucketsWeights}
                            subtotalFlavors={subtotalFlavors}
                        />
                        <br></br>
                        <SuppliesSummaryDetail supplies={wholesaleSupplies} subtotalSupplies={subtotalSupplies} />
                        <br></br>
                        <ItemSummary name={'Flete'} value={wholesaleTransportCost} /> */}
                    </CardContent>
                </Card>
            </div>
            {/* <CardSummary
                    subtotalFlavors={subtotalFlavors}
                    subtotalSupplies={subtotalSupplies}
                    subtotalTransport={wholesaleTransportCost}
                    total={total}
                    handleFinalize={handleFinalize}
                /> */}
        </>
    );
}

export default Summary;