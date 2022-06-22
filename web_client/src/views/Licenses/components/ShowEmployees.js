import warnSweetAlert from "utils/WarningMessages/warnSweetAlert";

const ShowEmployees = (props) => {

    const showLicensedEmployeeWarning = ({ dni, last_name, name }) => {
        const emp = `${last_name}, ${name}`;

        const licenseInvolved = props.licensedEmployees.empOnLicenseData.find(l => {
            return +l.dni === +dni
        })

        const warningText = `
${emp} presenta días de licencia dentro del rango seleccionado.\n
Licencia:\n
* Inicio: ${licenseInvolved.start}\n
* Fin: ${licenseInvolved.end}\n
* Motivo: ${licenseInvolved.reason}\n
`;

        warnSweetAlert(warningText)
    }

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
                else if (props.licensedEmployees.empOnLicenseDNIs?.includes(employee.dni)) {
                    return (
                        <div key={i}>
                            <button className="btn btn-secondary disabledCard" onClick={() => { showLicensedEmployeeWarning(employee) }}>
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