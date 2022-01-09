import React, { useEffect, useState, useRef } from 'react';
import generateAutomatedDay from '../AutomatedFunction/GenerateAutomatedDay';

const AutomatedSchedule = ({today,employees}) => {

    const [typeDay,setTypeDay] = useState('Normal');
    const [normal,setNormal] = useState([[],[],[]]);
    const [weekend,setWeekend] = useState([[],[],[]]);
    const [nonworking,setNonworking] = useState([[],[],[]]);
    const inputDateInit = useRef();
    const inputDateFinish = useRef();

    //Despues ver esto
    const [turns,setTurns] = useState([
        {"id":1, "letra": 'M', "valor": 1},
        {"id":2, "letra": 'T', "valor": 2},
        {"id":3, "letra": 'N', "valor": 3},
        {"id":4, "letra": 'UN', "valor": 4}
    ]);

    useEffect(() => {
        let aux = normal.slice();
        aux.forEach((p) => {
            p.length = 4;
            p.fill('');
        })
        setNormal(aux);
        setWeekend(aux);
        setNonworking(aux);
    },[])

    const changeParams = (value,indexCharge,indexTurn) =>{
        let aux = [];
        switch (typeDay) {
            case 'Normal':
                for(let i=0 ; i < normal.length; i++){
                    aux.push(normal[i].slice())
                }
                aux[indexCharge][indexTurn] = parseInt(value);
                setNormal(aux);
                break;
            case 'Fin De Semana':
                for(let i=0 ; i < weekend.length; i++){
                    aux.push(weekend[i].slice())
                }
                aux[indexCharge][indexTurn] = value;
                setWeekend(aux);
                break;
            case 'Feriado':
                for(let i=0 ; i < nonworking.length; i++){
                    aux.push(nonworking[i].slice())
                }
                aux[indexCharge][indexTurn] = value;
                setNonworking(aux);
            default:
                break;
        }
    }

    //Ver si hay alguna funcion que haga esto...
    const formatDateToInput = (date) => {
        return `${date?.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
    //

    const buildVariablesAndConstraints = (typeDay) => {
        let variables = {};
        let constraints = {};
        employees.forEach((employee) => {
            turns.forEach((turn) => {
                let atrib = employee.name_charge.slice(0,3) + employee.dni + turn.letra;
                let charge_Dni = employee.name_charge.slice(0,3) + employee.dni;
                let charge_Turn = employee.name_charge.slice(0,3) + turn.letra;
                let objectVariables = {
                    "value": turn.valor
                };
                objectVariables[`${charge_Dni}`] = 1;
                objectVariables[`${charge_Turn}`] = 1;
                variables[`${atrib}`] = objectVariables;
            })
            let atribConstraints = employee.name_charge.slice(0,3) + employee.dni;
            constraints[`${atribConstraints}`] = {"max": 1}
        })
        constraints.DelM = {"min":typeDay==="Normal"?parseInt(normal[0][0]):typeDay==="Fin De Semana"?parseInt(weekend[0][0]):parseInt(nonworking[0][0])};
        constraints.DelT = {"min":typeDay==="Normal"?parseInt(normal[0][1]):typeDay==="Fin De Semana"?parseInt(weekend[0][1]):parseInt(nonworking[0][1])};
        constraints.DelN = {"min":typeDay==="Normal"?parseInt(normal[0][2]):typeDay==="Fin De Semana"?parseInt(weekend[0][2]):parseInt(nonworking[0][2])};
        constraints.DelUN = {"min":typeDay==="Normal"?parseInt(normal[0][3]):typeDay==="Fin De Semana"?parseInt(weekend[0][3]):parseInt(nonworking[0][3])};
        constraints.CajM = {"min":typeDay==="Normal"?parseInt(normal[1][0]):typeDay==="Fin De Semana"?parseInt(weekend[1][0]):parseInt(nonworking[1][0])};
        constraints.CajT = {"min":typeDay==="Normal"?parseInt(normal[1][1]):typeDay==="Fin De Semana"?parseInt(weekend[1][1]):parseInt(nonworking[1][1])};
        constraints.CajN = {"min":typeDay==="Normal"?parseInt(normal[1][2]):typeDay==="Fin De Semana"?parseInt(weekend[1][2]):parseInt(nonworking[1][2])};
        constraints.CajUN = {"min":typeDay==="Normal"?parseInt(normal[1][3]):typeDay==="Fin De Semana"?parseInt(weekend[1][3]):parseInt(nonworking[1][3])};
        constraints.AteM = {"min":typeDay==="Normal"?parseInt(normal[2][0]):typeDay==="Fin De Semana"?parseInt(weekend[2][0]):parseInt(nonworking[2][0])};
        constraints.AteT = {"min":typeDay==="Normal"?parseInt(normal[2][1]):typeDay==="Fin De Semana"?parseInt(weekend[2][1]):parseInt(nonworking[2][1])};
        constraints.AteN = {"min":typeDay==="Normal"?parseInt(normal[2][2]):typeDay==="Fin De Semana"?parseInt(weekend[2][2]):parseInt(nonworking[2][2])};
        constraints.AteUN = {"min":typeDay==="Normal"?parseInt(normal[2][3]):typeDay==="Fin De Semana"?parseInt(weekend[2][3]):parseInt(nonworking[2][3])};
        return [constraints,variables]
    }

    const generateSchedule = () =>{
        //Ver de mejorar
        let x = new Date(inputDateInit.current.value);
        x.setDate(x.getDate() + 1);
        let y = new Date(inputDateFinish.current.value);
        y.setDate(y.getDate() + 1);
        let result;
        let constraints, variables;
        for(x ; x.getTime() <= y.getTime(); x.setDate(x.getDate() + 1)){
            let typeDay = x.getDay()===0?"Feriado":(x.getDay()>0&&x.getDay()<4)?"Normal":"Fin De Semana";
            [constraints,variables] = buildVariablesAndConstraints(typeDay);
            result = generateAutomatedDay(constraints,variables);
            console.log(result)
        }
    }

    return(
        <div class="container">
            <h3 style={{textAlign: 'center'}}><b>Generación Automatica del Cronograma</b></h3>
            <br/>
            <h4><b>Parametros</b></h4>
            <div class="formRow">
                <div class="col-sm-4">
                    <label class="col-sm-6">Fecha desde: &nbsp;</label>
                    <input class="col-sm-6" type="date" min={formatDateToInput(today)}
                            defaultValue={formatDateToInput(today)}
                            ref={inputDateInit}></input>
                </div>
                <div class="col-sm-4 offset-sm-4">
                    <label className="col-sm-6">Fecha hasta: &nbsp;</label>
                    <input className="col-sm-6" type="date" min={formatDateToInput(today)}
                            defaultValue={formatDateToInput(today)}
                            ref={inputDateFinish}></input>
                </div>
            </div>
            <br/>
            <div className="formRow">
                <button className={`btn ${typeDay==='Normal'?'btn-secondary':'btn-primary'} col-sm-4`} onClick={() => {setTypeDay('Normal')}}>Dias Normales</button>
                <button className={`btn ${typeDay==='Fin De Semana'?'btn-secondary':'btn-primary'} col-sm-4`} onClick={() => {setTypeDay('Fin De Semana')}}>Fin De Semana</button>
                <button className={`btn ${typeDay==='Feriado'?'btn-secondary':'btn-primary'} col-sm-4`} onClick={() => {setTypeDay('Feriado')}}>Dias Feriados y Domingos</button>
            </div>
            <br/>
            <div className="formRow">
                <label>Cantidad de Deliverys requeridos en la Mañana &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,0,0)}} value={typeDay==='Normal'?normal[0][0]:typeDay==="Fin De Semana"?weekend[0][0]:nonworking[0][0]}></input>
                <label>&nbsp;, en la Tarde &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,0,1)}} value={typeDay==='Normal'?normal[0][1]:typeDay==="Fin De Semana"?weekend[0][1]:nonworking[0][1]}></input>
                <label>&nbsp;, en la Noche &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,0,2)}} value={typeDay==='Normal'?normal[0][2]:typeDay==="Fin De Semana"?weekend[0][2]:nonworking[0][2]}></input>
                <label>&nbsp;y en la U.Noche &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,0,3)}} value={typeDay==='Normal'?normal[0][3]:typeDay==="Fin De Semana"?weekend[0][3]:nonworking[0][3]}></input>
            </div>
            <div className="formRow">
                <label>Cantidad de Cajeras/os requeridos en la Mañana &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,1,0)}} value={typeDay==='Normal'?normal[1][0]:typeDay==="Fin De Semana"?weekend[1][0]:nonworking[1][0]}></input>
                <label>&nbsp;, en la Tarde &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,1,1)}} value={typeDay==='Normal'?normal[1][1]:typeDay==="Fin De Semana"?weekend[1][1]:nonworking[1][1]}></input>
                <label>&nbsp;, en la Noche &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,1,2)}} value={typeDay==='Normal'?normal[1][2]:typeDay==="Fin De Semana"?weekend[1][2]:nonworking[1][2]}></input>
                <label>&nbsp;y en la U.Noche &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,1,3)}} value={typeDay==='Normal'?normal[1][3]:typeDay==="Fin De Semana"?weekend[1][3]:nonworking[1][3]}></input>
            </div>
            <div className="formRow">
                <label>Cantidad de At.al público requeridos en la Mañana &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,2,0)}} value={typeDay==='Normal'?normal[2][0]:typeDay==="Fin De Semana"?weekend[2][0]:nonworking[2][0]}></input>
                <label>&nbsp;, en la Tarde &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,2,1)}} value={typeDay==='Normal'?normal[2][1]:typeDay==="Fin De Semana"?weekend[2][1]:nonworking[2][1]}></input>
                <label>&nbsp;, en la Noche &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,2,2)}} value={typeDay==='Normal'?normal[2][2]:typeDay==="Fin De Semana"?weekend[2][2]:nonworking[2][2]}></input>
                <label>&nbsp;y en la U.Noche &nbsp;</label>
                <input className="col-sm-1" type="number" min="0" style={{textAlign: 'center'}} onChange={(e) => {changeParams(e.target.value,2,3)}} value={typeDay==='Normal'?normal[2][3]:typeDay==="Fin De Semana"?weekend[2][3]:nonworking[2][3]}></input>
            </div>
            <br/>
            <div className="formRow">
                <button className="btn btn-success col-sm-2 offset-sm-10" onClick={generateSchedule}>Generar grilla</button>
            </div>
        </div>
    )
}

export default AutomatedSchedule;