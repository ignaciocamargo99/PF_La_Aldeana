import Axios from 'axios';
import { useEffect, useState } from "react";
import putOnList from "./putOnList";
import LoaderSpinner from '../../../../common/LoaderSpinner';
import warningCountProduct from '../../../../utils/WarningMessages/warningCountProduct';
import TableSuppliesDown from "./TableSuppliesDown";
import TableSuppliesUp from "./TableSuppliesUp";

const PORT = require('../../../../config');

export default function SuppliesPairTables(props) {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [listTable, setListTable] = useState([]);
    const [destinyTable, setDestinyTable] = useState([]);
    const [load, setLoad] = useState(false);
    const [refreshTable,setRefreshTable] = useState(false);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/supplies')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                auxSupply?.map((e, i) => e.amount = 0)
                setListTable(auxSupply);
                setLoad(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        Axios.get(PORT() + `/api/productSupply/${props.data.id_product}`)
        .then((response) => {
            handlerLoadingSpinner();
            let auxSupply = putOnList(response.data, listTable);
            setDestinyTable(auxSupply);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [load]);

    const upload = (i) => {
        if (listTable[i].amount > 0) {
            let aux = [];
            let auxDestiny = destinyTable;
            listTable?.map((e, j) => {
                if (j !== i) {
                    aux[j] = e;
                } else {
                    auxDestiny[j] = e;
                }
            });

            setListTable(aux);
            setDestinyTable(auxDestiny);
        }
        else return warningCountProduct();
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
        setRefreshTable(!refreshTable);

    }

    useEffect(() => {
        let data = props.data;
        data.supplies = destinyTable;
        props.load(data);
    }, [destinyTable, listTable])


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
                            <label className="text-muted" style={{ margin: '10px', padding: '10px 50px 50px 50px' }}>Cargando...</label>
                        </div>
                    </div>
                </>
            )}
            {!isLoadingSpinner && (
                <>
                    <TableSuppliesUp upload={upload} supplies={listTable} refreshTable={refreshTable} />
                    <TableSuppliesDown download={download} supplies={destinyTable} />
                </>
            )}
        </>
    );
}