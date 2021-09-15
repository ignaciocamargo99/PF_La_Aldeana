import React from "react";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Buttons from "../../../common/Buttons";
import DataEmployee from './DataEmployee';
import ExtraDataEmployee from './ExtraDataEmployee';

export default function RegisterEmployee() {


    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Registrar empleado" />
            <div className="viewTitle">
                <h1>Registrar empleado</h1>
            </div>
            <div className="viewBody">
                <DataEmployee />
                <ExtraDataEmployee />
                <Buttons
                    label='Registrar'

                />
            </div>
        </>
    );
}