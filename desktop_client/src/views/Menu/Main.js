import ChamberFlavorsDispatch from '../ChamberFlavorsDispatch/components/ChamberFlavorsDispatch';
// import LoginUser from './LoginUser/LoginUser';
import BeShowed from '../../common/BeShowed';
import { connect } from 'react-redux';
import {
    toRoot,
    toChamberFlavorsDispatch,
    toRegisterAttendance,
    lockMenu,
    unlockMenu,
    toSalesDelivery,
    toSalesLocal,
    toSalesWhole
} from '../../actions/MenuActions';
import logo from '../../images/logo_expandido.png';
import '../../assets/logo.css';
import SideMenu from './Menu';
import Sales from '../Sales/Sales';
import DeliverySales from '../DeliverySales/components/DeliverySales';
import WholeSales from '../WholeSales/WholeSale';
// import EmployeeAssistance from '../EmployeeAssistance/components/EmployeeAssistance';

const Main = (props) => {
    return (
        <>
            <BeShowed show={!props.menu}>
                <div className='row root'>
                    <div className='row col-sm-3' style={{ width: '20em' }}>
                        <SideMenu />
                    </div>
                    <div className='row justify-content-sm-center col-sm-9 main'>
                        <BeShowed show={props.location === 1}>
                            <ChamberFlavorsDispatch />
                        </BeShowed>
                        <BeShowed show={props.location === 0}>
                            <img className='logo' src={logo} alt=''></img>
                        </BeShowed>
                        {/* <BeShowed show={props.location === 2}>
              <EmployeeAssistance></EmployeeAssistance>
            </BeShowed> */}
                        <BeShowed show={props.location === 3}>
                            <Sales></Sales>
                        </BeShowed>
                        <BeShowed show={props.location === 4}>
                            <DeliverySales></DeliverySales>
                        </BeShowed>
                        <BeShowed show={props.location === 5}>
                            <WholeSales></WholeSales>
                        </BeShowed>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={props.menu}>
                <div className='row root'>
                    <div className='row col-sm-1'>
                        <SideMenu />
                    </div>
                    <div className='row justify-content-sm-center col-sm-11'>
                        <BeShowed show={props.location === 1}>
                            <ChamberFlavorsDispatch />
                        </BeShowed>
                        <BeShowed show={props.location === 0}>
                            <img className='logo' src={logo} alt=''></img>
                        </BeShowed>
                        {/* <BeShowed show={props.location === 2}>
              <EmployeeAssistance></EmployeeAssistance>
            </BeShowed> */}
                        <BeShowed show={props.location === 3}>
                            <Sales></Sales>
                        </BeShowed>
                        <BeShowed show={props.location === 4}>
                            <DeliverySales></DeliverySales>
                        </BeShowed>
                        <BeShowed show={props.location === 5}>
                            <WholeSales></WholeSales>
                        </BeShowed>
                    </div>
                </div>
            </BeShowed>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        location: state.location,
        menu: state.menu
    };
};

const mapDispatchToProps = {
    toRoot,
    toChamberFlavorsDispatch,
    toRegisterAttendance,
    lockMenu,
    unlockMenu,
    toSalesLocal,
    toSalesDelivery,
    toSalesWhole
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
