import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function ListEmployeesAssistance() {
    const [employees, setEmployees] = useState();

    // useEffect(() => {
    //     Axios.get
    // }, [])

    return (
        <>
            <h2>Empleados que marcaron hoy:</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Nombre</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '300px' }}>Apellido</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Fecha ingreso</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Fecha egreso</th>
                        </tr>
                    </thead>
                    {employees?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center' }}>{element.lastName}</td>
                                    <td style={{ textAlign: 'center' }}>{element.date_admission}</td>
                                    <td style={{ textAlign: 'center' }}>{element.egress_date}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </>
    );
}