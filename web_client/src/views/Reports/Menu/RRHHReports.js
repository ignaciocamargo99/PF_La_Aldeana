import CardMenuReport from "./CardMenuReport";
import Card from "../../EmployeesSchedules/components/Card";

export default function RRHHReports() {
    const goToSalariesReport = () => window.location.replace('/app/salariesReport');
    return(
        <>
            <CardMenuReport type='Recursos humanos'>
                <Card title='Reporte de salarios' text='Resumen de los salarios pagados en un mes determinado o en un periodo de meses' handleCardClicked={goToSalariesReport
        } />
            </CardMenuReport>
        </>
    );
}