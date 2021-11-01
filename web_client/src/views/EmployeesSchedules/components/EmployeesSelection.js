import employeeImg from '../../../common/CommonImages/Empleado_Generico.png';
import { Droppable , Draggable } from 'react-beautiful-dnd';
import './Employees.css';
import showMeCharge from '../../../utils/ShowMeCharge/showMeCharge';

const EmployeesSelection = (props) => {
    
    return(
        <div>
            <label className="col-sm-9 offset-sm-3"><b>Empleados seleccionables</b></label>
            <div className="formRow col-sm-10 offset-sm-1">
                <Droppable droppableId='employeeList' >
                    {(droppableProvided) => 
                    (<ul {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} >
                        {props.employees.map((employee,i) => (
                            <Draggable key={employee.dni} draggableId={employee.dni.toString()} index={i}>
                                {(draggableProvided) => 
                                (<li {...draggableProvided.draggableProps} 
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    className={`cardEmployee ${showMeCharge(employee.charge)}`}>
                                    <img src={employeeImg} className="imageEmployee"/>
                                    <label className="textEmployeeCard">{employee.last_name}</label>
                                </li>)}
                            </Draggable>)
                        )}
                        {droppableProvided.placeholder}
                    </ul>)}
                </Droppable>
            </div>
        </div>
    )

}

export default EmployeesSelection