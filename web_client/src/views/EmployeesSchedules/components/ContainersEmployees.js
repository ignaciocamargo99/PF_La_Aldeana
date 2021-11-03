import { Droppable, Draggable } from 'react-beautiful-dnd'
import employeeImg from '../../../common/CommonImages/Empleado_Generico.png';
import './Employees.css';
import showMeCharge from '../../../utils/ShowMeCharge/showMeCharge';
import BeShowed from '../../../common/BeShowed';
import { useState } from 'react';

const ContainerEmployees = (props) => {
    
    const [showDelete,setShowDelete] = useState(false)

    return(
            <Droppable droppableId={`${props.turn}`}>
                {(droppableProvided) => (
                <ul {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className="contentCards">
                    {props.employeesTurn.map((employee,i) => (
                        <li className={`cardEmployee-small ${showMeCharge(employee.charge)}`}
                                onMouseOver={() => {setShowDelete(true)}} onMouseOut={() => {setShowDelete(false)}}
                                >
                                <BeShowed show={!showDelete}>
                                    <div>
                                        <img src={employeeImg} className="imageEmployee-small"/>
                                        <label>{employee.last_name}</label>
                                    </div>
                                </BeShowed>
                                <BeShowed show={showDelete}>
                                    <div>
                                        <button><label>Eliminar</label></button>
                                    </div>
                                </BeShowed>
                            </li>)
                    )}
                {droppableProvided.placeholder}
                </ul>)}
            </Droppable>
    )
}

export default ContainerEmployees