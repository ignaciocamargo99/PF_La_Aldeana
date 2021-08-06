import { useState, useEffect } from 'react';
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableFlavorsDown(props) {
    return (
        <>
            <h4 className="text-secondary">Sabores cargados: </h4>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Sabor</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '100px', verticalAlign: 'middle' }}>Cantidad (Baldes)</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}>Eliminar</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.flavors?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.amount}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <button type="button" className="btn btn-danger btn-sm px-3"
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