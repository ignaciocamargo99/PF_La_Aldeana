import HeaderTable from "../../../common/Table/HeaderTable";
import BodyTable from "../../../common/Table/BodyTable";
import Table from '../../../common/Table/Table';
import LoaderSpinner from "../../../common/LoaderSpinner";
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

    const[date,setDate] = useState(new Date().getTime())

    const deleteLicense = (idLicense) => {
        Axios.delete(`${PORT()}/api/licenses/${idLicense}`)
        .then((response) => {
            if(response.data.Ok) warningMessage('Correcto','Se ha eliminado la licencia correctamente.','success')
            else warningMessage("Error", `${response.data.Message}`, "error")
        })
        .catch((error) => console.error(error))
    }

    const confirmDeleteLicense = (idLicense) => {
        return swal({
            title: "¿Seguro que desea eliminarlo?",
            text: "El elemento seleccionado ya no será visible para el personal de la empresa.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                deleteLicense(idLicense);
                props.setReloadList(!props.reloadList);
              }
            });
    }

    return (
        <>  
            <BeShowed show={props.showSpinner}>
                <LoaderSpinner color="secondary" loading="Cargando licencias"/>
            </BeShowed>
            <BeShowed show={!props.showSpinner}>
                <Table>
                    <HeaderTable
                        th={
                            <>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Inicio</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Fin</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Empleado</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Ver</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Editar</th>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Eliminar</th>
                            </>
                        }
                    />
                    <BodyTable
                        tbody={props.licenses.map((license, i) => {
                        if(
                            (props.filter === "All") || 
                            (props.filter === "Finish" && (new Date(dateBDToString(license.date_finish,'En')).getTime() < date)) ||
                            (props.filter === "Current" && (new Date(dateBDToString(license.date_init, 'En')).getTime() <= date) && (new Date(dateBDToString(license.date_finish, 'En')).getTime() >= date)) ||
                            (props.filter === "OnComing" && (new Date(dateBDToString(license.date_init, 'En')).getTime() > date)) 
                            )
                        {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(license.date_init,'Es')}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(license.date_finish,'Es')}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{license.last_name},{license.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendAdd" onClick={() => {props.setActionLicense('Ver',license)}}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendEdit" onClick={() => {props.setActionLicense('Editar',license)}}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendDelete" onClick={() => {confirmDeleteLicense(license.id_license)}}>
                                                <FontAwesomeIcon icon={faMinus}/>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                        })}
                    />
                </Table>
            </BeShowed>
        </>
    );
}