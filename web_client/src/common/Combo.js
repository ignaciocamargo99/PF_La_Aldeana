import '../assets/Form.css'

export default function Combo(props) {
    return (
        <div>
            <label className="col-3">{props.descriptioncombo}</label>
            <select className='col-7' {...props}>
                {props.optiondefault}
                {props.options}
            </select>
            {props.children}
        </div>
    );
}