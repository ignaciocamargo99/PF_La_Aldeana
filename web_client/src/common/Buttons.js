import '../assets/Buttons.css'
import BeShowed from './BeShowed';

const Buttons = (props) => {

    return (
        <div className='buttons'>
            <BeShowed show={props.ready}>
                <button className='sendOk' onClick={props.register}>{props.label}</button>
            </BeShowed>
            <BeShowed show={!props.ready}>
                <button className='sendNotOk'>{props.label}</button>
            </BeShowed>
            <button className='cancel' onClick={props.close}>Cancelar</button>
        </div>
    );

}

export default Buttons;