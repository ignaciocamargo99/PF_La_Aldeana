import React, { useEffect, useState } from 'react';
import Table from '../../../common/Table/Table';
import showMeDay from '../../../utils/ShowMeDay/showMeDay';
import showMeCharge from '../../../utils/ShowMeCharge/showMeCharge';
import { connect } from 'react-redux';
import { updateSchedule } from '../../../actions/ScheduleActions';
import BeShowed from '../../../common/BeShowed';

const TableScheduleEmployees = ({ nonworkingDaysMonth, employees, monthYear, firstHalfMonth, turns, setInfoTurns,
    setEmployee, setEmployeeStats, setDay, setDayStats, schedule, updateSchedule, permissionsAccess }) => {

    const [lowLimit, setLowLimit] = useState(0);
    const [upLimit, setUpLimit] = useState(15);

    const [chargeFilter, setChargeFilter] = useState([1, 2, 4]);

    useEffect(() => {
        if (firstHalfMonth) {
            setLowLimit(1);
            setUpLimit(15);
        } else {
            setLowLimit(16);
            setUpLimit(schedule[0].length);
        }
    }, [firstHalfMonth])

    const loadEmployeeStats = (i) => {
        let newEmployeeStats = [];
        newEmployeeStats.length = turns.length;
        newEmployeeStats.fill(0);
        schedule[i].forEach((iv) => {
            let index = turns.findIndex((turn) => turn.abbreviation === iv)
            if (index !== -1) newEmployeeStats[index] = newEmployeeStats[index] + 1;
        })
        setEmployee(employees[i]);
        setInfoTurns(false);
        setDay(null);
        setDayStats(null);
        setEmployeeStats(newEmployeeStats);
    }

    const loadDayStats = (i) => {
        let newDayStats = [];
        newDayStats.length = turns.length;
        newDayStats.fill(0);
        employees.forEach((employee, j) => {
            if (schedule[j][i] !== '') {
                let index = turns.findIndex((turn) => turn.abbreviation === schedule[j][i]);
                newDayStats[index] = newDayStats[index] + 1;
            }
        })
        setDay(i + 1);
        setDayStats(newDayStats);
        setEmployee(null);
        setEmployeeStats(null)
        setInfoTurns(false);
    }

    const onChangeInputValue = (e, i, j) => {
        let newInputValue = [];
        schedule.forEach((ivE) => {
            newInputValue.push(ivE.slice());
        })
        if (e.target.value.length !== 2 && e.target.value !== 'X') {
            newInputValue[i][j] = e.target.value.toUpperCase();
        }
        else {
            newInputValue[i][j] = '';
            turns.forEach((turn) => {
                if (turn.abbreviation === e.target.value.toUpperCase()) {
                    newInputValue[i][j] = e.target.value.toUpperCase();
                }
            })
        }
        updateSchedule(newInputValue);
    }

    const onBlurInputValue = (e, i, j) => {
        if (e.target.value.length === 1 && e.target.value !== 'X') {
            let newInputValue = [];
            schedule.forEach((ivE) => {
                newInputValue.push(ivE.slice());
            })
            newInputValue[i][j] = '';
            updateSchedule(newInputValue);
        }
    }

    return (
        <div style={{ maxHeight: '600px', overflow: 'auto' }}>
            <Table style={{ position: 'absolute', height: '5rem', width: '65rem' }}>
                <thead>
                    <tr>
                        <th scope="col" style={{ backgroundColor: 'gray', textAlign: 'center', verticalAlign: 'middle', width: '8rem' }}>
                            <select class="form-control" onChange={(e) => { setChargeFilter(e.target.value) }}>
                                <option value={[1, 2, 4]}>Todos</option>
                                <option value={1}>Cajeros</option>
                                <option value={2}>Mostrador</option>
                                <option value={4}>Producción</option>
                            </select>
                        </th>
                        {schedule[0].map((iv, i) => {
                            if (lowLimit <= i + 1 && i + 1 <= upLimit) {
                                return (
                                    <th key={i + 1} style={{
                                        padding: '0px', verticalAlign: 'middle', textAlign: 'center',
                                        backgroundColor: `${nonworkingDaysMonth.includes(i + 1) ? '#FAAD50' : new Date(monthYear.year, monthYear.month, i + 1).getDay() === 0 || new Date(monthYear.year, monthYear.month, i + 1).getDay() === 6 ? '#84F965' : 'gray'}`
                                    }}>
                                        <button className="btn" onClick={() => { loadDayStats(i) }}>
                                            <p>{nonworkingDaysMonth.includes(i + 1) ? 'F' : showMeDay(new Date(monthYear.year, monthYear.month, i + 1).getDay()).slice(0, 2)}</p>
                                            <p>{i < 9 ? `0${i + 1}` : i + 1}</p>
                                        </button>
                                    </th>
                                )
                            }
                        })}
                    </tr>
                </thead>
            </Table>
            <Table style={{ marginTop: '6rem' }}>
                <tbody style={{ margin: '0', padding: '2rem' }}>
                    {employees?.map((employee, i) => {
                        return (
                            chargeFilter.includes(employee.charges[0].chargeId) ?
                                <tr id={`rowEmployee${employee.dni}`} className={`${showMeCharge(employee.charges[0].chargeName)}`} key={i} >
                                    <td style={{ verticalAlign: 'middle', width: '8rem' }}>
                                        <button className="btn" style={{ width: '100%', borderStyle: 'none', borderColor: 'none', textAlign: 'left' }} onClick={() => { loadEmployeeStats(i) }}>{employee.nickname}</button>
                                    </td>
                                    {schedule[0].map((iv, j) => {
                                        if (lowLimit <= j + 1 && j + 1 <= upLimit) {
                                            return (
                                                <>
                                                    <BeShowed show={permissionsAccess === 3}>
                                                        <td key={j + 1 + i} style={{
                                                            verticalAlign: 'middle', textAlign: 'center',
                                                            backgroundColor: `${nonworkingDaysMonth.includes(j + 1) ? '#FAAD50' : new Date(monthYear.year, monthYear.month, j + 1).getDay() === 0 || new Date(monthYear.year, monthYear.month, j + 1).getDay() === 6 ? '#84F965' : ''}`
                                                        }}>
                                                            <input type="text" maxLength="2" style={{ textAlign: 'center', width: '100%' }}
                                                                className={schedule[i][j] === 'F' ? "bg-dark text-light" : ""}
                                                                disabled={schedule[i][j] === 'X'} value={schedule[i][j]}
                                                                onChange={(e) => onChangeInputValue(e, i, j)}
                                                                onBlur={(e) => onBlurInputValue(e, i, j)}></input>
                                                        </td>
                                                    </BeShowed>
                                                    <BeShowed show={permissionsAccess !== 3}>
                                                        <td key={j + 1 + i} style={{
                                                            verticalAlign: 'middle', textAlign: 'center',
                                                            backgroundColor: `${nonworkingDaysMonth.includes(j + 1) ? '#FAAD50' : new Date(monthYear.year, monthYear.month, j + 1).getDay() === 0 || new Date(monthYear.year, monthYear.month, j + 1).getDay() === 6 ? '#84F965' : ''}`
                                                        }}>
                                                            <input type="text" maxLength="2" style={{ textAlign: 'center', width: '100%' }}
                                                                className={schedule[i][j] === 'F' ? "bg-dark text-light" : ""}
                                                                disabled value={schedule[i][j]}
                                                                onChange={(e) => onChangeInputValue(e, i, j)}
                                                                onBlur={(e) => onBlurInputValue(e, i, j)}></input>
                                                        </td>
                                                    </BeShowed>
                                                </>
                                            )
                                        }
                                    })}
                                </tr>
                                : <></>
                        )
                    })}
                </tbody>
            </Table>
        </div >)
}

const mapStateToProps = state => {
    return {
        schedule: state.schedule,
        monthYear: state.monthYearSelectedSchedule,
        nonworkingDaysMonth: state.nonworkingDaysInMonthSchedule
    }
}

const mapDispatchToProps = {
    updateSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(TableScheduleEmployees);