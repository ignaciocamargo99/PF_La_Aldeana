import TableScheduleEmployees from './TableScheduleEmployees';
import { useEffect, useState } from 'react';
import LoaderSpinner from '../../../common/LoaderSpinner';
import showMeMonth from '../../../utils/ShowMeMonth/showMeMonth';
import Stats from './Stats';
import axios from 'axios';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import calculateDays from '../../../utils/CalculateDays/calculateDays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
    updateMonthYearSelectedSchedule, updateNonworkingDaysInMonthSchedule,
    updateSchedule
} from '../../../actions/ScheduleActions';
import swal from 'sweetalert';
import './Employees.css';
import BeShowed from '../../../common/BeShowed';

const XLSX = require('xlsx');
const PORT = require('../../../config');


const MonthView = ({ employees, turns, today, monthYear, schedule, updateSchedule, setShowMonthView,
    updateNonworkingDaysInMonthSchedule, nonworkingDaysMonth, updateMonthYearSelectedSchedule, permissionsAccess }) => {

    const [firstHalfMonth, setFirstHalfMonth] = useState(true);
    const [initialSchedule, setInitialSchedule] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [employeeStats, setEmployeeStats] = useState(null);
    const [day, setDay] = useState(null);
    const [dayStats, setDayStats] = useState(null);
    const [infoTurns, setInfoTurns] = useState(false);

    useEffect(() => {
        if (employees) {
            buildSchedule(monthYear.month, monthYear.year);
        }
    }, [employees])

    const buildSchedule = (month, year) => {
        let days = calculateDays(monthYear.month, monthYear.year);
        let newSchedule = [];
        let jde, lic;
        let initDate = new Date(year, month, 1);
        let finishDate = new Date(year, month + 1, 0);
        let monthInFormat = month + 1 < 10 ? '0' + (month + 1) : month + 1;
        let dayInitInFormat = initDate.getDate() < 10 ? '0' + initDate.getDate() : initDate.getDate();
        let dayFinishInFormat = finishDate.getDate() < 10 ? '0' + finishDate.getDate() : finishDate.getDate();
        axios.get(`${PORT()}/api/jdEmployee?yearMonth=${year}-${monthInFormat}`)
            .then((jdeResponse) => {
                jde = jdeResponse.data;
                axios.get(`https://nolaborables.com.ar/api/v2/feriados/${monthYear.year}`)
                    .then((nwdResponse) => {
                        let nwdMonth = [];
                        nwdResponse.data.forEach((nWD, i) => { if (nWD.mes === (month + 1)) nwdMonth.push(nWD.dia) })
                        updateNonworkingDaysInMonthSchedule(nwdMonth);
                        axios.get(`${PORT()}/api/daysOff?minDate=${year}${monthInFormat}${dayInitInFormat}&maxDate=${year}${monthInFormat}${dayFinishInFormat}`)
                            .then((daysOffResponse) => {
                                let daysOff = daysOffResponse.data.Data;
                                axios.get(`${PORT()}/api/licenses`)
                                    .then((licResponse) => {
                                        lic = licResponse.data.filter(license => (parseInt(license.date_init.slice(0, 4)) === year && parseInt(license.date_init.slice(5, 7)) === month + 1) || (parseInt(license.date_finish.slice(0, 4)) === year && parseInt(license.date_finish.slice(5, 7)) === month + 1));

                                        for (let i = 0; i < employees.length; i++) {
                                            newSchedule.push([]);
                                            for (let j = 0; j < days; j++) {
                                                newSchedule[i].push('')
                                            }
                                        }
                                        for (let i = 0; i < days; i++) {
                                            employees.forEach((emp, j) => {
                                                let findDayOff, findLicense, findjobDay;

                                                findLicense = lic.find((license) => license.dni === emp.dni
                                                    && parseInt(license.date_init.slice(8, 10)) <= i + 1
                                                    && parseInt(license.date_finish.slice(8, 10)) >= i + 1);
                                                if (findLicense) {
                                                    newSchedule[j][i] = 'X';
                                                }
                                                else {
                                                    findDayOff = daysOff.find((dayOff) => dayOff.dni_employee === emp.dni
                                                        && parseInt(dayOff.date.slice(8, 10)) === i + 1);
                                                    if (findDayOff) {
                                                        newSchedule[j][i] = 'F';
                                                    }
                                                    else {
                                                        findjobDay = jde.find((jd) => jd.employee_dni === emp.dni
                                                            && jd.date.slice(0, 10) === `${year}-${month < 9 ? '0' + (month + 1) : (month + 1)}-${i < 9 ? '0' + (i + 1) : (i + 1)}`);
                                                        if (findjobDay) {
                                                            newSchedule[j][i] = findjobDay.abbreviation;
                                                        }
                                                    }

                                                }
                                            });
                                        };
                                        setInitialSchedule(newSchedule);
                                        updateSchedule(newSchedule);
                                    })
                            })
                    })
            })
    }

    const onChangeMonthYear = (inputValue) => {
        updateSchedule(null);
        updateNonworkingDaysInMonthSchedule(null);
        let newYear = parseInt(inputValue.slice(0, 4));
        let newMonth = parseInt(inputValue.slice(5, inputValue.length)) - 1;
        updateMonthYearSelectedSchedule(newMonth, newYear);
        buildSchedule(newMonth, newYear);
        setDay(null);
        setEmployee(null);
        setDayStats(null);
        setEmployeeStats(null);
        setInfoTurns(false);
    }

    const loadJDEmployees = () => {
        loadingMessage('Guardando datos...');
        let changes = false;
        for (let i = 0; i < schedule[0].length; i++) {
            let newJDEmployee = {
                date: `${monthYear.year}-${monthYear.month < 9 ? '0' + (monthYear.month + 1) : monthYear.month + 1}-${i < 9 ? '0' + (i + 1) : (i + 1)}`,
                employee_dni: null,
                id_compound_turn: null
            };
            employees.forEach((employee, j) => {
                if (!(initialSchedule[j][i] === schedule[j][i])) {
                    changes = true;
                    newJDEmployee.employee_dni = employee.dni;
                    let idTurn = turns.findIndex(turn => turn.abbreviation === schedule[j][i]);
                    newJDEmployee.id_compound_turn = idTurn + 1;
                    if (initialSchedule[j][i] !== '') {
                        if (schedule[j][i] === '') {
                            axios.delete(`${PORT()}/api/jdEmployee?date=${newJDEmployee.date}&employee_dni=${employee.dni}`)
                                .catch((error) => console.log(error));
                        } else {
                            axios.put(`${PORT()}/api/jdEmployee`, newJDEmployee)
                                .catch((error) => console.log(error));
                        }
                    } else {
                        axios.post(`${PORT()}/api/jdEmployee`, newJDEmployee)
                            .catch((error) => console.log(error));
                    }
                }
                if ((i === schedule[0].length - 1) && j === (schedule.length - 1)) {
                    if (changes) {
                        swal("Correcto", "Se han grabado los datos correctamente", "success");
                    } else {
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

    const exportSchedule = () => {
        let scheduleArray = buildScheduleArray();
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(scheduleArray);
        XLSX.utils.book_append_sheet(wb,ws,`Cronograma ${showMeMonth(monthYear.month)}`);
        XLSX.writeFile(wb, `Cronograma ${showMeMonth(monthYear.month)}.xlsx`);
    }

    const buildScheduleArray = () => {
        let scheduleArray = [];
        schedule.forEach((array) => {
            scheduleArray.push([...array])
        })
        let header = [[showMeMonth(monthYear.month).toUpperCase()]];
        schedule.forEach((e, i) => {
            let arrayEmployee = [employees[i].nickname];
            schedule[i].forEach((d,j) => {
                if(i === 0){
                    header[0].push(j+1);
                }
                let text = '';
                let turn = turns.find((t) => schedule[i][j] === t.abbreviation);
                turn?.turns.forEach((t,i) => {
                    text = text + `${t.init_time} a ${t.finish_time} . `;
                })
                if(schedule[i][j] === 'F') text = 'FRANCO';
                if(schedule[i][j] === 'X') text = 'LICENCIA';
                scheduleArray[i][j] = text;
            })
            scheduleArray[i] = arrayEmployee.concat([...scheduleArray[i]]);
        })
        scheduleArray = header.concat(scheduleArray);
        console.log(schedule)
        console.log(scheduleArray)
        return scheduleArray
    }

    return (
        <>
            <div className="formRow">
                <input className="col-sm-2" type='month'
                    onChange={(e) => { onChangeMonthYear(e.target.value) }}
                    defaultValue={`${monthYear.year}-${monthYear.month < 9 ? '0' + (monthYear.month + 1) : (monthYear.month + 1)}`}
                />
                <h1 className="col-sm-2 offset-sm-2">{showMeMonth(monthYear.month)}</h1>
                {schedule && nonworkingDaysMonth ?
                <button className='btn btn-success' onClick={() => {exportSchedule()}}>Exportar a Excel <FontAwesomeIcon icon={faFileExcel}></FontAwesomeIcon></button>
                :null}
                <button className='btn' onClick={loadInfoTurns}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></button>
                <button className={firstHalfMonth ? "btn btn-secondary" : "btn"} onClick={() => { setFirstHalfMonth(true) }}> 1er Quincena</button>
                <button className={(!firstHalfMonth) ? "btn btn-secondary" : "btn"} onClick={() => { setFirstHalfMonth(false) }}> 2da Quincena</button>
            </div>
            {schedule && nonworkingDaysMonth ? <>
                <div className="formRow">
                    <div className="col-sm-10">
                        <TableScheduleEmployees employees={employees} firstHalfMonth={firstHalfMonth}
                            turns={turns} setEmployee={setEmployee} setEmployeeStats={setEmployeeStats}
                            setDay={setDay} setDayStats={setDayStats} setInfoTurns={setInfoTurns}
                            permissionsAccess={permissionsAccess} />
                    </div>
                    <Stats employee={employee} employeeStats={employeeStats} day={day} dayStats={dayStats}
                        month={monthYear.month} turns={turns} infoTurns={infoTurns} />
                </div>
                <div className='buttons'>
                    <BeShowed show={permissionsAccess === 3}>
                        <button className='btn btn-light sendOk' onClick={loadJDEmployees}>Grabar datos</button>
                    </BeShowed>
                    <button className='btn btn-light cancel' onClick={() => { setShowMonthView(false) }}>Volver</button>
                </div>
            </>
                : <div className='col-sm-10'>
                    <LoaderSpinner color="primary" loading="Cargando grilla" />
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