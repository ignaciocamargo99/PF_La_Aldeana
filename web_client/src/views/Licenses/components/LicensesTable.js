import HeaderTable from "../../../common/Table/HeaderTable";
import BodyTable from "../../../common/Table/BodyTable";
import Table from '../../../common/Table/Table';
import BeShowed from "../../../common/BeShowed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/Buttons.css';
import Axios from "axios";
import swal from 'sweetalert';
import warningMessage from '../../../utils/WarningMessages/warningMessage';
import { dateBDToString } from '../../../utils/ConverterDate/dateBDToString';
import { useState } from "react";

const PORT = require('../../../config');

export default function LicensesTable(props) {

    const [date] = useState(new Date().setHours(0, 0, 0, 0))
    let permissionsAccess = props.permissionsAccess;

    const deleteLicense = (idLicense) => {
        Axios.delete(`${PORT()}/api/licenses/${idLicense}`)
            .then((response) => {
                if (response.data.Ok) {
                    warningMessage('Correcto', 'Se ha cancelado la licencia correctamente.', 'success');
                    props.setReloadList(!props.reloadList);
                }
                else warningMessage("Error", `${response.data.Message}`, "error")
            })
            .then(() => {
            })
            .catch((error) => console.error(error))
    }

    const confirmDeleteLicense = (idLicense) => {
        return swal({
            title: "¿Seguro que desea cancelar la licencia?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteLicense(idLicense);
                }
            });
    }

    return (
        <>
            <BeShowed show={props.licenses.length !== 0}>
                <Table>
                    <HeaderTable
                        th={
                            <>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Inicio</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Fin</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Empleado</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Ver</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Editar</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Cancelar</th>
                            </>
                        }
                    />
                    <BodyTable
                        tbody={props.licenses.map((license, i) => {
                            if (
                                (props.filter === "All") ||
                                (props.filter === "Finish" && (new Date(dateBDToString(license.date_finish, 'En')).getTime() < date)) ||
                                (props.filter === "Current" && (new Date(dateBDToString(license.date_init, 'En')).getTime() <= date) && (new Date(dateBDToString(license.date_finish, 'En')).getTime() >= date)) ||
                                (props.filter === "OnComing" && (new Date(dateBDToString(license.date_init, 'En')).getTime() > date))
                            ) {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(license.date_init, 'Es')}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(license.date_finish, 'Es')}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{license.last_name},{license.name}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <button className="sendAdd" onClick={() => { props.setActionLicense('Ver', license) }}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <BeShowed show={permissionsAccess === 3} >
                                                    <button className="sendEdit" onClick={() => { props.setActionLicense('Editar', license) }} style={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date) ? { backgroundColor: 'grey', boxShadow: '0px 4px 4px rgba(180, 208, 232, 0.25)' } : null}
                                                        disabled={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </BeShowed>
                                                <BeShowed show={permissionsAccess !== 3} >
                                                    <button className="disabledSendBtn" disabled><FontAwesomeIcon icon={faEdit} /></button>
                                                </BeShowed>

                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <BeShowed show={permissionsAccess === 3}>
                                                    <button className="sendDelete" onClick={() => { confirmDeleteLicense(license.id_license) }} style={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date) ? { backgroundColor: 'grey', boxShadow: '0px 4px 4px rgba(180, 208, 232, 0.25)' } : null}
                                                        disabled={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date)}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                </BeShowed>
                                                <BeShowed show={permissionsAccess !== 3}>
                                                    <button className="disabledSendBtn" disabled><FontAwesomeIcon icon={faMinus} /></button>
                                                </BeShowed>

                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        })}
                    />
                </Table>
            </BeShowed>
            <BeShowed show={!props.showSpinner && props.licenses.length === 0}>
                <br />
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron licencias registradas hasta el momento.</h4>
            </BeShowed>
        </>
    );
}