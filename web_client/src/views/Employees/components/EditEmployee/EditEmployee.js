import Axios from 'axios';
import { useEffect, useState } from 'react';
import Buttons from '../../../../common/Buttons';
import DataEmployee from '../DataEmployee';
import ExtraDataEmployee from '../ExtraDataEmployee';
import Breadcrumb from '../../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const PORT = require('../../../../config');

export default function EditEmployee(props) {
    const [data, setData] = useState(props.employee);
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setData(childData)
        console.log(data)
    }

    // const registerProduct = () => {
    //     Axios.put(PORT(), formData)
    //         .then(successMessage('Atención', 'El producto se ha editado correctamente', 'success'))
    //         .catch(error => console.log(error));
    // };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Editar empleado" />
            <h2 style={{ fontWeight: 'bold' }}>Editar empleado {props.employee.name + " " + props.employee.lastName}</h2>
            <br />
            <DataEmployee load={load} data={data} />
            <ExtraDataEmployee load={load} data={data} />
            {/* <Buttons
                label='Registrar' actionOK={registerProduct}
                actionNotOK={validationProductRegister}
                actionCancel={props.end}
                ready={ready}
                data={data} /> */}
        </>
    );
}