import React, { useEffect, useState } from 'react';
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import showMeDay from '../../../utils/ShowMeDay/showMeDay';
import showMeCharge from '../../../utils/ShowMeCharge/showMeCharge';
import { connect } from 'react-redux';
import { updateSchedule } from '../../../actions/ScheduleActions';

const TableScheduleEmployees = ({nonworkingDaysMonth,employees, monthYear, firstHalfMonth, turns, setInfoTurns,
                                setEmployee,setEmployeeStats,setDay,setDayStats,schedule, updateSchedule}) => {
    
    const [lowLimit,setLowLimit] = useState(0);
    const [upLimit,setUpLimit] = useState(15);


    useEffect(() => {
        if(firstHalfMonth){
            setLowLimit(1);
            setUpLimit(15);
        }else{
            setLowLimit(16);
            setUpLimit(schedule[0].length);
        }
    },[firstHalfMonth])

    const loadEmployeeStats = (i) => {
        let newEmployeeStats = [];
        newEmployeeStats.length = turns.length;
        newEmployeeStats.fill(0);
        schedule[i].forEach((iv) => {
            let index = turns.findIndex((turn) => turn.abbreviation === iv)
            if(index !== -1) newEmployeeStats[index] = newEmployeeStats[index] + 1;
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
        employees.forEach((employee,j) => {
            if(schedule[j][i] !== ''){
                let index = turns.findIndex((turn) => turn.abbreviation === schedule[j][i]);
                newDayStats[index] = newDayStats[index] + 1;
            }
        })
        setDay(i+1);
        setDayStats(newDayStats);
        setEmployee(null);
        setEmployeeStats(null)
        setInfoTurns(false);
    }

    const onChangeInputValue = (e,i,j) => {
        let newInputValue = [];
        schedule.forEach((ivE) => {
            newInputValue.push(ivE.slice());
        })
        if(e.target.value.length !== 2 && e.target.value !== 'X'){
            newInputValue[i][j] = e.target.value.toUpperCase();
        }
        else{
            newInputValue[i][j] = '';
            turns.forEach((turn) => {
                if(turn.abbreviation === e.target.value.toUpperCase()){
                    newInputValue[i][j] = e.target.value.toUpperCase();
                }
            })
        }
        updateSchedule(newInputValue);
    }
    
    const onBlurInputValue = (e,i,j) => {
        if(e.target.value.length === 1 && e.target.value !== 'X'){
            let newInputValue = [];
            schedule.forEach((ivE) => {
                newInputValue.push(ivE.slice());
            })
            newInputValue[i][j] = '';
            updateSchedule(newInputValue);
        }
    }

    return(
        <Table style={{display: 'block', overflow: 'auto', height: '600px', width: '100%'}} >
            <HeaderTable
                th={
                    <>
                        <th scope="col" style={{ backgroundColor: 'gray', textAlign: 'center', verticalAlign: 'middle'}}>EMP.</th>
                        {schedule[0].map((iv,i) => {
                            if(lowLimit <=i+1 && i+1 <= upLimit){
                                return(
                                    <th key={i+1} style={{padding: '0px', verticalAlign: 'middle', textAlign: 'center', 
                                                    backgroundColor: `${nonworkingDaysMonth.includes(i+1) ? '#FF8B8B': new Date(monthYear.year,monthYear.month,i+1).getDay() === 0 || new Date(monthYear.year,monthYear.month,i+1).getDay() ===  6?'#8DFF8B':'gray'}`}}>
                                        <button className="btn" onClick={() => {loadDayStats(i)}}>
                                            <p>{nonworkingDaysMonth.includes(i+1)?'F':showMeDay(new Date(monthYear.year,monthYear.month,i+1).getDay()).slice(0,2)}</p>
                                            <p>{i<9?`0${i+1}`:i+1}</p>
                                        </button>
                                    </th>
                                    )
                            }
                        })}
                    </>
                }
            />
            <BodyTable
                tbody={employees?.map((employee, i) => {
                    return (
                        <tbody key={i}>
                            <tr id={`rowEmployee${employee.dni}`} className={`${showMeCharge(employee.charges[0].chargeName)}`}>
                                <td style={{ verticalAlign: 'middle'}}>
                                    <button className="btn" style={{width: '100%', borderStyle: 'none', borderColor:'none', textAlign: 'left'}} onClick={() => {loadEmployeeStats(i)}}>{employee.name}</button>
                                </td>
                                {schedule[0].map((iv,j) => {
                                    if(lowLimit <= j+1 && j+1 <= upLimit){
                                        return(
                                            <td key={j+1+i} style={{verticalAlign: 'middle', textAlign: 'center',
                                                backgroundColor: `${nonworkingDaysMonth.includes(j+1) ? '#FF8B8B' : new Date(monthYear.year,monthYear.month,j+1).getDay() === 0 || new Date(monthYear.year,monthYear.month,j+1).getDay() === 6 ?'#8DFF8B':''}`}}>
                                                <input type="text" maxLength="2" style={{textAlign:'center',width:'100%'}} 
                                                        disabled={schedule[i][j] === 'X'} value={schedule[i][j]}
                                                        onChange={(e) => onChangeInputValue(e,i,j)}
                                                        onBlur={(e) => onBlurInputValue(e,i,j)}></input>
                                            </td>
                                        )
                                    }                        
                                })}
                            </tr>
                        </tbody>
                    )
                })}
            />
        </Table>)
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