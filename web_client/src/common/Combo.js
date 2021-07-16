import '../assets/Form.css'
import BeShowed from './BeShowed'

export default function Combo(props) {
    return (
        <>
            <div className="form-control-label">
                <label htmlFor={props.htmlForData} >{props.descriptioncombo}</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={props.children}>
                    <select className="form-control" id={props.htmlForData} {...props}>
                        {props.optiondefault}
                        {props.options}
                    </select>
                </BeShowed>
                {/*
                <BeShowed show={!props.children}>
                    <select className='col-md-8' {...props}>
                        {props.optiondefault}
                        {props.options}
                    </select>
                </BeShowed>
                */}
                {props.children}
            </div>
        </>
    );
}