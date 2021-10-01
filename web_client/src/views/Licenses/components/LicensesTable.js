import HeaderTable from "../../../common/Table/HeaderTable";
import BodyTable from "../../../common/Table/BodyTable";
import Table from '../../../common/Table/Table';
import { useEffect, useState } from "react";
import Axios from "axios";
import LoaderSpinner from "../../../common/LoaderSpinner";
import BeShowed from "../../../common/BeShowed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/Buttons.css';

const PORT = require('../../../config');

export default function LicensesTable() {
    
    const[licenses,setLicenses] = useState([]);
    const[showSpinner,setShowSpinner] = useState(true);

    useEffect(() => {
        Axios.get(`${PORT()}/api/licenses`)
        .then((response) => {
            setLicenses(response.data);
            setShowSpinner(false);
        })
    },[])

    
    const dateBDToSpanish = (dateDB) => {
        let year = dateDB.slice(0,4)
        let month = dateDB.slice(5,7)
        let day = dateDB.slice(8,10)
        return(`${day}/${month}/${year}`)
    }

    return (
        <>  
            <BeShowed show={showSpinner}>
                <LoaderSpinner color="secondary" loading="Cargando licencias"/>
            </BeShowed>
            <BeShowed show={!showSpinner}>
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
                        tbody={licenses.map((license, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToSpanish(license.date_init)}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToSpanish(license.date_finish)}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{license.last_name},{license.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendAdd">
                                                <FontAwesomeIcon icon={faEye}/>
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendEdit">
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendDelete">
                                                <FontAwesomeIcon icon={faMinus}/>
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