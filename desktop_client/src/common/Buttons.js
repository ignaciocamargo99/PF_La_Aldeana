import BeShowed from './BeShowed';
import '../assets/buttons.css';

const Buttons = (props) => {
    
    const actionNotOK = () => props.actionNotOK(props.data)

    return (
        <div className='buttons'>
            <BeShowed show={props.ready}>
                <button className='sendOk' onClick={props.actionOK}>{props.label}</button>
            </BeShowed>
            <BeShowed show={!props.ready}>
                <button className='sendNotOk' onClick={actionNotOK}>{props.label}</button>
            </BeShowed>
            <button className='cancel' onClick={props.actionCancel}>Cancelar</button>
        </div>
    );
}

export default Buttons;