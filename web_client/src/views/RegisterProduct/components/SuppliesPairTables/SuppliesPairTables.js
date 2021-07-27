import Axios from 'axios';
import { useEffect, useState } from "react";
import LoaderSpinner from '../../../../common/LoaderSpinner';
import TableSuppliesDown from "./TableSuppliesDown";
import TableSuppliesUp from "./TableSuppliesUp";

const PORT = require('../../../../config');

export default function SuppliesPairTables(props) {
    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }

    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    //const [typeOfUpload, setTypeOfUpload] = useState('text');
    const [listTable, setListTable] = useState([]);
    const [destinyTable, setDestinyTable] = useState([]);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/supplies')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                auxSupply?.map((e, i) => e.amount = 0)
                setListTable(auxSupply);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                            <label className="text-muted" style={{ margin: '10px', padding: '10px 50px 50px 50px' }}>Cargando...</label>
                        </div>
                    </div>
                </>
            )}
            {!isLoadingSpinner && (
                <>
                    <TableSuppliesUp upload={upload} supplies={listTable} />
                    <TableSuppliesDown download={download} supplies={destinyTable} />
                </>
            )}
        </>
    );
}