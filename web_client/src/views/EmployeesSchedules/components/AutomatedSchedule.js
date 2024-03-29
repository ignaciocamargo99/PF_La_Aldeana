import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useRef } from 'react';
import ModalPrioritySelection from './ModalPrioritySelection';
import generateAutomatedDay from '../AutomatedFunction/GenerateAutomatedDay';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import { calculateEmployees, calculateTypeEmployees, filledWith } from '../../../utils/ArrayFunctions/ArrayEmployeesFunctions';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

const PORT = require('../../../config');

const AutomatedSchedule = ({ today, nonworkingDays, employees, turns, setShowAutomatedSchedule, licenses, charges }) => {

    // 0 - Dia Normal // 1 - Fin de Semana // 2 - Feriados
    const [typeDay, setTypeDay] = useState(0);
    const [params, setParams] = useState(null);
    const [priority, setPriority] = useState(null);
    const [enablesEmployeesForType, setEnablesEmployeesForType] = useState(new Array(charges.length).fill(['...']));
    const [showCharge, setShowCharge] = useState(null);
    const [initDate, setInitDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());

    useEffect(() => {
        if (employees) {
            let newPriority = []
            newPriority.length = employees.length;
            newPriority.fill(1)
            setPriority(newPriority)
        }
    }, [employees])

    useEffect(() => {
        updateEnablesEmployeesForType();
    }, [params, typeDay])

    const updateEnablesEmployeesForType = () => {
        let newEnablesEmployesForType = [];
        charges.forEach((charge) => {
            newEnablesEmployesForType.push(params ? calculateTypeEmployees(employees, charge, turns, params[typeDay]) : 0);
        })
        setEnablesEmployeesForType(newEnablesEmployesForType)
    }

    useEffect(() => {
        if (turns) {
            initParams();
        }
    }, [turns])

    const initParams = () => {
        let initParams = [[], [], []];
        for (let i = 0; i < initParams.length; i++) {
            initParams[i].length = turns.length;
            initParams[i].fill(0);
        }
        setParams(initParams);
    }

    const buildVariables = () => {
        let variables = {};
        for (let i = 0; i < employees.length; i++) {
            for (let j = 0; j < employees[i].charges.length; j++) {
                for (let k = 0; k < turns.length; k++) {
                    if (employees[i].charges[j].chargeName.slice(0, 1).toUpperCase() === turns[k].name.slice(0, 1).toUpperCase()) {

                        let object = {};
                        object[`${employees[i].dni}`] = 1;
                        for (let l = 0; l < turns.length; l++) {
                            if (k === l) {
                                object[`${turns[l].abbreviation}`] = 1
                            } else {
                                object[`${turns[l].abbreviation}`] = 0
                            }
                        }
                        let number = 100000;
                        if (turns[k].name.toUpperCase().includes('MAÑANA')) number = priority[i] * 1;
                        object["value"] = number;
                        variables[`${employees[i].dni}_${employees[i].charges[j].chargeId}_${turns[k].id}`] = object;
                    }
                }
            }
        }
        return variables;
    }

    const buildConstraints = (typeDay) => {
        let constraints = {};
        for (let i = 0; i < employees.length; i++) {
            constraints[`${employees[i].dni}`] = { "max": 1, "min": 0 };
        }
        for (let i = 0; i < turns.length; i++) {
            constraints[`${turns[i].abbreviation}`] = { "equal": params[typeDay][i] };
        }
        return constraints;
    }

    const onChangeParams = (e, i) => {
        let newParams = params.slice();
        newParams[typeDay][i] = parseInt(e.target.value);
        setParams(newParams);
    }

    const onBlurParams = (e, i) => {
        let newParams = params.slice();
        if (e.target.value === '') {
            newParams[typeDay][i] = 0;
            setParams(newParams);
        }
    }

    const onChangeDate = (newDate, type) => {
        if (type === 'init') {
            setInitDate(newDate);
            if (newDate.getTime() > finishDate.getTime()) {
                setFinishDate(newDate);
            }
        }
        else {
            setFinishDate(newDate);
            if (initDate.getTime() > newDate.getTime()) {
                setInitDate(newDate);
            }
        }
    }

    const generateSchedule = () => {
        let isWrongParams = false;
        enablesEmployeesForType.forEach((quantity) => {
            if (typeof quantity === 'string') { isWrongParams = true }
        })
        if (isWrongParams) {
            swal("Error", "No se puede generar el cronograma con esos parámetros", "error");
            return;
        }
        let isFilledWithZeros = 0;
        params.forEach((param) => { if (filledWith(param, 0)) { isFilledWithZeros++ } });
        if (isFilledWithZeros === 3) {
            swal("Atención", "No has modificado ningún dato", "warning");
            return;
        }

        Swal.fire({
            title: "Atención",
            text: "Si existiese un cronograma ya generado entre los dias seleccionados, ¿Desea sobreescribir los datos con los nuevos parámetros?",
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Sobreescribir',
            confirmButtonColor: '#B29500',
            denyButtonText: 'Generar sin sobreescribir',
            denyButtonColor: '#64629C',
            cancelButtonText: 'Cancelar la generación',
            cancelButtonColor: '#6C6C6C'
        })
            .then((result) => {
                if (result.isDismissed) return;
                loadingMessage('Generando grilla...')
                let init = new Date(initDate.toISOString().slice(0, 10));
                init.setDate(init.getDate() + 1);
                let finish = new Date(finishDate.toISOString().slice(0, 10));
                finish.setDate(finish.getDate() + 1);
                let arrayInsertsEmployees = [];

                while (init.getTime() <= finish.getTime()) {
                    let isNwD = nonworkingDays.findIndex((nwD) => nwD.dia === init.getDate() && nwD.mes === init.getMonth() + 1)
                    let isWeekendDay = init.getDay() === 6 || init.getDay() === 0;
                    let typeDay = isNwD !== -1 ? 2 : isWeekendDay ? 1 : 0;

                    let variables = buildVariables();
                    let constraints = buildConstraints(typeDay);
                    let results = generateAutomatedDay(constraints, variables);
                    if (results.feasible === false) {
                        swal("Error", "No se puede generar la grilla con los parámetros elegidos", "error");
                        return;
                    } else {
                        for (let i = 0; i < employees.length; i++) {
                            for (let j = 0; j < employees[i].charges.length; j++) {
                                for (let k = 0; k < turns.length; k++) {
                                    if (results.hasOwnProperty(`${employees[i].dni}_${employees[i].charges[j].chargeId}_${turns[k].id}`)) {
                                        let yesterday = new Date(init)
                                        yesterday.setDate(yesterday.getDate() - 1)
                                        let newJDEmployee = {
                                            date: `${yesterday.toISOString().slice(0, 8)}${init.getDate()}`,
                                            employee_dni: employees[i].dni,
                                            id_compound_turn: turns[k].id
                                        }
                                        arrayInsertsEmployees.push(newJDEmployee);
                                    }
                                }
                            }
                        }
                    }
                    init.setDate(init.getDate() + 1);
                }
                if (result.isConfirmed) {
                    axios.delete(`${PORT()}/api/jdEmployee/Schedule?dateInit=${initDate.toISOString().slice(0, 10)}&dateFinish=${finishDate.toISOString().slice(0, 10)}`)
                        .then(() => {
                            if (arrayInsertsEmployees.length === 0) swal("Correcto", "Cronograma generado exitosamente", "success");
                            arrayInsertsEmployees.forEach((newJDEmployee, i) => {
                                axios.post(`${PORT()}/api/jdEmployee`, newJDEmployee)
                                    .then(() => {
                                        if (i === (arrayInsertsEmployees.length - 1)) {
                                            swal("Correcto", "Cronograma generado exitosamente", "success");
                                            window.location.reload();
                                        }
                                    })
                            })
                        })
                }
                else if (result.isDenied) {
                    if (arrayInsertsEmployees.length === 0) swal("Correcto", "Cronograma generado exitosamente", "success");
                    arrayInsertsEmployees.forEach((newJDEmployee, i) => {
                        axios.get(`${PORT()}/api/jdEmployee/Date?date=${newJDEmployee.date}`)
                            .then((res) => {
                                if (res.data.length === 0) {
                                    axios.post(`${PORT()}/api/jdEmployee`, newJDEmployee)
                                        .then(() => {
                                            if (i === (arrayInsertsEmployees.length - 1)) {
                                                swal("Correcto", "Cronograma generado exitosamente", "success");
                                                window.location.reload();
                                            }
                                        })
                                }
                                else if (i === (arrayInsertsEmployees.length - 1)) {
                                    swal("Correcto", "Cronograma generado exitosamente", "success");
                                    window.location.reload();
                                }
                            })
                    })
                }
            });
    }

    return (
        <>
            <div className="container">
                <h3 style={{ textAlign: 'center' }}><b>Generación Automática del Cronograma</b></h3>
                <br />
                <h4><b>Parámetros</b></h4>
                <div className="formRow">
                    <div className="col-sm-4">
                        <label className="col-sm-6">Fecha desde: &nbsp;</label>
                        <input style={{ width: '150px' }} type="date"
                            onChange={(e) => { onChangeDate(new Date(e.target.value), 'init') }}
                            value={initDate.toISOString().slice(0, 10)} />
                    </div>
                    <div className="col-sm-4 offset-sm-4">
                        <label className="col-sm-6">Fecha hasta: &nbsp;</label>
                        <input style={{ width: '150px' }} type="date"
                            onChange={(e) => { onChangeDate(new Date(e.target.value), 'finish') }}
                            value={finishDate.toISOString().slice(0, 10)} />
                    </div>
                </div>
                <br />
                <div className="formRow">
                    <button className={`btn ${typeDay === 0 ? 'btn-secondary' : 'btn-primary'} col-sm-4`} onClick={() => { setTypeDay(0) }}>Dias Normales (Lun a Vier)</button>
                    <button className={`btn ${typeDay === 1 ? 'btn-secondary' : 'btn-primary'} col-sm-4`} onClick={() => { setTypeDay(1) }}>Fin De Semana (Sab y Dom)</button>
                    <button className={`btn ${typeDay === 2 ? 'btn-secondary' : 'btn-primary'} col-sm-4`} onClick={() => { setTypeDay(2) }}>Feriados</button>
                </div>
                <br />
                <label className='col-sm-9'>Empleados totales: <b>{params && employees ? calculateEmployees(employees, params[typeDay]) : '-'}</b></label>
                {charges?.map((charge, i) => {
                    return (
                        <div style={{ margin: '2%' }}>
                            <div className='row'>
                                <label className='col-sm-2'>{charge.name}</label>
                                <label className='col-sm-4 offset-sm-5'>Empleados: <b>{enablesEmployeesForType[i]}</b></label>
                                <div className='col-sm-1'><button className='btn' onClick={() => { setShowCharge(charge.id_charge) }}><FontAwesomeIcon icon={faSortNumericDown} /></button></div>
                            </div>
                            {params ? turns.map((turn, i) => {
                                let turnName = turn.name.split(" ");
                                return (
                                    turn.name.includes(charge.name.slice(0, 3)) ?
                                        <div key={turn.id} className="formRow">
                                            <div className='col-sm-2 offset-sm-2'>
                                                <label>{turnName[turnName.length - 1]} &nbsp;</label>
                                            </div>
                                            <input id={`inputTurn${turn.id}`} className="col-sm-1" type="number" min="0"
                                                style={{ textAlign: 'center' }} value={params[typeDay][i]}
                                                onChange={(e) => { onChangeParams(e, i) }}
                                                onBlur={(e) => { onBlurParams(e, i) }}></input>
                                        </div> : <></>
                                )
                            }) : <></>}
                        </div>
                    )
                })}
                <br />
                <div className='buttons'>
                    <button className="btn btn-light sendOk" onClick={generateSchedule} >Generar grilla</button>
                    <button className='btn btn-light cancel' onClick={() => setShowAutomatedSchedule(false)}>Volver</button>
                </div>
            </div>
            {priority ? <ModalPrioritySelection show={showCharge != null} charge={showCharge} setShowCharge={setShowCharge} employees={employees}
                priority={priority} setPriority={setPriority} /> : <></>}
        </>
    )
}

export default AutomatedSchedule;