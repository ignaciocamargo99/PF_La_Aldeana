import TableScheduleEmployees from './TableScheduleEmployees';
import { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import LoaderSpinner from '../../../common/LoaderSpinner';
import showMeMonth from '../../../utils/ShowMeMonth/showMeMonth';
import Stats from './Stats';
import axios from 'axios';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import swal from 'sweetalert';
import './Employees.css';

const PORT = require('../../../config');


const MonthView = ({month, setMonth, year, setYear, employees, licensesMonth, nonworkingDaysMonth ,jdEmployees, turns}) => {

    const[firstHalfMonth,setFirstHalfMonth] = useState(true);
    const[employee,setEmployee] = useState(null);
    const[employeeStats,setEmployeeStats] = useState(null);
    const[initialInputValues,setInitialInputValues] = useState([[]]);
    const[inputsValues,setInputsValues] = useState([[]]);
    const[day,setDay] = useState(null);
    const[dayStats,setDayStats] = useState(null);

    useEffect(() => {
        if(employees && licensesMonth && jdEmployees){
            setFirstHalfMonth(true);
            let initInputValues = initInputsValues();
            loadTurnsAndLicenses(initInputValues);
        }
    },[licensesMonth,jdEmployees,employees,month,year])

    const initInputsValues = () => {
        let newInputsValues = [];
        let days = getDays();
        for(let i=0 ; i < employees.length; i++){
            newInputsValues.push([]);
            for(let j=0 ; j < days ; j++){
                newInputsValues[i].push('')
            }
        }
        return newInputsValues;
    }

    const loadTurnsAndLicenses = (initInputValues) =>{
        let licensesDay;
        let jdEmployeesDay;
        let index;
        for(let i=0 ; i < initInputValues[0].length ; i++){
            licensesDay = licensesMonth.filter((licenses) => parseInt(licenses.date_init.slice(8,10)) <= i+1 &&
                                                             parseInt(licenses.date_finish.slice(8,10)) >= i+1);
            jdEmployeesDay = jdEmployees.filter((jDE) => parseInt(jDE.date.slice(8,10)) === i+1);
            licensesDay.forEach((license) => {
                index = employees.findIndex((employee) => employee.dni === license.dni);
                initInputValues[index][i] = "X";
            });
            jdEmployeesDay.forEach((jDE) => {
                index = employees.findIndex((employee) => employee.dni === jDE.employee_dni);
                initInputValues[index][i] = jDE.abbreviation;
            })
        }
        setInitialInputValues(initInputValues);
        setInputsValues(initInputValues);
    }

    const getDays = () => {
        let days;
        if(month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11){
            days = 31;
        } else if(month === 3 || month === 5 || month === 8 || month === 10) {
            days = 30;
        } else if(year % 4 === 0){
            days = 29;
        } else {
            days = 28
        }
        return days;
    }

    const onChangeMonthYear = (inputValue) =>{
        let newYear = parseInt(inputValue.slice(0,4));
        let newMonth = parseInt(inputValue.slice(5,inputValue.length)) - 1;
        setMonth(newMonth);
        setYear(newYear);
        setInputsValues([[]]);
    }

    const loadDJEmployees = () => {
        loadingMessage('Guardando datos...');
        let changes = false;
        for(let i = 0; i < inputsValues[0].length ; i++){
            let newJDEmployee = {date: `${year}-${month<9?'0'+(month+1):month+1}-${i+1}`,
                                 employee_dni: null,
                                 id_compound_turn: null};
            employees.forEach((employee,j) => {
                if(!(initialInputValues[j][i] === inputsValues[j][i])){
                    changes = true;
                    newJDEmployee.employee_dni = employee.dni;
                    let idTurn = turns.findIndex(turn => turn.abbreviation === inputsValues[j][i]);
                    newJDEmployee.id_compound_turn = idTurn + 1;
                    if(initialInputValues[j][i] !== ''){
                        axios.put(`${PORT()}/api/jdEmployee`,newJDEmployee)
                        .catch((error) => console.log(error));
                    }else{
                        axios.post(`${PORT()}/api/jdEmployee`,newJDEmployee)
                        .catch((error) => console.log(error));
                    }
                }
                if((i === inputsValues[0].length - 1) && j === (inputsValues.length - 1)){
                    if(changes){
                        swal("Correcto", "Se han grabado los datos correctamente", "success");
                    }else{
                        swal("Advertencia", "No has modificado ningun dato", "warning");
                    }
                }
            })
        }
    }

    return(
        <>
            <div className="formRow">
                <input className="col-sm-2" type='month' onChange={(e) => {onChangeMonthYear(e.target.value)}} defaultValue={`${year}-${month<9?'0'+(month+1):(month+1)}`}></input>
                <h1 className="col-sm-2 offset-sm-2">{showMeMonth(month)}</h1>
                <button className="btn offset-sm-2" onClick={() => {setFirstHalfMonth(true)}}> 1er Quincena</button>
                <button className="btn" onClick={() => {setFirstHalfMonth(false)}}> 2da Quincena</button>
            </div>
            <BeShowed show={employees}>
                <div className="formRow">
                    <div className="col-sm-10">
                        <TableScheduleEmployees inputsValues={inputsValues} nonworkingDaysMonth={nonworkingDaysMonth}
                                                licensesMonth={licensesMonth} setInputsValues={setInputsValues}
                                                employees={employees} year={year} month={month} firstHalfMonth={firstHalfMonth}
                                                turns={turns} setEmployee={setEmployee} setEmployeeStats={setEmployeeStats}
                                                setDay={setDay} setDayStats={setDayStats}/>
                    </div>
                    <Stats employee={employee} employeeStats={employeeStats} day={day} dayStats={dayStats} month={month} turns={turns} />
                </div>
                <div className='formRow col-sm-1 offset-sm-11'>
                    <button className='sendOk' style={{height: "20%"}} onClick={loadDJEmployees}>Grabar datos del mes</button> 
                </div>
            </BeShowed>
            <div className='col-sm-10'>
                <BeShowed show={!employees}>
                    <LoaderSpinner color="secondary" loading="Cargando grilla"/>
                </BeShowed>
            </div>
        </>
    )
}

export default MonthView;