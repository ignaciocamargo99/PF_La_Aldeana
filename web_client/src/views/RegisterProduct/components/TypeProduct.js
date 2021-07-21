import useHTTPGet from '../../../hooks/useHTTPGet';

const PORT = require('../../../config');

const TypeProduct = () => {

    const typeProduct = useHTTPGet(PORT() + '/api/typeProduct');

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productType">Tipo*</label>
            </div>
            <div className="form-combo-btn">
                <div className="d-flex">
                    <div className="form-combo">
                        <input className="form-control " list="productTypesdatalist" id="productType" placeholder="Seleccione tipo de producto...">
                        </input>
                        <datalist id="productTypesdatalist">
                            {typeProduct?.map((tp) => {
                                return (
                                    <option key={tp.id_product_type} value={tp.name}>
                                    </option>
                                )
                            })}
                        </datalist>
                    </div>
                    <div className="d-flex-col form-add-btn">
                        <button type="button" className="btn btn-primary" >+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypeProduct;