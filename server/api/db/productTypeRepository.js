const ProductTypeModel = require('../database/models/productTypeModel');
const SectorModel = require('../database/models/sectorModel');

class ProductTypeRepository {
    getProductTypeDBByID = (id) => {
        return ProductTypeModel.findOne({
            where: {
                id_product_type: id
            },
            include: [SectorModel]
        });
    };
}

module.exports = new ProductTypeRepository();
