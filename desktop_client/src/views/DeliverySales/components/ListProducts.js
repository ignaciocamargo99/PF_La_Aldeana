import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateDeliveryProductQuantity, updateDeliveryProductsStocks, updateSuppliesDelivery } from '../../../actions/DeliverySalesActions';
import BeShowed from '../../../common/BeShowed';
import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import Table from '../../../common/Table/Table';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import warningMessage from '../../../utils/warningMessage';
import { calculateStock } from './calculateStockDelivery';

const ListProducts = (props) => {
    const [searchState, setSearchState] = useState('');
    const [noProduct, setNoProduct] = useState(false);

    const validateQuantity = (e, i) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
        let quantity = parseInt(e.target.value);
        let productQuantityNew = { 'product': props.productsQuantities[i].product, 'quantity': quantity }
        props.updateDeliveryProductQuantity(productQuantityNew, i);
    }

    let filterProduct;
    const onClick = (id, i) => {
        filterProduct = props.productsStocks.filter(product => product.id_product === id);
        let quantityInput = document.getElementById(`quantityInput${i}`)

        let quantity
        if (quantityInput.value !== '') quantity = parseInt(quantityInput.value)
        else quantity = 0

        if (filterProduct[0].stock_current || filterProduct[0].stock_current >= 0) {
            if (quantity <= filterProduct[0].stock_current) {
                const { products: productNew, supplies: suppliesNew } =
                    calculateStock(
                        props.productsStocks,
                        props.suppliesDelivery,
                        props.productsXsuppliesDelivery,
                        filterProduct,
                        quantityInput.value,
                        'N',
                    );
                props.updateDeliveryProductsStocks(productNew);
                props.updateSuppliesDelivery(suppliesNew);
                props.onClick(id, i);
                quantityInput.value = '';
            }
            else warningMessage('Atención', `La cantidad ingresada supera el stock disponible.\nStock disponible: ${filterProduct[0].stock_current}.\nCantidad ingresada: ${quantity}.`, 'warning')
        }
        else {
            if (quantity <= filterProduct[0].stock || filterProduct[0].stock === null) {
                const { products: productNew, supplies: suppliesNew } =
                    calculateStock(
                        props.productsStocks,
                        props.suppliesDelivery,
                        props.productsXsuppliesDelivery,
                        filterProduct,
                        quantityInput.value,
                        'N',
                    );
                props.updateDeliveryProductsStocks(productNew);
                props.updateSuppliesDelivery(suppliesNew);
                props.onClick(id, i);
                quantityInput.value = '';
            }
            else warningMessage('Atención', `La cantidad ingresada supera el stock disponible.\nStock disponible: ${filterProduct[0].stock}.\nCantidad ingresada: ${quantity}.`, 'warning')
        }
    }

    useEffect(() => {
        let aux = 0;
        props.productsQuantities?.map((productQuantity, i) => {
            if ((productQuantity.product.id_sector === parseInt(props.filter) || parseInt(props.filter) === 0) && (productQuantity.product.name.toUpperCase().includes(searchState.toUpperCase()))) {
                aux += 1;
            }
        });
        if (aux === 0) {
            setNoProduct(true);
        }
        else {
            setNoProduct(false);
        }
    }, [searchState, props.filter]);

    const handleChangeName = (e) => setSearchState(e.target.value);

    props.productsStocks.forEach((ps) => {
        props.productsQuantities.forEach((pq) => {
            if(ps.id_product === pq.product.id_product){
                pq.stock_current = ps.stock_current
            }
        })
    })

    return (
        <>
            <div className='formRow'>
                <div className="formRow title-searcher">
                    <div className="search-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"
                                    id="inputGroup-sizing-default"
                                    style={{ height: '100%' }}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                            <input type="text"
                                className="form-control"
                                placeholder="Buscar por nombre..."
                                onChange={(e) => handleChangeName(e)}
                                aria-describedby="inputGroup-sizing-default"
                                style={{ width: '490px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <BeShowed show={!noProduct}>
                <Table style={{ display: 'block', height: '350px', overflow: 'auto' }}>
                    <HeaderTable
                        th={<>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Nombre</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Precio ($)</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Cantidad</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                        </>
                        }
                    />
                    <BodyTable
                        tbody={
                            props.productsQuantities?.map((productQuantity, i) => {
                                    if ((productQuantity.product.id_sector === parseInt(props.filter) || parseInt(props.filter) === 0) && (productQuantity.product.name.toUpperCase().includes(searchState.toUpperCase()))) {
                                        if ((productQuantity.product.stock === 0) || (productQuantity.stock_current === 0)) {
                                            return (<tbody key={i}>
                                                <tr>
                                                    <td style={{ textAlign: 'center', width: '58%', backgroundColor: '#9E9F9F' }}><strike>{productQuantity.product.name}</strike></td>
                                                    <td style={{ textAlign: 'center', width: '15%', backgroundColor: '#9E9F9F' }}><strike>{productQuantity.product.price}</strike></td>
                                                    <td style={{ textAlign: 'center', width: '15%', backgroundColor: '#9E9F9F' }}>
                                                        <input id={`quantityInput${i}`} className="form-control" style={{ textAlign: 'center' }} type='number' placeholder="0" disabled={true}></input>
                                                    </td>
                                                    <td style={{ textAlign: 'center', width: '12%', backgroundColor: '#9E9F9F' }}>
                                                        <button type="button" className="sendDisabled" disabled={true}><FontAwesomeIcon icon={faPlus} /></button>
                                                    </td>
                                                </tr>
                                            </tbody>)
                                        } else {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td style={{ textAlign: 'center', width: '48%' }}><label>{productQuantity.product.name}</label></td>
                                                        <td style={{ textAlign: 'center', width: '20%' }}><label>{productQuantity.product.price}</label></td>
                                                        <td style={{ textAlign: 'center', width: '20%' }}>
                                                            <input id={`quantityInput${i}`} className="form-control" style={{ textAlign: 'center' }} type='number' placeholder="0" min={0} maxLength="4" onChange={(e) => { validateQuantity(e, i) }} onKeyDown={(e) => { validateFloatNumbers(e) }} defaultValue={productQuantity.quantity === 0 ? '' : productQuantity.quantity}></input>
                                                        </td>
                                                        <td style={{ textAlign: 'center', width: '12%' }}>
                                                            <button type="button" className="btn btn-light sendAdd"
                                                                onClick={() => { onClick(productQuantity.product.id_product, i) }}
                                                            ><FontAwesomeIcon icon={faPlus} /></button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        }
                                    }
                            })
                        }
                    />
                </Table>
            </BeShowed>
            <BeShowed show={noProduct}>
                <div className={"col-md-6 offset-md-3"}>
                    <br />
                    <h4 className="row justify-content-center" style={{ color: '#C16100', width: '80%', textAlign: 'center' }}>No existen productos con los filtros ingresados...</h4>
                </div>
            </BeShowed>
        </>
    );
}
const mapStateToProps = state => {
    return {
        productsQuantities: state.productsQuantitiesDelivery,
        details: state.detailsDelivery,
        productsStocks: state.productsStocksDelivery,
        productsXsuppliesDelivery: state.productsXsuppliesDelivery,
        suppliesDelivery: state.suppliesDelivery
    }
}

const mapDispatchToProps = {
    updateDeliveryProductQuantity,
    updateDeliveryProductsStocks,
    updateSuppliesDelivery
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);