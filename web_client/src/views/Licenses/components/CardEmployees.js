import { faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardEmployees = (props) => {
    return(
    <>
        <div>
            <button style={{height:"200px", margin:"5px",backgroundColor:'#383C77',color:'white'}} disabled={props.employeesStart === 0} onClick={() => {props.setEmployeesStart(props.employeesStart-1)}}><FontAwesomeIcon icon={faArrowLeft}/></button>
        </div>
        {props.employeesView.map((employee,i) => {
            if(props.employee?.dni === employee.dni){
                return(
                    <div key={i}>
                        <button style={{width:"200px", height:"200px", margin:"5px",backgroundColor:'gray'}}>
                            <label><b>DNI: {employee.dni}</b></label>
                            <label><b>Apellido: {employee.last_name}</b></label>
                            <label><b>Nombre: {employee.name}</b></label>
                        </button>
                    </div>
                )
            }
            return(
                <div key={i}>
                    <button style={{width:"200px", height:"200px", margin:"5px",backgroundColor:'#F68634'}} onClick={() => {props.onChangeEmployee(employee)}}>
                        <label><b>DNI: {employee.dni}</b></label>
                        <label><b>Apellido: {employee.last_name}</b></label>
                        <label><b>Nombre: {employee.name}</b></label>
                    </button>
                </div>
            )
        })}
        <div>
            <button style={{height:"200px", margin:"5px",backgroundColor:"#383C77",color:'white'}} disabled={props.employeesStart === (props.employees.length-6)} onClick={() => {props.setEmployeesStart(props.employeesStart+1)}}><FontAwesomeIcon icon={faArrowRight}/></button>
        </div>
    </>
    )
}

export default CardEmployees