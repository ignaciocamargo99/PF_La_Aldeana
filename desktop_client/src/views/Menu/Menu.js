import React from 'react';
import { connect } from 'react-redux';
import {
    toRoot,
    toChamberFlavorsDispatch,
    lockMenu,
    unlockMenu,
    toRegisterAttendance,
    toSalesDelivery,
    toSalesLocal,
    toSalesWhole
} from '../../actions/MenuActions';
import { GoTasklist, GoHome, GoBell } from 'react-icons/go';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { IoFingerPrint } from 'react-icons/io5';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarFooter,
    SidebarContent
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Menu.css';
import BeShowed from '../../common/BeShowed';
import sidebarBg from '../../images/background1.jpg';

const SideMenu = (props) => {
    return (
        <>
            <ProSidebar
                collapsed={props.menu}
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
                            <MenuItem onClick={props.toSalesWhole}>
                                Venta Mayorista
                            </MenuItem>
                        </SubMenu>

                        <MenuItem
                            onClick={props.toRegisterAttendance}
                            icon={<IoFingerPrint />}
                        >
                            Registrar Asistencia
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape='square' className='sidebar-btn-wrapper'>
                        <BeShowed show={props.menu}>
                            <MenuItem
                                onClick={props.unlockMenu}
                                icon={<FaLockOpen />}
                            >
                                Bloquear menú
                            </MenuItem>
                        </BeShowed>
                        <BeShowed show={!props.menu}>
                            <MenuItem
                                onClick={props.lockMenu}
                                icon={<FaLock />}
                            >
                                Desbloquear menú
                            </MenuItem>
                        </BeShowed>
                    </Menu>
                </SidebarFooter>
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
    toSalesDelivery,
    toSalesWhole
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
