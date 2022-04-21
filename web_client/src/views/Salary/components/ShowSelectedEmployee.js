import employeeIMG from '../../../common/CommonImages/Empleado_Generico.png';
import '../styles/Licenses.css';

const ShowSelectedEmployee = (props) => {
    if (props.selectedEmployee !== null) {
        let charges = "";

        props.selectedEmployee.charges?.map((charge, i) => i + 1 < props.selectedEmployee.charges.length ? charges += charge.chargeName + ", " : charges += charge.chargeName);

        return (
            <div>
                <div className="row">
                    <label>Empleado seleccionado: </label>
                </div>
                <div className="row">
                    <div className="col offset-sm-1">
                        <img src={employeeIMG} className="carnet"></img>
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm-2">
                                <label>DNI: </label>
                            </div>
                            <div className="col">
                                <label>{props.selectedEmployee.dni}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2"   >
                                <label>Apellido y Nombre: </label>
                            </div>
                            <div className="col">
                                <label>{props.selectedEmployee.last_name}, {props.selectedEmployee.name}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2"   >
                                <label>Cargo: </label>
                            </div>
                            <div className="col">
                                <label>{charges}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <label>Relación laboral: </label>
                            </div>
                            <div className="col">
                                <label>{props.selectedEmployee.name_emp_relationship}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (<></>)
    }
}

export default ShowSelectedEmployee