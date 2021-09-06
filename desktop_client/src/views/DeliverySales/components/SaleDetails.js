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
        props.updateAllFlavorsProduct(props.detailsDelivery[i].flavors)
        props.setNameShow(props.detailsDelivery[i].product.name)
        props.setShowModalView(true)
    }

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Nombre</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Cantidad</label></th>   
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Subtotal</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>{props.buttons?'':'Sabores'}</label></th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.detailsDelivery?.map((detail, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', width: '55%'}}><label>{detail.product.name}</label></td>
                                    <td style={{ textAlign: 'center', width: '15%'}}><label>{detail.quantity}</label></td>
                                    <td style={{ textAlign: 'center', width: '15%'}}><label>${detail.subtotal}</label></td>
                                    <td style={{ textAlign: 'center', width: '15%'}}>
                                        <BeShowed show={detail.product.quantity_flavor > 0}>
                                            <button type="button" className="btn btn-info btn-sm px-3" onClick={() => {onClickShow(i)}}><FontAwesomeIcon icon={faIceCream} /></button>&nbsp;
                                        </BeShowed>
                                        <BeShowed show={props.buttons}> 
                                            <button type="button" className="btn btn-info btn-sm px-3" onClick={() => {props.onClick(i)}}><FontAwesomeIcon icon={faMinus} /></button>
                                        </BeShowed>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                    }
                />
            </Table>
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

export default connect(mapStateToProps,mapDispatchToProps)(SaleDetails);