import calculateCategorySubtotal from 'views/WholeSale/components/calculateCategorySubtotal';
import filterFlavorsByCategory from 'views/WholeSale/components/filterFlavorsByCategory';

const FlavorsSummaryDetail = ({ flavorsCategoriesIds, flavors, weightsByCategory, subtotalFlavors, bucketsNumber }) => {

    const flavorsSelected = flavorsCategoriesIds?.length > 0;

    const getCategoryWeight = (categoryId, wholesaleBucketsWeights) => {
        return wholesaleBucketsWeights.find(bw => +bw.id_type_flavor === +categoryId)?.weight || '';
    }

    return (
        <div>
            <h3>Sabores</h3>
            {flavorsSelected && (
                flavorsCategoriesIds.map((categoryId) => {
                    const flavorsOfCategory = filterFlavorsByCategory(categoryId, flavors);
                    const catWeight = getCategoryWeight(categoryId, weightsByCategory);
                    const category = flavorsOfCategory[0].FlavorType;
                    const flavorDetailSubtotal = `${calculateCategorySubtotal(catWeight, category.price)}`;

                    /**
                     * Start method
                     * Get quantity buckets with name flavor
                     */
                    const arrToPushBucketName = []
                    let arrNameBucketName;
                    flavorsOfCategory.forEach((f, i) => {
                        bucketsNumber.forEach((b, i) => {
                            if (f.idFlavor === b.id_flavor) {
                                arrNameBucketName = [{ name: f.name, bucket: b.quantity }]
                                arrToPushBucketName.push(arrNameBucketName)
                            }
                        })
                    })
                    const arrToShowBucketName = arrToPushBucketName.flat()
                    /** Finish method  */

                    const typeFlavorDetailDescrip = `${catWeight || '---'} Kg ${category.name}`;
                    const kgPrice = ` ($${flavorDetailSubtotal / catWeight}/kg)`
                    return (
                        <div key={categoryId}>
                            <div className='d-flex justify-content-between text-black-50'>
                                <label style={{ fontWeight: 'bold' }}>&nbsp;{typeFlavorDetailDescrip}</label>
                                <label>$&nbsp;{flavorDetailSubtotal || '---'}</label>
                            </div>
                            {arrToShowBucketName.map((f, i) => {
                                return (
                                    <div className='d-flex justify-content-between text-black-50' >
                                        <label >&nbsp;- {f.bucket + " balde/s " + f.name + kgPrice}</label>
                                    </div>
                                )
                            })}
                        </div>

                    )
                })
            )}
            <div className={`d-flex justify-content-between`}>
                <label>Subtotal</label>
                <label>$&nbsp;{subtotalFlavors || '---'}</label>
            </div>
        </div >
    )
}

export default FlavorsSummaryDetail