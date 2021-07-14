import Combo from "./Combo"

const InputComboPlus = (props) => {
    return (
        <div className="row justify-content-start">
            <Combo descriptioncombo={props.label}>
                <button className='col-1 plus'>+</button>
            </Combo>
        </div>
    );
}

export default InputComboPlus;