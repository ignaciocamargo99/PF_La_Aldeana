import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataEmployee from '../DataEmployee';
import ExtraDataEmployee from '../ExtraDataEmployee';

const ReadEmployee = ({ employeeData, goBack }) => {

    const isReadingEmployeeData = true;

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Consultar empleado" />
            <div className="viewTitle">
                <h1>Empleado {employeeData.name + " " + employeeData.last_name}</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataEmployee
                    data={employeeData}
                    isReadingEmployeeData={isReadingEmployeeData}
                />
                <ExtraDataEmployee
                    data={employeeData}
                    isReadingEmployeeData={isReadingEmployeeData}
                />
                <div className='buttons'>
                    <button className='sendOk' onClick={goBack}>Volver</button>
                </div>
            </div>
        </>
    );
}

export default ReadEmployee;
