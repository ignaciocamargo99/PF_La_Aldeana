import CardMenuReport from "./CardMenuReport";
import Card from "../../EmployeesSchedules/components/Card";

export default function SalesReports() {
  const goToProductsSales = () =>
    window.location.replace("/app/productSalesReport");
  const goToFlavorsSales = () =>
    window.location.replace("/app/flavorsSalesReport");
  const goToFlavorsStock = () =>
    window.location.replace("/app/stockFlavorsReport");
  const goToTotalSales = () => window.location.replace("/app/totalSalesReport");
  const goToOnsiteSalesReport = () =>
    window.location.replace("/app/onsiteSalesReport");

  return (
    <>
      <CardMenuReport type="Ventas">
        <Card
          title="Reporte de productos vendidos a mínoristas"
          text="Reporte que abarca la cantidad de unidades de los productos vendidos a mínoristas en cierto periodo de tiempo"
          handleCardClicked={goToProductsSales}
        />
        <br />
        <Card
          title="Reporte de consumo de baldes de sabores de helados"
          text="Reporte que abarca la cantidad de baldes de consumidos de helados por sabor en cierto periodo de tiempo"
          handleCardClicked={goToFlavorsSales}
        />
        <br />
        <Card
          title="Reporte de stock de sabores de helados y reabastecimiento"
          text="Reporte que abarca la cantidad de baldes actuales de sabores de helado y de orden de reabastecimiento"
          handleCardClicked={goToFlavorsStock}
        />
        <br />
        <Card
          title="Reporte de venta en el local durante el dia"
          text="Reporte que da información estadística de las ventas en el local durante el dia seleccionado"
          handleCardClicked={goToOnsiteSalesReport}
        />
        <br />
        <Card
          title="Reporte de total de ventas"
          text="Reporte que abarca la cantidad de total de ventas en un periodo de tiempo"
          handleCardClicked={goToTotalSales}
        />
      </CardMenuReport>
    </>
  );
}
