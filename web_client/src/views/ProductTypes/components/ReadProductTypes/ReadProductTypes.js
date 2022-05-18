import { faUsers } from '@fortawesome/free-solid-svg-icons';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataProductType from '../DataProductType/DataProductType';

const ReadProductTypes = ({ productTypeToRead, onClickCancelRead }) => {

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar tipo de producto"}</div>
            <Breadcrumb parentName="Tipos de producto" icon={faUsers} parentLink="productTypes" currentName="Consultar tipo de producto" />
            <div className="viewTitle">
                <h1>Tipo de producto "{productTypeToRead.name}"</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataProductType productType={productTypeToRead} />
                <div className='buttons'>
                    <button className='btn btn-light sendOk' onClick={onClickCancelRead}>Volver</button>
                </div>
            </div>
        </>
    );
};

export default ReadProductTypes;