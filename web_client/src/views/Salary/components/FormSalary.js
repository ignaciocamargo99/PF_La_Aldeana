import Axios from "axios";
import { useEffect, useState } from "react";
import Buttons from '../../../common/Buttons';
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import { dateBDToString } from "../../../utils/ConverterDate/dateBDToString";
import ShowSelectedEmployee from "./ShowSelectedEmployee";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import '../../../assets/Buttons.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "reactstrap";
import dateText from "../../../utils/DateFormat/dateText";

const PORT = require('../../../config');

const FormSalary = (props) => {

    const [showSpinner,setShowSpinner] = useState(true);
    const [employees,setEmployees] = useState([]);
    const [employee,setEmployee] = useState(null);
    const [nro, setNro] = useState(0);
    const [errorName,setErrorName] = useState(true);
    const [errorPrice,setErrorPrice] = useState(true);
    
    const [othersPlus, setOthersPlus] = useState([]);
    const [othersMinus, setOthersMinus] = useState([]);
    const [main, setMain] = useState([
        {id: 'MtoF', name: 'Hs. Luneas a Viernes', hs: 1, price: 0},
        {id: 'SnS', name: 'Hs. Sabado y Domingo', hs: 1, price: 0},
        {id: 'FMtoF', name: 'Hs. Feriado Luneas a Viernes', hs: 1, price: 0},
        {id: 'FSnS', name: 'Hs. Feriado Sabado y Domingo', hs: 1, price: 0},
        {id: 'F', name: 'Hs. Franco', hs: 1, price: 0}
    ]);
    const [totalHs, setTotalHs] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
        .then((response) => {
            setEmployees(response.data);
            if (props.action === 'Registrar') setEmployee(response.data[nro]);
            else setEmployee(response.data.find((employee) =>  { return employee.dni === props.salary.employee }));
            setShowSpinner(false);
        });
    },[props.action]);
    
    const registerSalary = () => {
        loadingMessage("Registrando el salario");
        /*Axios.post(`${PORT()}/api/licenses`, {"date_init": dateInit.current.value,"date_finish": dateFinish.current.value,
                "dni_employee": employee.dni,"reason": reason.current.value, "active": 1})
        .then((response) => {
            if (response.data.Ok) resetStates(true)
            else warningMessage("Error", `${response.data.Message}`, "error")
        })
        .catch((error) => console.error(error))   
        */
    }

    const editSalary = () => {
        loadingMessage("Editando salario");
        /*
        Axios.put(`${PORT()}/api/licenses/${props.license.id_license}`, {"date_init": dateInit.current.value,
            "date_finish": dateFinish.current.value,"dni_employee": employee.dni,"reason": reason.current.value})
        .then((response) => {
            if (response.data.Ok) comeBack(true)
            else warningMessage("Error", `${response.data.Message}`, "error")
        })
        .catch((error) => console.error(error))
        */
    }
    
    const resetStates = (showMsg) => {
        if(showMsg){
            warningMessage('Atención','Se ha registrado la licencia correctamente','success');
            props.setReloadList(!props.reloadList);
        } else if (nro < employees.length) {
            if (nro === 0) {
                setNro(nro + 2);
                setEmployee(employees[nro + 2]);
            } else {
                setNro(nro + 1);
                setEmployee(employees[nro + 1]);
            }
        }
    }

    const comeBack = (msg) => {
        if(msg){
            warningMessage('Atención','Se ha editado la licencia correctamente','success');
            props.setReloadList(!props.reloadList);
        }
        props.setActionLicense('Listar',null);
    }

    const actionNotOK = () =>{
        if (errorName){
            warningMessage('Atención','Se debe ingresar un nombre a totdos los adicionales y descuentos','warning');
        }
        else if (errorPrice){
            warningMessage('Atención','Todos los campos de precio deben ser completados y superiores a 0','warning');
        }
    }

    const validate = (e) => {
        if (e.target.value.length > 6) e.target.value = e.target.value.slice(0, 6);
    }

    const addPrice = (j, e, t) => {
        if (e.target.value <= 0) setErrorPrice(true);
        if (t === 0) {
            const aux = [];
            main.map((hs, i) => {
                if (hs === j) aux[i] = {id: hs.id, name: hs.name, hs: hs.hs, price: parseInt(e.target.value)};
                else aux[i] = {id: hs.id, name: hs.name, hs: hs.hs, price: hs.price};
            });
            setMain(aux);

        } else if (t === 1) {
            const aux = [];
            othersPlus.map((inc, i) => {
                if (inc === j) aux[i] = {name: inc.name, price: parseInt(e.target.value)};
                else aux[i] = {name: inc.name, price: inc.price};
            });
            setOthersPlus(aux);
        } else {
            const aux = [];
            othersMinus.map((disc, i) => {
                if (disc === j) aux[i] = {name: disc.name, price: parseInt(e.target.value)};
                else aux[i] = {name: disc.name, price: disc.price};
            });
            setOthersMinus(aux);
        }
    }

    const addName = (j, e, t) => {
        if (t === 1) {
            const aux = [];
            othersPlus.map((inc, i) => {
                if (inc === j) aux[i] = {name: e.target.value, price: inc.price};
                else aux[i] = {name: inc.name, price: inc.price};
            });
            setOthersPlus(aux);
        } else {
            const aux = [];
            othersMinus.map((disc, i) => {
                if (disc === j) aux[i] = {name: e.target.value, price: disc.price};
                else aux[i] = {name: disc.name, price: disc.price};
            });
            setOthersMinus(aux);
        }
    }

    const addOtherPlus = () => {
        const aux = [];
        othersPlus.map((inc, i) => {aux[i] = inc});
        aux.push({name: '', price: 0});
        setOthersPlus(aux);
    }

    const addOtherMinus = () => {
        const aux = [];
        othersMinus.map((disc, i) => {aux[i] = disc});
        aux.push({name: '', price: 0});
        setOthersMinus(aux);
    }

    const deleteOtherMinus = (e) => {
        const aux = [];
        othersMinus.map((disc, i) => {
            if (disc !== e) aux[i] = {name: disc.name, price: disc.price}
        });
        setOthersMinus(aux);
    }

    const deleteOtherPlus = (e) => {
        const aux = [];
        othersPlus.map((inc, i) => {
            if (inc !== e) aux[i] = {name: inc.name, price: inc.price}
        });
        setOthersPlus(aux);
    }

    useEffect(() => {
        let acuTotalHs = 0;
        let acuSubtotal = 0;
        let acuTotal = 0;
        let flagP = false;
        let flagN = false;

        main?.forEach(i => {
            if (i.price < 1) {
                setErrorPrice(true);
                flagP = true;
            }
            acuTotalHs += i.hs * i.price;
        });
        
        acuSubtotal += acuTotalHs;

        othersPlus?.forEach(i => {
            if (i.price < 1) {
                setErrorPrice(true);
                flagP = true;
            }
            if (i.name.length < 1) {
                setErrorName(true);
                flagN = true;
            }
            acuSubtotal += i.price;
        });
        
        acuTotal += acuSubtotal;

        othersMinus?.forEach(i => {
            if (i.price < 1) {
                setErrorPrice(true);
                flagP = true;
            }
            if (i.name.length < 1) {
                setErrorName(true);
                flagN = true;
            }
            acuTotal -= i.price;
        });

        setTotalHs(acuTotalHs ? acuTotalHs : 0);
        setSubtotal(acuSubtotal ? acuSubtotal : 0);
        setTotal(acuTotal ? acuTotal : 0);
        setErrorName(flagN);
        setErrorPrice(flagP);
    }, [total, subtotal, totalHs, main, othersMinus, othersPlus]);

    return(
    <>
        <Breadcrumb parentName="Salarios" icon={faUserFriends} parentLink="salary" currentName={`${props.action} salario`}/>
        <div style={{display: 'none'}}>{document.title = `${props.action} salario` }</div>
            <div className="viewTitleBtn">
            <h1>{props.action} salario: {props.action!=="Registrar"?props.salary?.id_license + ' - ' + props.salary?.name + ' ' + props.salary?.last_name:''}</h1>
        </div>
        <div className="container" >
            <br/>
            <BeShowed show={showSpinner}>
                <LoaderSpinner color="secondary" loading="Cargando..."/>
            </BeShowed>
            <BeShowed show={!showSpinner}>
                <div className="formRow justify-content-center">
                    <div className="col-sm-6" >
                        <label>Fecha: <a style={{fontWeight: 'bold'}} >{dateText(props.month, false, true)}</a> </label>
                    </div>
                    <div className="col-sm-6" style={{fontWeight: 'bold', textAlign: 'right'}} >
                        <label>{nro}/{employees.length}</label>
                    </div>
                </div>
                {//<ShowSelectedEmployee selectedEmployee={employee}/>
                console.log(employee, employees)}
                <div className="formRow justify-content-center">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-2" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Horas</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Precio X Hs.</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em'}}>Subtotal</label>
                    </div>
                </div>

                {main?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-4" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>{i.name}</label>
                            </div>
                            <div className="col-sm-2" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>{i.hs}</label>
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input id={'price'+i.id} type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e, 0)} min='0' max='999999' />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <label style={{paddingLeft: '1em'}}>${(i.hs*i.price) ? i.hs*i.price : 0}</label>
                            </div>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>Total horas trabajadas</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>${totalHs}</label>
                    </div>
                </div>
                <br/>
                <BeShowed show={(props.salary.month ? props.salary.month.slice(5, -3) === '06' || props.salary.month.slice(5, -3) === '12' : false) && props.action === 'Registrar'}>
                    <div className="formRow justify-content-center">
                        <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontStyle: 'italic'}}>Aguinaldo</label>
                        </div>
                        <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px', textAlign: 'center', fontWeight: 'bold'}}>
                            -----
                        </div>
                    </div>
                </BeShowed>
                {othersPlus?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-1">
                                <button id='deleteOtherPlusButton' style={{marginRight: '0em'}} type="button" className="sendDelete" onClick={() => deleteOtherPlus(i)} style={{marginLeft: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /></button>
                            </div>
                            <div className="col-sm-8" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e, 1)} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e, 1)} min='0' max='999999' />
                            </div>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center" style={{border: '1px solid', borderRadius: '2px'}}>
                    <button id='addOtherPlusButton' type="button" className="sendAdd" onClick={addOtherPlus} style={{width: '11em', marginRight: '0.2em'}} ><FontAwesomeIcon icon={faPlus} /> Adicional</button>
                </div>
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px', text: 'bold'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>Subtotal</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px', text: 'bold'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>${subtotal}</label>
                    </div>
                </div>
                <br/>
                {othersMinus?.map(i => {
                    return(
                        <div className="formRow justify-content-center">
                            <div className="col-sm-1" >
                                <button id='deleteOtherMinusButton' style={{marginRight: '0em'}} type="button" className="sendDelete" onClick={() => deleteOtherMinus(i)} style={{marginLeft: '0.2em'}} ><FontAwesomeIcon icon={faMinus} /></button>
                            </div>
                            <div className="col-sm-8" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="text" style={{width: '100%'}} maxLength={100} onChange={(e) => addName(i, e, 2)} />
                            </div>
                            <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                                <input type="number" style={{width: '100%'}} onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)}
                                onChange={(e) => addPrice(i, e, 2)} min='0' max='999999' />
                            </div>
                        </div>
                    )
                })}
                <div className="formRow justify-content-center" style={{border: '1px solid', borderRadius: '2px'}}>
                    <button id='addOtherMinusButton' type="button" className="sendAdd" onClick={addOtherMinus} style={{width: '11em', marginRight: '0.2em'}} ><FontAwesomeIcon icon={faPlus} /> Descuento</button>
                </div>
                <div className="formRow justify-content-center">
                    <div className="col-sm-9" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>Total a cobrar</label>
                    </div>
                    <div className="col-sm-3" style={{border: '1px solid', borderRadius: '2px'}}>
                        <label style={{paddingLeft: '1em', fontWeight: 'bold'}}>${total}</label>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={props.action === 'Registrar'}>   
                <Buttons ready={(!errorName && !errorPrice)}
                    label='Confirmar' labelCancel='Saltar' actionNotOK={actionNotOK} actionOK={registerSalary} actionCancel={() => {resetStates(false)}}/>
            </BeShowed>
            <BeShowed show={props.action === 'Editar'}>   
                <Buttons ready={(!errorName && !errorPrice)}
                    label='Confirmar' labelCancel='Saltar' actionNotOK={actionNotOK} actionOK={editSalary} actionCancel={() => {comeBack(false)}}/>
            </BeShowed>
            <BeShowed show={props.action === 'Ver'}> 
                <button className="sendOk offset-sm-11" onClick={() => {comeBack(false)}}>Volver</button>
            </BeShowed>
        </div>        
    </>
    )
}

export default FormSalary;