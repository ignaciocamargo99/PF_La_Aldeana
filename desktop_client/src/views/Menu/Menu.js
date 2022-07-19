import { FaLock, FaLockOpen } from 'react-icons/fa';
import { GoBell, GoHome, GoTasklist } from 'react-icons/go';
import {
    Menu,
    MenuItem, ProSidebar, SidebarContent, SidebarFooter, SubMenu
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { connect } from 'react-redux';
import {
    lockMenu, toChamberFlavorsDispatch, toRegisterAttendance, toRoot, toSalesDelivery,
    toSalesLocal, unlockMenu
} from '../../actions/MenuActions';
import BeShowed from '../../common/BeShowed';
import sidebarBg from '../../images/background1.jpg';
import './Menu.css';

const SideMenu = (props) => {
    return (
        <>
            <ProSidebar
                collapsed='false'
                className={props.menu ? 'menuBarCollapsed' : 'menuBar'}
                image={sidebarBg}
            >
                <SidebarContent>
                    <Menu iconShape='square'>
                        <MenuItem onClick={props.toRoot} icon={<GoHome />}>
                            Inicio
                        </MenuItem>
                        <MenuItem
                            onClick={props.toChamberFlavorsDispatch}
                            icon={<GoTasklist />}
                        >
                            Salida de cámara
                        </MenuItem>

                        <SubMenu title='Ventas' icon={<GoBell />}>
                            <MenuItem onClick={props.toSalesLocal}>
                                Venta en Local
                            </MenuItem>
                            <MenuItem onClick={props.toSalesDelivery}>
                                Venta por Delivery
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                {/* <SidebarFooter>
                    <Menu iconShape="square" className="sidebar-btn-wrapper">
                        <BeShowed show={props.menu}>
                            <MenuItem onClick={props.unlockMenu} icon={<FaLockOpen />}>Bloquear menú</MenuItem>
                        </BeShowed>
                        <BeShowed show={!props.menu}>
                            <MenuItem onClick={props.lockMenu} icon={<FaLock />}>Desbloquear menú</MenuItem>
                        </BeShowed>
                    </Menu>
                </SidebarFooter> */}
            </ProSidebar>
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
    toSalesDelivery
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
