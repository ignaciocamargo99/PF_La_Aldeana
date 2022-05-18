import CardMenuReport from "./CardMenuReport";
import Card from "../../EmployeesSchedules/components/Card";

export default function SalesReports() {
    const goToProductsSales = () => window.location.replace('/app/productSalesReport');
    
    return(
        <>
            <CardMenuReport type='Ventas'>
                <Card title='Reporte de venta de productos' text='Reporte que abarca la cantidad de unidades de los productos vendidos en cierto periodo de tiempo' handleCardClicked={goToProductsSales} />
            </CardMenuReport>
        </>
    );
}