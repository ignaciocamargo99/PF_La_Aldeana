import CardMenuReport from "./CardMenuReport";
import Card from "../../EmployeesSchedules/components/Card";

export default function SalesReports() {
    const goToProductsSales = () => window.location.replace('/app/productSalesReport');
    const goToOnsiteSalesReport = () => window.location.replace('/app/onsiteSalesReport');
    const goToFlavorsSales = () => window.location.replace('/app/flavorsSalesReport');
    const goToFlavorsStock = () => window.location.replace('/app/stockFlavorsReport');
    
    return(
        <>
            <CardMenuReport type='Ventas'>
                <Card title='Reporte de venta de productos' text='Reporte que abarca la cantidad de unidades de los productos vendidos en cierto periodo de tiempo' handleCardClicked={goToProductsSales} />
                <br />
                <Card title='Reporte de venta en el local durante el dia' text='Reporte que da información estadística de las ventas en el local durante el dia seleccionado' handleCardClicked={goToOnsiteSalesReport} />
                <br/>
                <Card title='Reporte de consumo de baldes de sabores de helados' text='Reporte que abarca la cantidad de baldes de consumidos de helados por sabor en cierto periodo de tiempo' handleCardClicked={goToFlavorsSales} />
                <br/>
                <Card title='Reporte de stock de sabores de helados y reabastecimiento' text='Reporte que abarca la cantidad de baldes actuales de sabores de helado y de orden de reabastecimiento' handleCardClicked={goToFlavorsStock} />
            </CardMenuReport>
        </>
    );
}