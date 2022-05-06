const ShowEmployees = (props) => {
    return (
        <>
            {props.employees.map((employee, i) => {
                if (props.employee?.dni === employee.dni) {
                    return (
                        <div key={i}>
                            <button type="button" className="btn btn-primary cardEmployeeSelected">
                                <label><b>DNI: {employee.dni}</b></label>
                                <label><b>Apellido: {employee.last_name}</b></label>
                                <label><b>Nombre: {employee.name}</b></label>
                            </button>
                        </div>
                    )
                }
                else if (props.licensedEmployees.includes(employee.dni)) {
                    return (
                        <div key={i}>
                            <button className="btn btn-secondary disabledCard" disabled={true}>
                                <label><b>DNI: {employee.dni}</b></label>
                                <label><b>Apellido: {employee.last_name}</b></label>
                                <label><b>Nombre: {employee.name}</b></label>
                            </button>
                        </div>
                    )
                }
                return (
                    <div key={i}>
                        <button type="button" className="btn btn-warning cardEmployee" onClick={() => { props.onChangeEmployee(employee) }}>
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