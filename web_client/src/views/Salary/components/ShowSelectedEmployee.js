import employeeIMG from 'common/CommonImages/Empleado_Generico.png';
import '../styles/Licenses.css';

const ShowSelectedEmployee = ({ selectedEmployee }) => {
    if (selectedEmployee) {
        let charges = "";

        selectedEmployee.charges?.map((charge, i) => i + 1 < selectedEmployee.charges.length ? charges += charge.chargeName + ", " : charges += charge.chargeName);

        const employeeData = [
            ['DNI:', selectedEmployee.dni],
            ['Apellido y Nombre:', `${selectedEmployee.last_name}, ${selectedEmployee.name}`],
            ['Cargo:', charges],
            ['Relación laboral:', selectedEmployee.name_emp_relationship],
        ]

        return (
            <div className='d-flex flex-column' style={{maxWidth: '18em'}}>
                <label>Empleado seleccionado: </label>
                <div className='ps-3'>
                    <img
                        alt='employeePhoto'
                        src={employeeIMG}
                        className='mt-3 mb-4'
                        style={{ width: '80px', height: '80px' }}
                    >
                    </img>
                </div>
                <div className="container">
                    {employeeData.map(([key, value]) => (
                        <div className="row">
                            <div className="col-5">
                                <label >{key}</label>
                            </div>
                            <div className="col">
                                <label className="text-muted">{value}</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        )
    }
}

export default ShowSelectedEmployee;
