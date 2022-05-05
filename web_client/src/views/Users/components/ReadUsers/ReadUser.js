import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataUser from '../DataUsers/DataUser';
import ListPermissions from '../Permissions/ListPermissions';

const ReadUser = ({ userToRead, onClickCancelRead }) => {
    const [data, setData] = useState(userToRead);

    const load = (childData) => setData(childData);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar usuario"}</div>
            <Breadcrumb parentName="Usuarios" icon={faUsers} parentLink="users" currentName="Consultar usuario" />
            <div className="viewTitle">
                <h1>Usuario {userToRead.nick_user}</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataUser load={load} data={data} />
                <ListPermissions data={data} />
                <div className='buttons'>
                    <button className='btn btn-light sendOk' onClick={onClickCancelRead}>Volver</button>
                </div>
            </div>
        </>
    );
};

export default ReadUser;