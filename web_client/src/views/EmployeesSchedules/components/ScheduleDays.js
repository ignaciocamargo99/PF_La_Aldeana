import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import Table from '../../../common/Table/Table';
import { dateToNameDay } from '../../../utils/DateToNameDay/dateToNameDay';
import EmployeesSelection from './EmployeesSelection';
import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { getEmployeesDestination } from '../../../utils/getEmployeesDestination/getEmployeesDestination';
import ContainerEmployees from './ContainersEmployees';
import axios from 'axios';
import { connect } from 'react-redux';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PORT = require('../../../config');

const ScheduleDays = ({ schedule }) => {

    const [employeesMorning, setEmployeesMorning] = useState([])
    const [employeesAfternoon, setEmployeesAfternoon] = useState([])
    const [employeesNigth, setEmployeesNigth] = useState([])
    const [employeesUltraNigth, setEmployeesUltraNigth] = useState([])
    const [employees, setEmployees] = useState([])

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
                    let newEmployeesMorning = getEmployeesDestination(employees,employeesMorning,source.index)
                    setEmployeesMorning(newEmployeesMorning)
                }
            }
            else if(destination.droppableId === 'Afternoon'){
                if(source.droppableId === 'employeeList'){
                    let newEmployeesAfternoon = getEmployeesDestination(employees,employeesAfternoon,source.index)
                    setEmployeesAfternoon(newEmployeesAfternoon)
                }
            }
            else if(destination.droppableId === 'Nigth'){
                if(source.droppableId === 'employeeList'){
                    let newEmployeesNigth = getEmployeesDestination(employees,employeesNigth,source.index)
                    setEmployeesNigth(newEmployeesNigth)
                }
            }            
            else if(destination.droppableId === 'UltraNigth'){
                if(source.droppableId === 'employeeList'){
                    let newEmployeesUltraNigth  = getEmployeesDestination(employees,employeesUltraNigth,source.index)
                    setEmployeesUltraNigth(newEmployeesUltraNigth)
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
                                    <button className='sendOk' style={{width:'100%'}}><FontAwesomeIcon icon={faArrowLeft}/></button>
                                </th>
                                <th style={{textAlign:'center'}}>{dateToNameDay(schedule[0]?.date.getDay())}</th>
                                <th style={{textAlign:'center', width:'5%'}}>
                                    <button className='sendOk' style={{width:'100%'}}><FontAwesomeIcon icon={faArrowRight}/></button>
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
                                        <ContainerEmployees turn='Morning' employeesTurn={employeesMorning}/>
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
                                        <ContainerEmployees turn='Afternoon' employeesTurn={employeesAfternoon}/>
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
                                        <ContainerEmployees turn='Nigth' employeesTurn={employeesNigth}/>
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
                                        <ContainerEmployees turn='UltraNigth' employeesTurn={employeesUltraNigth}/>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDays);