import BeShowed from './BeShowed';
import '../assets/Buttons.css';

const Buttons = (props) => {
    
    const actionNotOK = () => props.actionNotOK(props.data)

    return (
        <div className='buttons'>
            <BeShowed show={props.ready}>
                <button className='btn btn-light sendOk' onClick={props.actionOK}>{props.label}</button>
            </BeShowed>
            <BeShowed show={!props.ready}>
                <button className='btn btn-light sendNotOk' onClick={actionNotOK}>{props.label}</button>
            </BeShowed>
            <button className='btn btn-light cancel' onClick={props.actionCancel}>{props.cancel ? props.cancel :'Cancelar'}</button>
        </div>
    );
}

export default Buttons;