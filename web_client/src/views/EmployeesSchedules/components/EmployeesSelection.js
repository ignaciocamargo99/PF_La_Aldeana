import employeeImg from '../../../common/CommonImages/Empleado_Generico.png';
import { Droppable , Draggable } from 'react-beautiful-dnd';
import './EmployeesSelection.css';

const EmployeesSelection = (props) => {
    
    return(
        <div className="container">
            <label>Empleados seleccionables: </label>
            <div className="formRow">
                <Droppable droppableId='employeeList' direction='horizontal'>
                    {(droppableProvided) => 
                    (<ul {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="container-Items">
                        {props.employees.map((employee,i) => (
                            <Draggable key={employee.dni} draggableId={employee.dni.toString()} index={i}>
                                {(draggableProvided) => 
                                (<li {...draggableProvided.draggableProps} 
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    className="item">
                                    <img src={employeeImg} style={{height:'30px'}}/>
                                    <label>{employee.dni}</label>
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