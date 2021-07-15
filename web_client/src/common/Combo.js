import '../assets/Form.css'
import BeShowed from './BeShowed'

export default function Combo(props) {
    return (
        <div className="row justify-content-start">
            <label className="col-md-3">{props.descriptioncombo}</label>
            <BeShowed show={props.children}>
                <select className='col-md-7' {...props}>
                    {props.optiondefault}
                    {props.options}
                </select>
                </BeShowed>
            <BeShowed show={!props.children}>
                <select className='col-md-8' {...props}>
                    {props.optiondefault}
                    {props.options}
                </select>
            </BeShowed>
            {props.children}
        </div>
    );
}