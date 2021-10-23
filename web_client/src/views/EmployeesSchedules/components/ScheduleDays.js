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
            else if(destination.droppableId === 'Morning'){
                if(source.droppableId === 'employeeList'){
                    let aux = schedule[daySchedule].turns[0].find(employee => employee.dni === employees[source.index].dni)
                    if(!aux){
                        addEmplInTurnSchedule(employees[source.index],0,daySchedule)
                    }
                }
            }
            else if(destination.droppableId === 'Afternoon'){
                if(source.droppableId === 'employeeList'){
                    let aux = schedule[daySchedule].turns[1].find(employee => employee.dni === employees[source.index].dni)
                    if(!aux){
                        addEmplInTurnSchedule(employees[source.index],1,daySchedule)
                    }
                }
            }
            else if(destination.droppableId === 'Nigth'){
                if(source.droppableId === 'employeeList'){
                    let aux = schedule[daySchedule].turns[2].find(employee => employee.dni === employees[source.index].dni)
                    if(!aux){
                        addEmplInTurnSchedule(employees[source.index],2,daySchedule)
                    }
                }
            }            
            else if(destination.droppableId === 'UltraNigth'){
                if(source.droppableId === 'employeeList'){
                    let aux = schedule[daySchedule].turns[3].find(employee => employee.dni === employees[source.index].dni)
                    if(!aux){
                        addEmplInTurnSchedule(employees[source.index],3,daySchedule)
                    }
                }
            }
        }}>
            <div className="row">
                <div className="col-sm-8">
                    <Table>
                        <HeaderTable th={
                            <>
                                <th style={{textAlign:'center', width:'5%'}}>Horas</th>
                                <th style={{textAlign:'center', width:'5%'}}>
                                    <button className='sendOk' style={{width:'100%'}} onClick={() => {setDaySchedule(daySchedule-1)}} disabled={daySchedule===0}><FontAwesomeIcon icon={faArrowLeft}/></button>
                                </th>
                                <th style={{textAlign:'center'}}>{dateToNameDay(schedule[daySchedule]?.date.getDay())}</th>
                                <th style={{textAlign:'center', width:'5%'}}>
                                    <button className='sendOk' style={{width:'100%'}} onClick={() => {setDaySchedule(daySchedule+1)}} disabled={daySchedule===(schedule.length-1)}><FontAwesomeIcon icon={faArrowRight}/></button>
                                </th>
                            </>
                        }/>
                        <BodyTable tbody={
                            <tbody>
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
                                        <ContainerEmployees turn='Morning' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[0]}/>
                                    </td>    
                                    <td></td>
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
                                        <ContainerEmployees turn='Afternoon' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[1]}/>
                                    </td>
                                    <td></td>
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
                                        <ContainerEmployees turn='Nigth' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[2]}/>
                                    </td>
                                    <td></td>
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
                                        <ContainerEmployees turn='UltraNigth' employeesTurn={(schedule.length===0)?[]:schedule[daySchedule].turns[3]}/>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        }/>
                    </Table>
                </div>
                <div className="col-sm-4">
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