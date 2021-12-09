import React, { useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import EmployeeManualAssistance from './EmployeeManualAssistance';
import ListEmployeesAssistance from './ListEmployeesAssistance';
import TabOption from './TabOption';

export default function EmployeeAsistance() {
    const [typeOfUpload, setTypeOfUpload] = useState('fingerprint');

    const handlerTabSelection = (value) => setTypeOfUpload(value);

    return (
        <>
            <div className="viewContent">
                <h1 className="display-5">Asistencia</h1>
                <hr />
                <TabOption handler={handlerTabSelection} select={typeOfUpload} textOption1="Huella"
                    textOption2="Manual" option1="fingerprint" option2="manual"></TabOption>
                <BeShowed show={typeOfUpload === "manual"}>
                    <br />
                    <EmployeeManualAssistance />
                </BeShowed>
            </div>
        </>
    );
}