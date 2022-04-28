import CardMenuReport from "./CardMenuReport";
import Card from "../../EmployeesSchedules/components/Card";

export default function RRHHReports(props) {
    const goToPrube = () => {};
    return(
        <>
            <CardMenuReport type='Recursos humanos'>
                <Card title='Reporte de prueba' text='Reporte de prueba' handleCardClicked={goToPrube} />
            </CardMenuReport>
        </>
    );
}