import { useState } from 'react';
import useHTTPGet from '../../../hooks/useHTTPGet';
import ModalSupplies from '../modals/ModalSupplies';
import TableSuppliesUp from './SuppliesPairTables/TableSuppliesUp';
import LoaderSpinner from '../../../common/LoaderSpinner';
import UploadSuppliesByName from './UploadSuppliesByName';

const PORT = require('../../../config');

const SuppliesProduct = () => {

    const supplies = useHTTPGet(PORT() + '/api/supplies');
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState('');

    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [typeOfUpload, setTypeOfUpload] = useState('text');
    let [listTable, setListTable] = useState([]);
    let [destinyTable, setDestinyTable] = useState([]);


    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);
    const handlerTabSelection = (value) => setTypeOfUpload(value);

    const upload = (id) => {
        let aux = [];
        let auxDestiny = destinyTable;
        listTable.map((e) => {
            if (e.id_supply !== id) {
                aux[e.id_supply] = e;
            } else {
                auxDestiny[e.id_supply] = e;
            }
        });

        setListTable(aux);
        setDestinyTable(auxDestiny);
    }

    const download = (id) => {
        let aux = [];
        let auxList = listTable;

        destinyTable.map((e) => {
            if (e.id_supply !== id) {
                aux[e.id_supply] = e;
            } else {
                auxList[e.id_supply] = e;
            }
        });

        setListTable(auxList);
        setDestinyTable(aux);
    }

    const openModal = (mod) => {
        console.log(showModal);
        setModal(mod);
        setShowModal(true);
    }

    const close = () => {
        console.log(showModal);
        setShowModal(false);
    }

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="productSupplies">Insumos*</label>
                </div>
                <div className="form-combo-btn">
                    <div className="d-flex">
                        {/*<UploadSuppliesByName supplies={listTable} upload={upload}></UploadSuppliesByName>
                        {/*<TableSuppliesUp supplies={supplies}></TableSuppliesUp>
                        {/*
                        <div className="form-combo">
                            <input className="form-control " list="suppliesDatalist" id="productSupplies" placeholder="Seleccione insumos...">
                            </input>
                            <datalist id="suppliesDatalist">
                                {supplies?.map((s) => {
                                    return (
                                        <option key={s.id_supply} value={s.name}>
                                        </option>
                                    )
                                })}
                            </datalist>
                        </div>
                        <div className="d-flex-col form-add-btn">
                            <button type="button" className="btn btn-primary" onClick={openModal}>+</button>
                        </div>
                            */}
                    </div>
                </div>
            </div>
            <ModalSupplies close={close} show={showModal} />
        </>
    );
}

export default SuppliesProduct;