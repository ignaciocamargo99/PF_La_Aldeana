import BeShowed from './BeShowed';

export default function Combo(props) {
    return (
        <>
            <div className="form-control-label">
                <label htmlFor={props.htmlfordata} >{props.descriptioncombo}</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={props.children}>
                    <select className="form-control" id={props.htmlfordata} {...props}>
                        {props.optiondefault}
                        {props.options}
                    </select>
                </BeShowed>
                {props.children}
            </div>
        </>
    );
}