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

    getProductTypeDB = () => {
        return ProductTypeModel.findAll({
            include: [SectorModel]
        });
    };

    updateProductTypeDB = (id, productType) => {
        var selectProductType = {
            where: { id_product_type: id }
        };

        return ProductTypeModel.update({
            name: productType.name,
            description: productType.description,
            id_sector: productType.id_sector,
            send_delivery: productType.send_delivery,
        }, selectProductType);
    };

    deleteProductTypeDB = (id) => {
        return ProductTypeModel.destroy({
            where: { id_product_type: id }
        });
    };
}

module.exports = new ProductTypeRepository();
