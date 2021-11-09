
const ShowEmployees = (props) => {
    return(
    <>
        {props.employees.map((employee,i) => {
        if(props.employee?.dni === employee.dni){
                return(
                    <div key={i}>
                        <button style={{width:"200px", height:"200px", margin:"5px",backgroundColor:'#A5DEF9'}}>
                            <label><b>DNI: {employee.dni}</b></label>
                            <label><b>Apellido: {employee.last_name}</b></label>
                            <label><b>Nombre: {employee.name}</b></label>
                        </button>
                    </div>
                )
            }
        else if(props.licensedEmployees.includes(employee.dni)){
                return(
                    <div key={i}>
                        <button style={{width:"200px", height:"200px", margin:"5px",backgroundColor:'gray'}} disabled={true}>
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
    </>
    )
}

export default ShowEmployees