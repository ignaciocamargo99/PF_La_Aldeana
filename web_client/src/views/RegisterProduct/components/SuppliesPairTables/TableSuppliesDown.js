import { useState, useEffect } from 'react';
import Table from '../../../../common/Table/Table';
import HeaderTable from '../../../../common/Table/HeaderTable';
import BodyTable from '../../../../common/Table/BodyTable';
import BeShowed from "../../../../common/BeShowed";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuppliesAmount from './SuppliesAmount';

export default function TableSuppliesDown(props) {
    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center' }}>Nombre</th>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center', width: '150px' }}>Cantidad</th>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center', width: '150px' }}>Eliminar</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.supplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center' }}>{element.amount}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button type="button" className="btn btn-success btn-sm px-3"
                                            onClick={(e) => props.download(i)}><FontAwesomeIcon icon={faMinus} /></button>
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