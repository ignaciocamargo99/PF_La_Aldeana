import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataFranchise from '../../DataFranchise';
import DataManager from '../../DataManager';
import '../../styles/FranchiseForm.css';

export default function ReadFranchise(props) {

    const [data, setData] = useState(props.franchiseToRead);
    const load = (childData) => setData(childData);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar franquicia"}</div>
            <Breadcrumb parentName="Franquicias" icon={faStore} parentLink="franchises" currentName="Consultar franquicia" />
            <div className="viewTitle">
                <h1>Franquicia "{data.name}"</h1>
            </div>
            <div className="viewBody">
                <DataFranchise load={load} data={data} />
                <hr />
                <DataManager load={load} data={data} />
                <div className='buttons'>
                    <button className='sendOk' onClick={props.onClickCancelRead}>Volver</button>
                </div>
            </div>
        </>
    );
}