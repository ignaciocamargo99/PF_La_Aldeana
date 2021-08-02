import TableFlavorsUp from './components/TableFlavorsUp2'
import TableFlavorsDown from './components/TableFlavorsDown2'
import { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import useHTTPGet from "../../hooks/useHTTPGet";
import LoaderSpinner from '../../common/LoaderSpinner';
import Buttons from '../../common/Buttons';
import warningMessage from '../../utils/WarningMessages/warningMessage';
import successMessage from '../../utils/SuccessMessages/successMenssage';
import DatePicker from 'react-datepicker';
import formattedDate from '../../utils/date/formattedDate';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PORT = require('../../config');

export default function RegisterProductionView (props) {
    
    const [listTable, setListTable] = useState([]);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [destinyTable, setDestinyTable] = useState([]);
    const [ready, setReady] = useState(false);
    const [fecha, setFecha] = useState(new Date());
    const [dateProduc, setDateProduc] = useState(fecha);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(() => {
        Axios.get(PORT() + '/api/flavors')
            .then((response) => {
                handlerLoadingSpinner();
                let auxFlavor = response.data;
                auxFlavor?.map((e, i)=>e.amount = 0)
                setListTable(auxFlavor);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const upload = (i) => {
        if (listTable[i].amount > 0){
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
        else
        {
            warningMessage("Error","La cantidad debe ser mayor a 0.","error");
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
    
    const registerProduction = () => {
        
        
        try {
            if (ready) {
                Axios.post(PORT() + '/api/productions/new', {
                    dateProduction: dateProduc,
                    flavors: destinyTable
                })
                    .then(successMessage("Atención", "Producción Registrada", "success"))
                    .catch(err => console.error(err))
            }
            else throw new Error
        } 
        catch (Error) {
            console.log(Error);
        }

        setDestinyTable([]);
        
    }

    useEffect(() => {
        setDateProduc(formattedDate(fecha));
        console.log(dateProduc);
        if (destinyTable.length > 0 ) {
            setReady(true);
        }
        else
        {
            setReady(false);
        }
        console.log(destinyTable)
    },[listTable, destinyTable, fecha])

    const cancelRegisterProduction = () => window.location.reload();

    const onChangeDate = (fecha) => setFecha(fecha);

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producción</h1>
            </div>

            <div className="viewBody">

                <div className="form-row">
                    <div className="form-control-label">
                        <label className="col-3">Fecha</label>
                    </div>
                    <div className="row justify-content-end">
                        <DatePicker selected={fecha} onChange={onChangeDate} dateFormat="dd/MM/yyyy"/>
                    </div>
                </div>

                {isLoadingSpinner && (
                    <>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <LoaderSpinner color = "primary" />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <label className="text-muted" style={{margin: '10px', padding: '10px 50px 50px 50px'}}>Cargando sabores...</label>
                            </div>
                        </div>
                    </>
                )}     
                
                {!isLoadingSpinner && (
                    <>
                        <TableFlavorsUp flavors={listTable} upload={upload}></TableFlavorsUp>
                        <TableFlavorsDown flavors={destinyTable} download={download}/>
                    </>
                )}

                <Buttons label="Registrar " ready={ready} actionOK={registerProduction} actionNotOK={registerProduction} actionCancel={cancelRegisterProduction}></Buttons>
                
                
            </div>
        </>
    );
}