import { Droppable, Draggable } from 'react-beautiful-dnd'
import employeeImg from '../../../common/CommonImages/Empleado_Generico.png';
import './Employees.css';
import showMeCharge from '../../../utils/ShowMeCharge/showMeCharge';

const ContainerEmployees = (props) => {
    
    return(
            <Droppable droppableId={`${props.turn}`}>
                {(droppableProvided) => (
                <ul {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className="contentCards">
                    {props.employeesTurn.map((employee,i) => (
                        <Draggable key={employee.dni} draggableId={`${props.turn}-${employee.dni.toString()}`} index={i}>
                            {(draggableProvided) => 
                            (<li {...draggableProvided.draggableProps} 
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                                className={`cardEmployee-small ${showMeCharge(employee.charge)}`}>
                                <div>
                                    <img src={employeeImg} className="imageEmployee-small"/>
                                    <label>{employee.last_name}</label>
                                </div>
                            </li>)}
                        </Draggable>)
                    )}
                {droppableProvided.placeholder}
                </ul>)}
            </Droppable>
    )
}

export default ContainerEmployees