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
import { dateBDToSpanish } from '../../../utils/ConverterDate/dateBDToSpanish';

const PORT = require('../../../config');

export default function LicensesTable(props) {

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
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToSpanish(license.date_init)}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToSpanish(license.date_finish)}</td>
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
                                            <button className="sendDelete">
                                                <FontAwesomeIcon icon={faMinus} onClick={() => {confirmDeleteLicense(license.id_license)}}/>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    />
                </Table>
            </BeShowed>
        </>
    );
}