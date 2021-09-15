import React, { useState } from "react";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Buttons from "../../../common/Buttons";
import DataEmployee from './DataEmployee';
import ExtraDataEmployee from './ExtraDataEmployee';
import Axios from 'axios';

export default function RegisterEmployee() {

    const [data, setData] = useState({ nameEmployee: null, lastName: null, dni: null, id_charge: null, date: null, employmentRelationship: null, editing: false });

    const load = (childData) => {
        setData(childData);
        console.log(data);
        // if(data.nameEmployee && data.lastName && data.dni && data.id_charge && data.date && data.employmentRelationship){
        //     Axios.post()
        // }
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Registrar empleado" />
            <div className="viewTitle">
                <h1>Registrar empleado</h1>
            </div>
            <div className="viewBody">
                <DataEmployee load={load} data={data} />
                <ExtraDataEmployee load={load} data={data} />
                <Buttons
                    label='Registrar'

                />
            </div>
        </>
    );
}