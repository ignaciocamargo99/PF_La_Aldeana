import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { updateProductionFlavors } from '../../../actions/FlavorActions';
import LoaderSpinner from '../../../common/LoaderSpinner';
import TableFlavorsUp from './TableFlavorsUp';
import TableFlavorsDown from './TableFlavorsDown';
import warningMessage from '../../../utils/WarningMessages/warningMessage';

const PORT = require('../../../config');

const FlavorsTable = (props) => {

    let flavorsDestiny = []
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [listTable, setListTable] = useState([]);
    const [destinyTable, setDestinyTable] = useState([]);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/flavors')
            .then((response) => {
                handlerLoadingSpinner();
                let auxFlavor = response.data;
                auxFlavor?.map((e, i) => e.amount = 0);
                setListTable(auxFlavor);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const upload = (i) => {
        let auxDestiny = destinyTable;
        if (listTable[i].amount > 0 && listTable[i].amount <= 100) {
            let aux = [];
            listTable?.map((e, j) => {
                if (j !== i) {
                    aux[j] = e;
                } else {
                    auxDestiny[j] = e;
                }
            });
            setListTable(aux);
            setDestinyTable(auxDestiny);
            flavorsDestiny = auxDestiny.filter(() => true);
            props.updateProductionFlavors(flavorsDestiny);
        }
        else if (listTable[i].amount < 0) {
            warningMessage("Error", "La cantidad debe ser mayor a 0.", "error");
        }
        else if (listTable[i].amount > 100) {
            warningMessage("Error", "La cantidad debe ser menor a 100.", "error");
        }
        else if (listTable[i].amount == 0) {
            warningMessage("Atención", "Se debe ingresar una cantidad válida para el sabor.", "info");
        }
    }

    const download = (i) => {
        let aux = [];
        let auxList = listTable;

        destinyTable?.map((e, j) => {
            if (j !== i) {
                aux[j] = e;
            } else {
                e.amount = 0;
                auxList[j] = e;
            }
        });
        setListTable(auxList);
        setDestinyTable(aux);
        props.updateProductionFlavors(aux);
    }

    return (
        <>
            {isLoadingSpinner && (
                <>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <LoaderSpinner color="primary" />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <label className="text-muted" style={{ margin: '10px', padding: '10px 50px 50px 50px' }}>Cargando sabores...</label>
                        </div>
                    </div>
                </>
            )}

            {!isLoadingSpinner && (
                <>
                    <TableFlavorsUp flavors={listTable} upload={upload}></TableFlavorsUp>
                    <TableFlavorsDown flavors={destinyTable} download={download}></TableFlavorsDown>
                </>
            )}

        </>
    )
}

const mapStateToProps = state => {
    return {
        productionFlavors: state.productionFlavors
    }
}

const mapDispatchToProps = {
    updateProductionFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(FlavorsTable);