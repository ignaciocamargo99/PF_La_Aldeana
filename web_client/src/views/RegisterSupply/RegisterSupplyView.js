import './styles/PriceType.css';
import Buttons from '../../common/Buttons';

const RegisterSupplyView = () => {
    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Insumo</h1>
            </div>
            <div className="viewBody">
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyName" >Nombre*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" id="supplyName" type="text" placeholder="Ingrese nombre del insumo...">
                        </input>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyDescription">Descripción*</label>
                    </div>
                    <div className="form-control-input">
                        <textarea className="form-control" id="supplyDescription" placeholder="Ingrese descripción del insumo..." rows="3"></textarea>
                    </div>
                </div>
                <div className="price-form-body ">
                    <div className="price-title">
                        <label >Precio*</label>
                    </div>
                    <div className="price-container">
                        <div className="price-type-container">
                            <label htmlFor="supplySinglePrice" className="price-type-label price-label">Minorista*</label>
                            <input id="supplySinglePrice" className="form-control" type="number" min="0" placeholder="Ingrese precio por menor..." />
                        </div>
                        <div className="price-type-container">
                            <label htmlFor="supplyMultiplePrice" className="price-type-label price-label">Mayorista*</label>
                            <input id="supplyMultiplePrice" className="form-control" type="number" min="0" placeholder="Ingrese precio por mayor..." />
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyType">Tipo*</label>
                    </div>
                    <div className="form-control-input">
                        <select className="form-control" id="supplyType"
                            placeholder="hola">
                            <option disabled selected>Seleccione tipo de insumo...</option>
                        </select>
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="lotStock">Stock lotes*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" id="lotStock" type="number" min="0" placeholder="Ingrese stock de lotes..." />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="unitsPerLot">Cant. unidades por lote*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" id="unitsPerLot" type="number" min="0" placeholder="Ingrese cantidad de unidades por lote..." />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyStock">Stock actual del insumo*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" id="supplyStock" type="number" min="0" placeholder="Ingrese stock actual del insumo..." />
                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="supplyImage">Imagen*</label>
                    </div>
                    <div className="form-control-input">
                        <input className="form-control" type="file" id="supplyImage"></input>
                    </div>
                </div>
                <Buttons label='Registrar' />
            </div>
        </>
    )
}

export default RegisterSupplyView;