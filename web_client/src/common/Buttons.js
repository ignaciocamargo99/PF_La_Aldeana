import BeShowed from './BeShowed';

const Buttons = (props) => {
    
    const actionNotOK = () => props.actionNotOK(props.data)

    return (
        <div className='buttons'>
            <BeShowed show={props.labelJump}>
                <BeShowed show={props.ready}>
                    <button className='sendOk' onClick={props.actionOK}>{props.label}</button>
                    <button className='cancel' onClick={props.actionJump}>{props.labelJump}</button>
                    <button className='cancel' onClick={props.actionCancel}>Cancelar</button>
                </BeShowed>
                <BeShowed show={!props.ready}>
                    <button className='sendNotOk' onClick={actionNotOK}>{props.label}</button>
                    <button className='cancelSendNotOk' onClick={actionNotOK}>{props.labelJump}</button>
                    <button className='cancel' onClick={props.actionCancel}>Cancelar</button>
                </BeShowed>
            </BeShowed>
            <BeShowed show={!props.labelJump}>
                <BeShowed show={props.ready}>
                    <button className='sendOk' onClick={props.actionOK}>{props.label}</button>
                </BeShowed>
                <BeShowed show={!props.ready}>
                    <button className='sendNotOk' onClick={actionNotOK}>{props.label}</button>
                </BeShowed>
                <button className='cancel' onClick={props.actionCancel}>{'Cancelar'}</button>
            </BeShowed>
        </div>
    );

}

export default Buttons;