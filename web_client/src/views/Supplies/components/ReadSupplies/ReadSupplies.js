import { faUsers } from '@fortawesome/free-solid-svg-icons';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataSupply from '../DataSupply';

const ReadSupplies = ({ supplyToRead, onClickCancelRead }) => {

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar insumo"}</div>
            <Breadcrumb parentName="Insumos" icon={faUsers} parentLink="supplies" currentName="Consultar insumo" />
            <div className="viewTitle">
                <h1>Insumo "{supplyToRead.name}"</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataSupply supply={supplyToRead}/>
                <div className='buttons'>
                    <button className='btn btn-light sendOk' onClick={onClickCancelRead}>Volver</button>
                </div>
            </div>
        </>
    );
};

export default ReadSupplies;