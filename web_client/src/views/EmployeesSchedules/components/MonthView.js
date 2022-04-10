import TableScheduleEmployees from './TableScheduleEmployees';
import { useEffect, useState } from 'react';
import LoaderSpinner from '../../../common/LoaderSpinner';
import showMeMonth from '../../../utils/ShowMeMonth/showMeMonth';
import Stats from './Stats';
import axios from 'axios';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import calculateDays from '../../../utils/CalculateDays/calculateDays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateMonthYearSelectedSchedule, updateNonworkingDaysInMonthSchedule, 
    updateSchedule} from '../../../actions/ScheduleActions';
import swal from 'sweetalert';
import './Employees.css';

const PORT = require('../../../config');


const MonthView = ({ employees, turns, today, monthYear, schedule, updateSchedule, setShowMonthView,
                    updateNonworkingDaysInMonthSchedule, nonworkingDaysMonth, updateMonthYearSelectedSchedule}) => {

    const[firstHalfMonth,setFirstHalfMonth] = useState(true);
    const[initialSchedule,setInitialSchedule] = useState(null);
    const[employee,setEmployee] = useState(null);
    const[employeeStats,setEmployeeStats] = useState(null);
    const[day,setDay] = useState(null);
    const[dayStats,setDayStats] = useState(null);
    const[infoTurns,setInfoTurns] = useState(false);

    useEffect(() => {
        if(employees){
            buildSchedule(monthYear.month,monthYear.year);
        }
    },[employees])

    const buildSchedule = (month, year) => {
        let days = calculateDays(monthYear.month, monthYear.year);
        let newSchedule = [];
        let jde, lic;
        axios.get(`${PORT()}/api/jdEmployee?yearMonth=${year}-${month+1<10?'0'+(month+1):month+1}`)
        .then((jdeResponse) => {
            jde = jdeResponse.data;
            axios.get(`https://nolaborables.com.ar/api/v2/feriados/${monthYear.year}`)
            .then((nwdResponse) => {
                let nwdMonth = [];
                nwdResponse.data.forEach((nWD,i) => {if(nWD.mes === (month+1)) nwdMonth.push(nWD.dia)})
                updateNonworkingDaysInMonthSchedule(nwdMonth);
                axios.get(`${PORT()}/api/licenses`)
                .then((licResponse) => {
                    lic = licResponse.data.filter(license => (parseInt(license.date_init.slice(0,4)) === year && parseInt(license.date_init.slice(5,7)) === month+1) || (parseInt(license.date_finish.slice(0,4)) === year && parseInt(license.date_finish.slice(5,7)) === month+1));
                    
                    for(let i=0 ; i < employees.length; i++){
                        newSchedule.push([]);
                        for(let j=0 ; j < days ; j++){
                            newSchedule[i].push('')
                        }
                    }
                    for(let i=0 ; i < days ; i++){
                        employees.forEach((emp,j) => {
                            let findLicense, findjobDay;
                            findLicense = lic.find((license) => license.dni === emp.dni
                                                                    && parseInt(license.date_init.slice(8,10)) <= i+1 
                                                                    && parseInt(license.date_finish.slice(8,10)) >= i+1);
                            if(findLicense){
                                newSchedule[j][i] = 'X';
                            }
                            else{
                                findjobDay = jde.find((jd) => jd.employee_dni === emp.dni
                                                                && jd.date.slice(0,10) === `${year}-${month<9?'0'+(month+1):(month+1)}-${i<9?'0'+(i+1):(i+1)}`);
                                if(findjobDay){
                                    newSchedule[j][i] = findjobDay.abbreviation;
                                }
                            }
                        });
                    };
                    setInitialSchedule(newSchedule);
                    updateSchedule(newSchedule);
                })
            })
        })
    }

    const onChangeMonthYear = (inputValue) =>{
        updateSchedule(null);
        updateNonworkingDaysInMonthSchedule(null);
        let newYear = parseInt(inputValue.slice(0,4));
        let newMonth = parseInt(inputValue.slice(5,inputValue.length)) - 1;
        updateMonthYearSelectedSchedule(newMonth,newYear);
        buildSchedule(newMonth,newYear);
        setDay(null);
        setEmployee(null);
        setDayStats(null);
        setEmployeeStats(null);
        setInfoTurns(false);
    }

    const loadJDEmployees = () => {
        loadingMessage('Guardando datos...');
        let changes = false;
        for(let i = 0; i < schedule[0].length ; i++){
            let newJDEmployee = {date: `${monthYear.year}-${monthYear.month<9?'0'+(monthYear.month+1):monthYear.month+1}-${i<9?'0'+(i+1):(i+1)}`,
                                 employee_dni: null,
                                 id_compound_turn: null};
            employees.forEach((employee,j) => {
                if(!(initialSchedule[j][i] === schedule[j][i])){
                    changes = true;
                    newJDEmployee.employee_dni = employee.dni;
                    let idTurn = turns.findIndex(turn => turn.abbreviation === schedule[j][i]);
                    newJDEmployee.id_compound_turn = idTurn + 1;
                    if(initialSchedule[j][i] !== ''){
                        if(schedule[j][i] === ''){
                            axios.delete(`${PORT()}/api/jdEmployee?date=${newJDEmployee.date}&employee_dni=${employee.dni}`)
                            .catch((error) => console.log(error));
                        }else{
                            axios.put(`${PORT()}/api/jdEmployee`,newJDEmployee)
                            .catch((error) => console.log(error));
                        }
                    }else{
                        axios.post(`${PORT()}/api/jdEmployee`,newJDEmployee)
                        .catch((error) => console.log(error));
                    }
                }
                if((i === schedule[0].length - 1) && j === (schedule.length - 1)){
                    if(changes){
                        swal("Correcto", "Se han grabado los datos correctamente", "success");
                    }else{
                        swal("Advertencia", "No has modificado ningun dato", "warning");
                    }
                }
            })
        }
    }

    const loadInfoTurns = () => {
        setInfoTurns(true);
        setEmployee(null);
        setDay(null);
    }

    return(
        <>
            <div className="formRow">
                <input className="col-sm-2" type='month' 
                        onChange={(e) => {onChangeMonthYear(e.target.value)}}
                        defaultValue={`${monthYear.year}-${monthYear.month<9?'0'+(monthYear.month+1):(monthYear.month+1)}`} 
                />
                <h1 className="col-sm-2 offset-sm-2">{showMeMonth(monthYear.month)}</h1>
                <button className='btn offset-sm-2' onClick={loadInfoTurns}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></button>
                <button className="btn" onClick={() => {setFirstHalfMonth(true)}}> 1er Quincena</button>
                <button className="btn" onClick={() => {setFirstHalfMonth(false)}}> 2da Quincena</button>
            </div>
            {schedule && nonworkingDaysMonth? <>
                <div className="formRow">
                    <div className="col-sm-10">
                        <TableScheduleEmployees employees={employees} firstHalfMonth={firstHalfMonth} 
                                                turns={turns} setEmployee={setEmployee} setEmployeeStats={setEmployeeStats} 
                                                setDay={setDay} setDayStats={setDayStats} setInfoTurns={setInfoTurns}/>
                    </div>
                    <Stats employee={employee} employeeStats={employeeStats} day={day} dayStats={dayStats}
                            month={monthYear.month} turns={turns} infoTurns={infoTurns}/>
                </div>
                <div className='formRow'>
                    <button className='sendNotOk col-sm-1 offset-sm-9' onClick={() => {setShowMonthView(false)}}>Volver</button>
                    <button className='sendOk col-sm-1 offset-sm-1' style={{height: "20%"}} onClick={loadJDEmployees}>Grabar datos del mes</button> 
                </div>
            </>
            :<div className='col-sm-10'>
                    <LoaderSpinner color="primary" loading="Cargando grilla"/>
            </div>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        monthYear: state.monthYearSelectedSchedule,
        nonworkingDaysMonth: state.nonworkingDaysInMonthSchedule,
        schedule: state.schedule
    }
}

const mapDispatchToProps = {
    updateMonthYearSelectedSchedule,
    updateNonworkingDaysInMonthSchedule,
    updateSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);