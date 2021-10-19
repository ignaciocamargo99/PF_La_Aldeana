import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import Table from '../../../common/Table/Table';
import { dateToNameDay } from '../../../utils/DateToNameDay/dateToNameDay';
import EmployeesSelection from './EmployeesSelection';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import employeeImg from '../../../common/CommonImages/Empleado_Generico.png';
import './ScheduleDays.css';

const ScheduleDays = (props) => {

    const [employeesMorning, setEmployeesMorning] = useState([])
    const [employees, setEmployees] = useState([{dni:41769668},{dni:41769669}])

    return(
    <div className="container">
        <DragDropContext onDragEnd={(result) => {
            const {source, destination} = result;
            if(!destination || destination.droppableId === source.droppableId){
                return;
            }
            else if(destination.droppableId !== 'employeeList'){
                let employeeSelected = employees[source.index];
                let auxEmpMorning = [...employeesMorning,employeeSelected]
                let auxEmp = employees.filter((employee) => employee.dni !== employeeSelected.dni)
                setEmployeesMorning(auxEmpMorning)
                setEmployees(auxEmp)
            }
            else if(destination.droppableId === 'employeeList'){
                let employeeSelected = employeesMorning[source.index];
                let auxEmp = [...employees,employeeSelected]
                let auxEmpMorning = employeesMorning.filter((employee) => employee.dni !== employeeSelected.dni)
                setEmployeesMorning(auxEmpMorning)
                setEmployees(auxEmp)
            }
        }}>
            <Table>
                <HeaderTable th={
                    <>
                    <th>Horas</th>
                    {props.days.map((day) => {
                        return(
                            <th>{dateToNameDay(day)}</th>
                        )
                    })}
                    </>
                }/>
                <BodyTable tbody={
                    <tbody>
                        <tr>
                            <td>8:00</td>
                            <td>
                                <Droppable droppableId='8:00'>
                                    {(droppableProvided) => (
                                    <ul {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                        className="container-Items"
                                    >
                                        {employeesMorning.map((employee,i) => (
                                            <Draggable key={employee.dni} draggableId={employee.dni.toString()} index={i}>
                                                {(draggableProvided) => 
                                                (<li {...draggableProvided.draggableProps} 
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.dragHandleProps}
                                                    className="item">
                                                    <div>
                                                        <img src={employeeImg} style={{height:'30px'}}/>
                                                        <label>{employee.dni}</label>
                                                    </div>
                                                </li>)}
                                            </Draggable>)
                                        )}
                                    {droppableProvided.placeholder}
                                    </ul>)}
                                </Droppable>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>                        
                        </tr>
                        <tr>
                            <td>9:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>10:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>11:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>12:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                }/>
            </Table>

            <EmployeesSelection employees={employees} />
        </DragDropContext>
    </div>
    )
}

export default ScheduleDays