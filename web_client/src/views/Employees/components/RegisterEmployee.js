import React from "react";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

export default function RegisterEmployee() {

    return (
        <>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Registrar empleado" />
            <h1>Registrar empleado</h1>
        </>
    );
}