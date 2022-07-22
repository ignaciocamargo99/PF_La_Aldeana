import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { FaAngleRight } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import dateText from '../../../../utils/DateFormat/dateText';
import BeShowed from '../../../../common/BeShowed';
import Viewer from '../../ProductSales/components/PDFModalViewer';
import MyDocument from './PDFStockReport';
import warningMessage from 'utils/WarningMessages/warningMessage';

const PORT = require('../../../../config');
const Options = (props) => {
    const [showPdf, setShowPDF] = useState(false);
    let permissionsAccess = props.permissionsAccess;
    const [MyDoc, setMyDoc] = useState('');

    const inputDescriptionReport = useRef();
    const [description, setDescription] = useState(null);

    const onChangeDescriptionReport = () => setDescription(inputDescriptionReport.current.value);

    useEffect(() => {
        Axios.get(PORT() + `/api/stockFlavorsReport`)
            .then((res) => {
                let data = [[],[]];
                res.data.Data.res.forEach(aux => {
                    aux.list = aux.list.sort((a, b) => a.name.trim().toUpperCase() > b.name.trim().toUpperCase() ? 1 : -1);
                    aux.list = aux.list.sort((a, b) => a.type.trim().toUpperCase() < b.type.trim().toUpperCase() ? 1 : -1);
                    aux.list = aux.list.sort((a, b) => a.family.trim().toUpperCase() > b.family.trim().toUpperCase()? 1 : -1);
                });
                data[0] = res.data.Data.res;
                data[1] = res.data.Data.totals;
                
                props.setStock(data);
                
                if (data[0].length > 0){
                    let stock = data[0];
                    let datTotalised = [];
                    let totals = [];
                    
                    data[1]?.forEach((e, i) => {
                        datTotalised.push(e.quantity);
                        totals.push(e);
                    });

                    const totalised = {
                        type: 'outlabeledPie',
                        labels: ['Sin stock', '<= pto. de reorden', '> pto. de reorden'],
                        datasets: [
                        {
                            label: 'baldes',
                            data: datTotalised,
                        },
                        ],
                        total: data[1][0].quantity + data[1][1].quantity + data[1][2].quantity
                    };
                    setMyDoc(<MyDocument user={props.user} title={"(" + dateText(props.dateFrom, true, true) + ")"} description={(!description ? '' : description)} 
                    stock={stock} totalisedChart={totalised} totals={totals} />);
                }

                props.setLoaded(true);

            })
            .catch((error) => {
                props.setLoad(0);
                console.log('Oops...', 'Error en el servidor', error);
                props.setLoaded(true);
                warningMessage('Error', 'Error en el servidor', 'error');
            })
    }, [props.load, description]);

    const showRenderPDF = () => {
        setShowPDF(true);
    }

    const cancel = () => {
        setShowPDF(false);
    }

    const handlerLoader = () => props.setLoad(true);

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Descripción adicional del reporte</label>
                </div>
                <div className="form-control-input">
                    <input className="form-control" type="text" id='descriptionReport' maxLength="120" ref={inputDescriptionReport} onChange={onChangeDescriptionReport} />
                </div>
            </div>
            <div className="formRow d-flex justify-content-between">
                <div className="mx-auto">
                    <BeShowed show={permissionsAccess === 1 || permissionsAccess === 2}>
                        <button className="btn btn-light newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className="btn btn-light disabledNewBtn" style={{ marginRight: '1em', minWidth: '15em' }} id='printButon' disabled><FaFile /> Imprimir informe</button>
                    </BeShowed>
                    <BeShowed show={permissionsAccess === 3 || permissionsAccess === 'Reportes Recursos Humanos'}>
                        <button className="btn btn-light newBtn" id='genrateButon' style={{ marginRight: '1em', minWidth: '15em' }} onClick={handlerLoader}><FaAngleRight /> Generar informe</button>
                        <button className={"btn btn-light " + (props.dateFrom > props.dateTo || !props.load  || props.stock?.length < 1 ?"disabledNewBtn":"newBtn")} id='printButon' disabled={!props.load || props.stock?.length < 1 } style={props.load > 0 ? { minWidth: '15em' } : { minWidth: '15em', backgroundColor: 'grey' }}
                            onClick={showRenderPDF} ><FaFile /> Imprimir informe</button>
                    </BeShowed>
                </div>
            </div>
            <Viewer MyDoc={MyDoc}reportOf='stock' showPdf={showPdf} cancel={cancel} title={"(" + !props.dateFrom?new Date().toLocaleDateString():dateText(props.dateFrom, true, true) + ")"} description={(!description ? '' : description)} ></Viewer>
        </>
    );
}

export default Options;