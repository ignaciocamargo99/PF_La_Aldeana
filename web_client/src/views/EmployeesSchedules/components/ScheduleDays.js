import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import Table from '../../../common/Table/Table';
import { dateToNameDay } from '../../../utils/DateToNameDay/dateToNameDay';
import EmployeesSelection from './EmployeesSelection';
import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import ContainerEmployees from './ContainersEmployees';
import axios from 'axios';
import { connect } from 'react-redux';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addEmplInTurnSchedule } from '../../../actions/ScheduleActions';
import DateSchedule from './DateSchedule';

const PORT = require('../../../config');

const ScheduleDays = ({ schedule, addEmplInTurnSchedule }) => {

    const [employees, setEmployees] = useState([])
    const [daySchedule,setDaySchedule] = useState(0);

    useEffect(() => {
        axios.get(`${PORT()}/api/employees`)
        .then((response) => {
            setEmployees(response.data)
        })
    },[])

    return(
    <div className="container">
        <DragDropContext onDragEnd={(result) => {
            const {source, destination} = result;
            if(!destination || destination.droppableId === source.droppableId){
                return;
            }
            else{
                let turnDestiny = destination.droppableId.substring(0,destination.droppableId.length -1)
                let dayScheduleDestiny = parseInt(destination.droppableId.substring(destination.droppableId.length - 1, destination.droppableId.length))
    
                if(turnDestiny === 'Morning'){
                    if(source.droppableId === 'employeeList'){
                        let aux = schedule[daySchedule + dayScheduleDestiny].turns[0].find(employee => employee.dni === employees[source.index].dni)
                        if(!aux){
                            addEmplInTurnSchedule(employees[source.index],0,daySchedule + dayScheduleDestiny)
                        }
                    }
                }
                else if(turnDestiny === 'Afternoon'){
                    if(source.droppableId === 'employeeList'){
                        let aux = schedule[daySchedule + dayScheduleDestiny].turns[1].find(employee => employee.dni === employees[source.index].dni)
                        if(!aux){
                            addEmplInTurnSchedule(employees[source.index],1,daySchedule + dayScheduleDestiny)
                        }
                    }
                }
                else if(turnDestiny === 'Nigth'){
                    if(source.droppableId === 'employeeList'){
                        let aux = schedule[daySchedule + dayScheduleDestiny].turns[2].find(employee => employee.dni === employees[source.index].dni)
                        if(!aux){
                            addEmplInTurnSchedule(employees[source.index],2,daySchedule + dayScheduleDestiny)
                        }
                    }
                }            
                else if(turnDestiny === 'UltraNigth'){
                    if(source.droppableId === 'employeeList'){
                        let aux = schedule[daySchedule + dayScheduleDestiny].turns[3].find(employee => employee.dni === employees[source.index].dni)                        
                        if(!aux){
                            addEmplInTurnSchedule(employees[source.index],3,daySchedule + dayScheduleDestiny)
                        }
                    }
                }
            }
        }}>
            <div className="row">
                <div className="col-sm-9">
                    <Table style={{display: 'block', height: '35rem',overflow: 'auto'}}>
                        <HeaderTable th={
                            <>
                                <th style={{textAlign:'center', width:'5%'}}>Horas</th>
                                <th style={{textAlign:'center', width:'5%'}}>
                                    <button className='sendOk' style={{width:'100%'}} onClick={() => {setDaySchedule(daySchedule-1)}} disabled={daySchedule===0}><FontAwesomeIcon icon={faArrowLeft}/></button>
                                </th>
                                <th style={{textAlign:'center'}}>{dateToNameDay(schedule[daySchedule]?.date.getDay())}</th>
                                <th style={{textAlign:'center'}}>{dateToNameDay(schedule[daySchedule+1]?.date.getDay())}</th>
                                <th style={{textAlign:'center'}}>{dateToNameDay(schedule[daySchedule+2]?.date.getDay())}</th>
                                <th style={{textAlign:'center', width:'5%'}}>
                                    <button className='sendOk' style={{width:'100%'}} onClick={() => {setDaySchedule(daySchedule+1)}} disabled={daySchedule===(schedule.length-3)}><FontAwesomeIcon icon={faArrowRight}/></button>
                                </th>
                            </>
                        }/>
                        <BodyTable tbody={
                            <tbody style={{display: 'block', overflow: 'auto' , height: '30rem'}}>
                                <tr style={{height:'210px'}}>
                                    <td style={{textAlign:'center',width:'5%'}}>
                                        <div className="container">
                                            <div className="row align-items-start"><label style={{height:'80px'}}>8:00</label></div>
                                            <div className="row align-items-center"><label style={{height:'80px'}}>a</label></div>
                                            <div className="row align-items-end"><label style={{height:'30px'}}>12:00</label></div>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td style={{textAlign:'center'}}>
                                        <ContainerEmployees turn='Morning0' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[0]}/>
                                    </td>    
                                    <td>
                                        <ContainerEmployees turn='Morning1' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+1].turns[0]}/>
                                    </td>
                                    <td>
                                        <ContainerEmployees turn='Morning2' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+2].turns[0]}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'center',width:'5%'}}>
                                        <div className="container">
                                            <div className="row align-items-start"><label style={{height:'80px'}}>12:00</label></div>
                                            <div className="row align-items-center"><label style={{height:'80px'}}>a</label></div>
                                            <div className="row align-items-end"><label style={{height:'30px'}}>18:00</label></div>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td style={{textAlign:'center'}}>
                                        <ContainerEmployees turn='Afternoon0' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[1]}/>
                                    </td>
                                    <td>
                                        <ContainerEmployees turn='Afternoon1' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+1].turns[1]}/>
                                    </td>
                                    <td>
                                        <ContainerEmployees turn='Afternoon2' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+2].turns[1]}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'center',width:'5%'}}>
                                        <div className="container">
                                            <div className="row align-items-start"><label style={{height:'80px'}}>18:00</label></div>
                                            <div className="row align-items-center"><label style={{height:'80px'}}>a</label></div>
                                            <div className="row align-items-end"><label style={{height:'30px'}}>22:00</label></div>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td style={{textAlign:'center'}}>
                                        <ContainerEmployees turn='Nigth0' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[2]}/>
                                    </td>
                                    <td>
                                        <ContainerEmployees turn='Nigth1' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+1].turns[2]}/>
                                    </td>
                                    <td>
                                        <ContainerEmployees turn='Nigth2' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+2].turns[2]}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:'center',width:'5%'}}>
                                        <div className="container">
                                            <div className="row align-items-start"><label style={{height:'80px'}}>22:00</label></div>
                                            <div className="row align-items-center"><label style={{height:'80px'}}>a</label></div>
                                            <div className="row align-items-end"><label style={{height:'30px'}}>02:00</label></div>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td style={{textAlign:'center'}}>
                                        <ContainerEmployees turn='UltraNigth0' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[3]}/>
                                    </td>
                                    <td>
                                        <ContainerEmployees turn='UltraNigth1' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+1].turns[3]}/>
                                    </td>
                                    <td>
                                        <ContainerEmployees turn='UltraNigth2' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule+2].turns[3]}/>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        }/>
                    </Table>
                </div>
                <div className="col-sm-3">
                    <DateSchedule day={daySchedule} setDay={setDaySchedule} employees={employees}/>
                    <EmployeesSelection employees={employees} />
                </div>
            </div>
        </DragDropContext>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        schedule: state.schedule,
    }
}

const mapDispatchToProps = {
    addEmplInTurnSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDays);