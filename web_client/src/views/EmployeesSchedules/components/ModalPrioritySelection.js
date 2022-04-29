import { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import warningMessage from 'utils/WarningMessages/warningMessage';
import Buttons from '../../../common/Buttons';
import swal from 'sweetalert';

const ModalPrioritySelection = ({show, setShowCharge, charge, employees, priority, setPriority}) => {
    
    const [newPriority,setNewPriority] = useState(priority.slice());
    const [ready,setReady] = useState(false);

    useEffect(() => {
        setNewPriority(priority.slice());
        setReady(false);
    },[show])

    const cancel = () => {setShowCharge(null)};

    const onChangePriority = (index, number) => {
        if(number < 0) number = 0;
        let auxNewPriority = newPriority.slice();
        auxNewPriority[index] = number;
        setNewPriority(auxNewPriority)
        if(JSON.stringify(priority) !== JSON.stringify(auxNewPriority)) {setReady(true)}
        else{setReady(false)}
    }

    const onBlurPriority = (index, number) => {
        if(number === '') onChangePriority(index, 0);
    }

    const confirm = () => {
        swal('Atención', 'Prioridad modificada exitosamente', 'success');
        setPriority(newPriority);
        cancel();
    }

    return (
        <Modal isOpen={show} className="modal-sale modal-lg" >
            <ModalHeader>
                <label>Selección de prioridad para ir a la mañana</label>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <table className='table table-control table-hover'>
                        <thead>
                            <tr>
                                <th><label>Empleado</label></th>
                                <th>Prioridad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employees,i) => {
                                if(employees.charges[0].chargeId === charge){
                                    return(
                                        <tr key={employees.dni}>
                                            <td className='col-sm-1'>
                                                <label>{employees.name}</label>
                                            </td>
                                            <td className='col-sm-1'>
                                                <div className='col-sm-6'>
                                                    <input className='form-control' 
                                                            type='number'
                                                            value={newPriority[i]} 
                                                            onChange={(e) => {onChangePriority(i,e.target.value)}}
                                                            onBlur={(e) => {onBlurPriority(i,e.target.value)}}/>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Buttons label='Confirmar' 
                         ready={ready} 
                         actionOK={confirm} 
                         actionNotOK={() => {warningMessage('Atención', 'No se ha cambiado la prioridad', 'warning')}} 
                         actionCancel={cancel}/>
            </ModalFooter>
        </Modal>
    )
}


export default ModalPrioritySelection;