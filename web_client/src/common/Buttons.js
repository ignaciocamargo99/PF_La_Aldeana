import BeShowed from './BeShowed';

const Buttons = (props) => {

    return (
        <div className='buttons'>
            <BeShowed show={props.ready}>
                <button className='sendOk' onClick={props.actionOK}>{props.label}</button>
            </BeShowed>
            <BeShowed show={!props.ready}>
                <button className='sendNotOk' onClick={props.actionOK}>{props.label}</button>
            </BeShowed>
            <button className='cancel' onClick={props.actionCancel}>Cancelar</button>
        </div>
    );

}

export default Buttons;