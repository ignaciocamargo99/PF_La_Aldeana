import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { connect } from 'react-redux';
import { faMinus, faIceCream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BeShowed from '../../../common/BeShowed';
import { updateAllFlavorsProduct } from '../../../actions/DeliverySalesActions';

const SaleDetails = (props) => {

    const onClickShow = (i) => {
        props.updateAllFlavorsProduct(props.detailsDelivery[i].flavors);
        props.setNameShow(props.detailsDelivery[i].product.name);
        props.setShowModalView(true);
    }

    return (
        <>
            {props.detailsDelivery?.length > 0 ?

                <Table>
                    <HeaderTable
                        th={
                            <>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Nombre</label></th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Cantidad</label></th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Subtotal</label></th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>{props.buttons ? 'Acción' : 'Sabores'}</label></th>
                            </>
                        }
                    />
                    <BodyTable
                        tbody={props.detailsDelivery?.map((detail, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center', width: '40%' }}><label>{detail.product.name}</label></td>
                                        <td style={{ textAlign: 'center', width: '18%' }}><label>{detail.quantity}</label></td>
                                        <td style={{ textAlign: 'center', width: '22%' }}><label>${detail.subtotal}</label></td>
                                        <td style={{ textAlign: 'center', width: '20%' }}>
                                            <BeShowed show={detail.product.quantity_flavor > 0}>
                                                <button type="button" className="btn btn-light sendAdd" onClick={() => { onClickShow(i) }}><FontAwesomeIcon icon={faIceCream} /></button>&nbsp;
                                            </BeShowed>
                                            <BeShowed show={props.buttons}>
                                                <button type="button" className="btn btn-light sendDelete" onClick={() => { props.onClick(i) }}><FontAwesomeIcon icon={faMinus} /></button>
                                            </BeShowed>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                        }
                    />
                </Table>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100', width:'80%', textAlign: 'center' }}>No cargó productos al detalle aún...</h4>
    }

        </>
    );
}
const mapStateToProps = state => {
    return {
        detailsDelivery: state.detailsDelivery,
    }
}

const mapDispatchToProps = {
    updateAllFlavorsProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleDetails);