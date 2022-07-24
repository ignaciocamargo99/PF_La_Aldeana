import Axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    updateDetailProducts,
    updateDetailsProductsClear,
    updatePaymentAmount,
    updateProducts,
    updateProductSelected,
    updateProductsFiltered,
    updateProductsXSupplies,
    updateSalesRegister,
    updateSupplies
} from '../../actions/SalesActions';
import '../../assets/Buttons.css';
import BeShowed from '../../common/BeShowed';
import dateTimeFormat from '../../utils/DateFormat/dateTimeFormat';
import loadingMessage from '../../utils/LoadingMessages/loadingMessage';
import { defaultQuestionSweetAlert2 } from '../../utils/sweetAlert2Questions';
import warningMessage from '../../utils/warningMessage';
import DetailSale from './components/DetailSale';
import FilterProducts from './components/FilterProducts';
import ListProducts from './components/ListProducts';
import PaymentSale from './components/PaymentSale';

const PORT = require('../../config');

const Sales = (props) => {
    const [ready, setReady] = useState(false);
    const [saleCompleted, setSaleCompleted] = useState(false);
    const [nameClient, setNameClient] = useState('');

    useEffect(() => {
        props.updateDetailsProductsClear([]);
        // initialCalls()
        Axios.get(`${PORT()}/api/products`)
            .then((response) => {
                let aux = response.data;
                aux?.map((element, i) => {
                    element.listSupplies = [];
                    element.disabled = false;
                    element.stock_current = element.stock;
                });
                props.updateProducts(aux);
                props.updateProductsFiltered(aux);
            })
            .catch((error) => console.error(error));

        Axios.get(`${PORT()}/api/productxsupply`)
            .then((response) => props.updateProductsXSupplies(response.data))
            .catch((error) => console.error(error));

        Axios.get(`${PORT()}/api/supplies`)
            .then((response) => props.updateSupplies(response.data))
            .catch((error) => console.error(error));


    }, []);

    // const initialCalls = () => {
    //     Axios.get(`${PORT()}/api/products`)
    //         .then((response) => {
    //             let aux = response.data;
    //             aux?.map((element, i) => {
    //                 element.listSupplies = [];
    //                 element.disabled = false;
    //                 element.stock_current = element.stock;
    //             });
    //             props.updateProducts(aux);
    //             props.updateProductsFiltered(aux);
    //         })
    //         .catch((error) => console.error(error));

    //     Axios.get(`${PORT()}/api/productxsupply`)
    //         .then((response) => props.updateProductsXSupplies(response.data))
    //         .catch((error) => console.error(error));

    //     Axios.get(`${PORT()}/api/supplies`)
    //         .then((response) => props.updateSupplies(response.data))
    //         .catch((error) => console.error(error));
    // };

    useEffect(() => {
        if (
            props.detailProducts.length > 0 &&
            ((props.payType == 1 && props.paymentAmount >= props.totalAmount) ||
                props.payType == 2)
        )
            setReady(true);
        else setReady(false);
    });

    useEffect(() => {
        let aux = props.productsFiltered;
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].stock_current == 0) aux[i].disabled = true;
            else aux[i].disabled = false;
        }
        props.updateProductsFiltered(aux);
    }, [props.productsFiltered, props.detailProducts, props.refresh]);

    // const cancel = () => {
    //     initialCalls();
    //     resetStates();
    // };

    const resetStates = () => {
        props.updateDetailsProductsClear([]);
        setNameClient('');
        setSaleCompleted(!saleCompleted);
        props.updateSalesRegister(!props.salesRegister);
    };

    const agg_suplies = () => {
        let suppliesXproduct;
        for (let i = 0; i < props.detailProducts.length; i++) {
            suppliesXproduct = props.productsXsupplies.filter(
                (item) => item.id_product == props.detailProducts[i].id_product
            );
            for (let j = 0; j < suppliesXproduct.length; j++) {
                props.detailProducts[i].listSupplies.push([
                    suppliesXproduct[j].number_supply,
                    props.supplies.find((supply) => supply.id_supply == suppliesXproduct[j].id_supply)
                ]);
            }
        }
    };

    const handleClientName = (e) => setNameClient(e.target.value);

    const updateStockSupplies = () => {
        Axios.put(`${PORT()}/api/suppliesStock`, props.supplies)
            .catch(error => console.error(error))
    }

    const registerSale = async () => {
        if (ready) {
            const registrationConfirmed = (
                await defaultQuestionSweetAlert2(`¿Confirma la venta?`)
            ).isConfirmed;
            if (registrationConfirmed) {
                /**USAR PARA TICKET */
                // console.log(nameClient)
                agg_suplies();
                let sale = {
                    date_hour: dateTimeFormat(new Date()),
                    total_amount: props.totalAmount,
                    id_pay_type: props.payType,
                    details: JSON.stringify(props.detailProducts)
                };
                loadingMessage('Registrando venta...');

                Axios.post(`${PORT()}/api/sales`, sale)
                    .then((sale) => {
                        if (sale.data.Ok) {
                            updateStockSupplies();
                            resetStates()
                            if (props.totalAmount < props.paymentAmount)
                                warningMessage(
                                    '¡Éxito!',
                                    `Se registró la venta con éxito. \n¡No se olvide de darle el vuelto de $${parseFloat(props.paymentAmount) -
                                    parseFloat(props.totalAmount)
                                    } al cliente!`,
                                    'success'
                                );
                            else
                                warningMessage(
                                    '¡Éxito!',
                                    'Se registró la venta con éxito',
                                    'success'
                                );
                        } else
                            warningMessage(
                                '¡Error!',
                                'Ha ocurrido un error al registrar la venta',
                                'error'
                            );
                    })
                    .catch((error) => console.log(error));
            }
        } else {
            if (props.detailProducts.length == 0)
                warningMessage(
                    '¡Atención!',
                    'No cargó ningún producto',
                    'warning'
                );
            else if (props.payType != 1 && props.payType != 2)
                warningMessage(
                    '¡Atención!',
                    'No selecciono la forma de pago',
                    'warning'
                );
            else if (
                props.payType == 1 &&
                props.paymentAmount <= props.totalAmount
            )
                warningMessage(
                    '¡Atención!',
                    'El monto ingresado es inferior al monto total',
                    'warning'
                );
        }
    };

    return (
        <>
            <div className='viewContent'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='row'>
                            <FilterProducts />
                        </div>
                        <div className='row'>
                            <ListProducts />
                        </div>
                    </div>
                    <div className='col-6' style={{ padding: '0px 0px 0px' }}>
                        <h3>
                            <b>Detalle de venta</b>
                        </h3>
                        <DetailSale />
                        <hr />
                        <h3>
                            <b>Cliente</b>
                            <br />
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <span
                                        className='input-group-text'
                                        style={{ height: '100%' }}
                                    >
                                        Nombre
                                    </span>
                                </div>
                                <input
                                    id='clientName'
                                    type='text'
                                    className='form-control'
                                    onChange={(e) => handleClientName(e)}
                                    value={nameClient}
                                />
                            </div>
                        </h3>
                        <PaymentSale />
                        <div>
                            <div className='buttons'>
                                <BeShowed show={ready}>
                                    <button className='btn btn-light sendOk' onClick={registerSale}>Finalizar</button>
                                </BeShowed>
                                <BeShowed show={!ready}>
                                    <button className='btn btn-light sendNotOk' onClick={registerSale}>Finalizar</button>
                                </BeShowed>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        productSelected: state.productSelected,
        payType: state.payType,
        totalAmount: state.totalAmount,
        supplies: state.supplies,
        productsXsupplies: state.productsXsupplies,
        paymentAmount: state.paymentAmount,
        salesRegister: state.salesRegister,
        refresh: state.refresh
    };
};

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updateProductSelected,
    updateProductsXSupplies,
    updateSupplies,
    updatePaymentAmount,
    updateDetailsProductsClear,
    updateSalesRegister
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
