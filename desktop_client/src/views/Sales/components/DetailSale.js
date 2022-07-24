import { faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    updateDetailProducts,
    updateDetailsProductsDelete,
    updateDetailsProductsModify,
    updatePayType,
    updateProducts,
    updateProductSelected,
    updateProductsFiltered,
    updateRefresh,
    updateTotalAmount,
    updateSupplies
} from '../../../actions/SalesActions';
import BeShowed from '../../../common/BeShowed';
import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import Table from '../../../common/Table/Table';
import '../styles/detailSale.css';
import ModalProduct from './ModalProduct';
import '../styles/table.css';
import { calculateStock } from './calculateStock';

const DetailSale = (props) => {
    const [ready, setReady] = useState(false);
    const [printModal, setPrintModal] = useState(false);

    // "N":new -- "M":modify -- "A":add -- "D":delete
    const [actionModal, setActionModal] = useState();

    let aux = 0;

    const changePrintModalModify = (id) => {
        let product = props.detailProducts?.find((n) => n.id_product == id);
        props.updateProductSelected(product);
        setActionModal('M');
        setPrintModal(true);
        props.updateRefresh(!props.refresh);
    };

    const changePrintModalDelete = (id) => {
        let product = props.detailProducts?.find((n) => n.id_product == id);
        product.disabled = false;
        props.updateProductSelected(product);
        props.updateDetailsProductsDelete(product);
        props.updateRefresh(!props.refresh);

        const { products: productNew, supplies: suppliesNew } = calculateStock(
            props.products,
            props.supplies,
            props.productsXsupplies,
            product,
            product.quantity,
            'D'
        );
        props.updateProducts(productNew);
        props.updateSupplies(suppliesNew);
    };

    useEffect(() => {
        if (props.detailProducts.length > 0) setReady(true);
        else setReady(false);

        for (let i = 0; i < props.detailProducts.length; i++) {
            aux = aux + parseFloat(props.detailProducts[i].subtotal, 2);
        }

        props.updateTotalAmount(aux);
    }, [props.detailProducts, props.refresh]);

    return (
        <>
            {props.detailProducts?.length > 0 ? (
                <>
                    <Table>
                        <HeaderTable
                            th={
                                <>
                                    <th
                                        scope='col'
                                        className='bg-info'
                                        style={{
                                            textAlign: 'center',
                                            width: '250px',
                                            verticalAlign: 'middle'
                                        }}
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        scope='col'
                                        className='bg-info'
                                        style={{
                                            textAlign: 'center',
                                            width: '80px',
                                            verticalAlign: 'middle'
                                        }}
                                    >
                                        Cantidad
                                    </th>
                                    <th
                                        scope='col'
                                        className='bg-info'
                                        style={{
                                            textAlign: 'center',
                                            width: '150px',
                                            verticalAlign: 'middle'
                                        }}
                                    >
                                        Subtotal
                                    </th>
                                    <th
                                        scope='col'
                                        className='bg-info'
                                        style={{
                                            textAlign: 'center',
                                            width: '150px',
                                            verticalAlign: 'middle'
                                        }}
                                    >
                                        Acciones
                                    </th>
                                </>
                            }
                        />
                        <BeShowed show={ready}>
                            <BodyTable
                                tbody={props.detailProducts?.map(
                                    (element, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr>
                                                    <td
                                                        style={{
                                                            textAlign: 'center',
                                                            verticalAlign:
                                                                'middle'
                                                        }}
                                                    >
                                                        {element.name}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: 'center',
                                                            verticalAlign:
                                                                'middle'
                                                        }}
                                                    >
                                                        {parseInt(
                                                            element.quantity
                                                        )}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: 'center',
                                                            verticalAlign:
                                                                'middle'
                                                        }}
                                                    >
                                                        ${element.subtotal}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: 'center',
                                                            verticalAlign:
                                                                'middle'
                                                        }}
                                                    >
                                                        <button
                                                            type='button'
                                                            className='btn btn-light sendAdd'
                                                            id='btn_edit'
                                                            value={
                                                                element.id_product
                                                            }
                                                            onClick={() =>
                                                                changePrintModalModify(
                                                                    element.id_product
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faPen}
                                                            />
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-light sendDelete'
                                                            id='btn_delete'
                                                            value={
                                                                element.id_product
                                                            }
                                                            onClick={() =>
                                                                changePrintModalDelete(
                                                                    element.id_product
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faMinus}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    }
                                )}
                            />
                        </BeShowed>
                    </Table>
                    <div className='formRow'>
                        <label>TOTAL: $ </label>
                        <label>{props.totalAmount}</label>
                    </div>
                </>
            ) : (
                <h4 style={{ color: '#383C77', fontWeight: 'bold' }}>
                    {' '}
                    ¡No hay productos cargados en el detalle!{' '}
                </h4>
            )}

            <ModalProduct
                show={printModal}
                setShowModal={setPrintModal}
                actionModal={actionModal}
            ></ModalProduct>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        payType: state.payType,
        totalAmount: state.totalAmount,
        productSelected: state.productSelected,
        refresh: state.refresh,
        productsXsupplies: state.productsXsupplies,
        supplies: state.supplies
    };
};

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updatePayType,
    updateTotalAmount,
    updateDetailsProductsModify,
    updateProductSelected,
    updateRefresh,
    updateDetailsProductsDelete,
    updateSupplies
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSale);
