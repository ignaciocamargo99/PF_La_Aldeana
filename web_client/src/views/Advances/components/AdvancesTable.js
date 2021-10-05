import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import BodyTable from "../../../common/Table/BodyTable";
import HeaderTable from "../../../common/Table/HeaderTable";
import Table from '../../../common/Table/Table';
import DeleteAdvancesButton from './DeleteAdvancesButton';
import backupAdvances from './EditAdvances/backupAdvances';
import EditAdvances from "./EditAdvances/EditAdvances";
import EditAdvancesButton from "./EditAdvances/EditAdvancesButton";
import ReadAdvances from './ReadAdvances/ReadAdvances';
import ReadAdvancesButton from "./ReadAdvances/ReadAdvancesButton";

const PORT = require('../../../config');

export default function AdvancesTable() {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [advances, setAdvances] = useState([]);
    const [editing, setEditing] = useState({});
    const [reading, setReading] = useState({});

    useEffect(() => {
        Axios.get(PORT() + '/api/advances')
            .then((response) => {
                handlerLoadingSpinner();
                let auxAdvances = response.data;
                setAdvances(auxAdvances);
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteAdvances = (i) => {
        let aux = [];
        advances?.forEach((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setAdvances(aux);
    }

    const editAdvances = (advances) => {
        let aux = backupAdvances(advances);
        aux.dniEmployee = advances.dniEmployee;
        aux.date = moment(advances.date).format('YYYY-MM-DD');
        aux.amount = advances.amount;
        aux.installments = advances.installments;
        aux.installments_amount = advances.installments[0].amount;
        aux.pay = advances.pay;
        aux.editing = true;
        setEditing(aux);
        setIsEditing(true);
    }

    const readAdvances = (advances) => {
        let aux = advances;
        aux.dniEmployee = advances.dniEmployee;
        aux.date = moment(advances.date).format('YYYY-MM-DD');
        aux.amount = advances.amount;
        aux.installments = advances.installments;
        aux.installments_amount = advances.installments[0].amount;
        aux.pay = advances.pay;
        aux.reading = true;
        setReading(aux);
        setIsReading(true);
    }

    const cancelEditAdvances = () => {
        <div style={{ display: 'none' }}>{document.title = "Adelantos"}</div>
        setIsEditing(false);
        window.scrollTo(0, 0);
    }
    const returnReadAdvances = () => {
        <div style={{ display: 'none' }}>{document.title = "Adelantos"}</div>
        setIsReading(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando..." />
            )}
            {!isLoadingSpinner && (
                <BeShowed show={!isEditing && !isReading}>
                    <Table>
                        <HeaderTable
                            th={
                                <>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>DNI</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Empleado</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Fecha de adelanto</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Monto total</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Pagado hasta la fecha</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Ver</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Editar</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Eliminar</th>
                                </>
                            }
                        />
                        <BodyTable
                            tbody={advances?.map((element, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dniEmployee}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.last_name}, {element.name}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{moment(element.date_admission).format('YYYY-MM-DD')}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.amount}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.pay}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <ReadAdvancesButton advances={element} read={readAdvances} />
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <EditAdvancesButton advances={element} edit={editAdvances} />
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <DeleteAdvancesButton advances={element} index={i} deleteEmployee={deleteAdvances} />
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        />
                    </Table>
                </BeShowed>
            )}
            <BeShowed show={isEditing}>
                <EditAdvances cancel={cancelEditAdvances} advances={editing} />
            </BeShowed>
            <BeShowed show={isReading}>
                <ReadAdvances return={returnReadAdvances} advances={reading} />
            </BeShowed>
        </>
    );
}