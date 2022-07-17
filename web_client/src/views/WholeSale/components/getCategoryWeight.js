const getCategoryWeight = (categoryId, wholesaleBucketsWeights) => {
    return wholesaleBucketsWeights.find(bw => +bw.idFlavorType === +categoryId)?.weight || '';
}

export default getCategoryWeight;