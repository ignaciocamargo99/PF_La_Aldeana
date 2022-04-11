import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import generateAutomatedDay from '../AutomatedFunction/GenerateAutomatedDay';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import { calculateEmployees, calculateTypeEmployees } from '../../../utils/ArrayFunctions/ArrayEmployeesFunctions';
import swal from 'sweetalert';

const PORT = require('../../../config'); 

const AutomatedSchedule = ({today, nonworkingDays, employees, turns, setShowAutomatedSchedule, licenses, charges}) => {

    // 0 - Dia Normal // 1 - Fin de Semana // 2 - Feriados
    const[typeDay,setTypeDay] = useState(0);
    const[params,setParams] = useState(null);
    const initDate = useRef();
    const finishDate = useRef();


    useEffect(() => {
        if(turns){
            initParams();
        }
    },[turns])

    const initParams = () => {
        let initParams = [[],[],[]];
        for(let i=0; i < initParams.length; i++){
            initParams[i].length = turns.length;
            initParams[i].fill(0);
        }
        setParams(initParams);
    }

    const buildVariables = (disabledEmployees) => {
        let variables = {};
        for(let i=0; i < employees.length; i++){
            for(let j=0; j < employees[i].charges.length; j++){
                for(let k=0; k < turns.length; k++){
                    if(employees[i].charges[j].chargeName.slice(0,1).toUpperCase() === turns[k].name.slice(0,1).toUpperCase() 
                        && !disabledEmployees.includes(employees[i].dni)){
                        
                        let object = {};
                        object[`${employees[i].dni}`] = 1;
                        for(let l=0; l < turns.length; l++){
                            if(k === l){
                                object[`${turns[l].abbreviation}`] = 1
                            }else{
                                object[`${turns[l].abbreviation}`] = 0
                            }
                        }
                        variables[`${employees[i].dni}_${employees[i].charges[j].id}_${turns[k].id}`] = object;
                    }
                }
            }
        }
        return variables;
    }

    const buildConstraints = (typeDay) => {
        let constraints = {};
        for(let i=0; i < employees.length; i++){
            constraints[`${employees[i].dni}`] = { "max" : 1 , "min" : 0};
        }
        for(let i=0; i < turns.length; i++){
            constraints[`${turns[i].abbreviation}`] = { "equal": params[typeDay][i]}; 
        }
        return constraints;
    }

    const onChangeParams = (e,i) => {
        let newParams = params.slice();
        newParams[typeDay][i] = parseInt(e.target.value);
        setParams(newParams);
    }

    const onBlurParams = (e,i) => {
        let newParams = params.slice();
        if(e.target.value === ''){
            newParams[typeDay][i] = 0;
            setParams(newParams);
        }
    }

    const onChangeDate = () => {
        if(new Date(initDate.current.value).getTime() > new Date(finishDate.current.value).getTime()){
            finishDate.current.value = initDate.current.value;
        }
    }

    const generateSchedule = () => {
        loadingMessage('Generando cronograma...');

        let init = new Date(initDate.current.value.slice(0,4),parseInt(initDate.current.value.slice(5,7))-1,initDate.current.value.slice(8,10));
        let finish = new Date(finishDate.current.value.slice(0,4),parseInt(finishDate.current.value.slice(5,7))-1,finishDate.current.value.slice(8,10));

        let daysOff;
        axios.get(`${PORT()}/api/daysOff?minDate=${init.getFullYear()}${init.getMonth() < 9 ?'0'+(init.getMonth() + 1):(init.getMonth() + 1)}${init.getDate() < 10 ?'0'+(init.getDate()):(init.getDate())}&maxDate=${finish.getFullYear()}${finish.getMonth() < 9 ?'0'+(finish.getMonth() + 1):(finish.getMonth() + 1)}${finish.getDate() < 10 ?'0'+(finish.getDate()):(finish.getDate())}`)
        .then((res) => {

            daysOff = res.data.Data;
            let arrayInsertsEmployees = [];
    
            while(init.getTime() <= finish.getTime()){
    
                let isNwD = nonworkingDays.findIndex((nwD) => nwD.dia === init.getDate() && nwD.mes === init.getMonth()+1)
                let isWeekendDay = init.getDay() === 6 || init.getDay() === 0;
                let typeDay = isNwD !== -1 ? 2 : isWeekendDay ? 1 : 0;
    
                
                let disabledEmployees = [];
                licenses.forEach((lic) => {
                    let initLic = new Date();
                    let finishLic = new Date();
                    initLic.setFullYear(lic.date_init.slice(0,4));
                    finishLic.setFullYear(lic.date_finish.slice(0,4));
                    initLic.setMonth((parseInt(lic.date_init.slice(5,7))-1));
                    finishLic.setMonth((parseInt(lic.date_finish.slice(5,7))-1));
                    initLic.setDate(lic.date_init.slice(8,10));
                    finishLic.setDate(lic.date_finish.slice(8,10));
                    if(initLic.getTime() <= init.getTime() && finishLic.getTime() >= init.getTime()){
                        disabledEmployees.push(lic.dni)
                    }
                });
                
                daysOff.forEach((dayOff) => {
                    disabledEmployees.push(dayOff.dni_employee)    
                });
                
                let variables = buildVariables(disabledEmployees);
                let constraints = buildConstraints(typeDay);    
                let results = generateAutomatedDay(constraints,variables);
    
    
                if(results.feasible === false){
                    swal("Error","No se puede generar la grilla con los parametros elegidos","error");
                    return;
                }else{
                    for(let i=0; i < employees.length; i++){
                        for(let j=0; j < employees[i].charges.length; j++){
                            for(let k=0; k < turns.length; k++){
                               if(results.hasOwnProperty(`${employees[i].dni}_${employees[i].charges[j].id}_${turns[k].id}`)){
                                    let newJDEmployee ={
                                            date: `${init.getFullYear()}-${init.getMonth()<9?'0'+(init.getMonth()+1):(init.getMonth()+1)}-${init.getDate()<10?'0'+init.getDate():init.getDate()}`,
                                            employee_dni: employees[i].dni,
                                            id_compound_turn: turns[k].id}
                                    arrayInsertsEmployees.push(newJDEmployee);    
                               }
                            }
                        }
                    }
                }
    
                init.setDate(init.getDate() + 1);
            }
    
            swal({
                title: "Atención",
                text: "Si existiese un cronograma ya generado entre los dias seleccionados, ¿Desea sobreescribir los datos con los nuevos parametros?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willUpdate) => {
                loadingMessage('Generando cronograma...');
                if (willUpdate) {
                  axios.delete(`${PORT()}/api/jdEmployee/Schedule?dateInit=${initDate.current.value}&dateFinish=${finishDate.current.value}`)
                  .then(() => {
                      arrayInsertsEmployees.forEach((newJDEmployee, i) => {
                        axios.post(`${PORT()}/api/jdEmployee`,newJDEmployee)
                        .then(() => {
                              if(i === (arrayInsertsEmployees.length - 1)){
                                  swal("Correcto","Cronograma generado exitosamente","success");
                              }
                        })
                    }) 
                  })
                }else {
                    arrayInsertsEmployees.forEach((newJDEmployee, i) => {
                        axios.get(`${PORT()}/api/jdEmployee/Date?date=${newJDEmployee.date}`)
                        .then((res) => {
                            if(res.data.length === 0){
                                axios.post(`${PORT()}/api/jdEmployee`,newJDEmployee)
                                .then(() => {
                                    if(i === (arrayInsertsEmployees.length - 1)){
                                        swal("Correcto","Cronograma generado exitosamente","success");
                                    }
                                })
                            }
                            else if(i === (arrayInsertsEmployees.length - 1)){
                                swal("Correcto","Cronograma generado exitosamente","success");
                            }
                        })
                    })
                }
              });
        })
        .catch((error) => console.log(error));
        }

    return(
        <div className="container">
            <h3 style={{textAlign: 'center'}}><b>Generación Automatica del Cronograma</b></h3>
            <br/>
            <h4><b>Parametros</b></h4>
            <div className="formRow">
                <div className="col-sm-4">
                    <label className="col-sm-6">Fecha desde: &nbsp;</label>
                    <input style={{width:'150px'}} type="date" ref={initDate}
                            onChange={onChangeDate}
                            defaultValue={`${today.getFullYear()}-${today.getMonth()<9?'0'+(today.getMonth()+1):(today.getMonth()+1)}-${today.getDate()<10?'0'+today.getDate():today.getDate()}`}></input>
                </div>
                <div className="col-sm-4 offset-sm-4">
                    <label className="col-sm-6">Fecha hasta: &nbsp;</label>
                    <input style={{width:'150px'}} type="date" ref={finishDate}
                            onChange={onChangeDate}
                            defaultValue={`${today.getFullYear()}-${today.getMonth()<9?'0'+(today.getMonth()+1):(today.getMonth()+1)}-${today.getDate()<10?'0'+today.getDate():today.getDate()}`}></input>
                </div>
            </div>
            <br/>
            <div className="formRow">
                <button className={`btn ${typeDay===0?'btn-secondary':'btn-primary'} col-sm-4`} onClick={() => {setTypeDay(0)}}>Dias Normales (Lun a Vier)</button>
                <button className={`btn ${typeDay===1?'btn-secondary':'btn-primary'} col-sm-4`} onClick={() => {setTypeDay(1)}}>Fin De Semana (Sab y Dom)</button>
                <button className={`btn ${typeDay===2?'btn-secondary':'btn-primary'} col-sm-4`} onClick={() => {setTypeDay(2)}}>Feriados</button>
            </div>
            <br/>
            <label className='col-sm-2'>Empleados: {params && employees ? calculateEmployees(employees, params[typeDay]) : '-'}</label>
            {charges?.map((charge) => {
                return(
                    <div style={{margin: '2%'}}>
                        <label className='col-sm-2'>{charge.name}</label>
                        <label className='offset-sm-6'>Empleados {charge.name}: { params? calculateTypeEmployees(employees, charge, turns, params[typeDay]) : 0}</label>
                        {params?turns.map((turn,i) => {
                            let turnName = turn.name.split(" ");
                            return(
                                turn.name.includes(charge.name.slice(0,3))?
                                <div key={turn.id} className="formRow">
                                    <div className='col-sm-2 offset-sm-2'>
                                        <label>{turnName[turnName.length-1]} &nbsp;</label>
                                    </div>
                                    <input id={`inputTurn${turn.id}`} className="col-sm-1" type="number" min="0" 
                                            style={{textAlign: 'center'}} value={params[typeDay][i]}
                                            onChange={(e) => {onChangeParams(e,i)}}
                                            onBlur={(e) => {onBlurParams(e,i)}}></input>
                                </div>:<></>
                            )
                        }):<></>}
                    </div>
            )})}
            <br/>
            <div className="formRow">
                <button className='sendNotOk col-sm-2 offset-sm-7' onClick={() => setShowAutomatedSchedule(false)}>Volver</button>
                <button className="sendOk col-sm-2 offset-sm-1" onClick={generateSchedule} >Generar grilla</button>
            </div>
        </div>
    )
}

export default AutomatedSchedule;