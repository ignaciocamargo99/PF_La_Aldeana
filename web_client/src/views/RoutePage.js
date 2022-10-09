import { Route } from "react-router-dom";
import { WHOLESALE_PAGE } from "routes/routes";
import NotPermissionPage from "../common/NotPermissionPage";
import SesionPage from "../common/SesionPage";
import { decrypt } from "../utils/EncryptDecryptCookies/EncryptDecrypt";
import RegisterAdvances from "./Advances/components/RegisterAdvances";
import ListAdvances from "./Advances/ListAdvances";
import RegisterAssistance from "./EmployeeAssistance/components/RegisterAssistanceEmployee/RegisterAssistance";
import ListEmployeesAssistance from "./EmployeeAssistance/ListEmployeeAssistance";
import RegisterEmployee from "./Employees/components/RegisterEmployee";
import EmployeesView from "./Employees/EmployeesView";
import EmployeesSchedulesView from "./EmployeesSchedules/EmployeesSchedulesView";
import FlavorRoutes from "./Flavors/FlavorRoutes";
import FlavorTypeRoutes from "./FlavorTypes/FlavorTypeRoutes";
import Franchises from "./Franchises/FranchiseTable";
import RegisterFranchise from "./Franchises/RegisterFranchise";
import Licenses from "./Licenses/components/Licenses";
import ProductsView from "./ListProducts/ProductsView";
import ListProductions from "./Productions/ListProductions";
import RegisterProductionView from "./Productions/RegisterProduction";
import ProductTypesView from "./ProductTypes/components/ProductTypesView";
import RegisterProductView from "./RegisterProduct/RegisterProductView";
import RegisterPurchaseSupplies from "./RegisterPurchaseSupplies/RegisterPurchaseSupplies";
import RegisterTypeProductView from "./RegisterTypeProduct/RegisterTypeProductView";
import RRHHReports from "./Reports/Menu/RRHHReports";
import SalesReports from "./Reports/Menu/SalesReports";
import OnsiteSalesInform from "./Reports/OnsiteSalesDuringTheDay/OnsiteSalesInform";
import ProductSalesReport from "./Reports/ProductSales/ProductSalesReport";
import SalariesReport from "./Reports/Salaries/SalariesReport";
import Salary from "./Salary/components/Salary";
import SupplyRoutes from "./Supplies/SupplyRoutes";
import RegisterUser from "./Users/components/RegisterUser";
import ListUsers from "./Users/ListUsers";
import validationRouters from "./validationRouters";
import WholeSaleRoutes from "./WholeSale/WholeSaleRoutes";
import FlavorsStockReport from "./Reports/FlavorsStock/FlavorsStockReport";
import PurchaseSuppliesRoutes from "./RegisterPurchaseSupplies/PurchaseSuppliesRoutes"
import TotalSalesReport from "./Reports/TotalSales/TotalSalesReport";
import ConsuptionsOfFlavorsReport from "./Reports/ConsuptionsOfFlavors/ConsuptionsOfFlavorsReport";

export default function RouterPage(props) {
  const showOptionsWithPermissions = () => {
    let permissions = [];
    props.options.forEach((option) => {
      permissions.push(decrypt(option));
    });
    let validateRouting = validationRouters(
      window.location.pathname,
      props.accesses
    );
    if (validateRouting) {
      // -------------------------------------- PRODUCTS ----------------------------------------
      const permissionProducts = permissions.find(
        (option) => option === "Productos"
      );
      let products;
      if (permissionProducts === "Productos") {
        let permissionsAccessProducts = props.accesses[3];
        products = (
          <>
            <Route
              path="/app/products"
              render={() => (
                <ProductsView permissionsAccess={permissionsAccessProducts} />
              )}
            ></Route>
            <Route
              path="/app/registerProducts"
              component={RegisterProductView}
            ></Route>
            <Route
              path="/app/productTypes"
              render={() => (
                <ProductTypesView
                  permissionsAccess={permissionsAccessProducts}
                />
              )}
            ></Route>
            <Route
              path={"/app/registerProductTypes"}
              component={RegisterTypeProductView}
            ></Route>
            <Route path="/app/supplies">
              <SupplyRoutes permissionsAccess={permissionsAccessProducts} />
            </Route>
          </>
        );
      }

      // ------------------------------------- PRODUCTIONS -------------------------------------
      const permissionProduction = permissions.find(
        (option) => option === "Producciones"
      );
      let productions;
      if (permissionProduction === "Producciones") {
        let permissionsAccessProductions = props.accesses[4];
        productions = (
          <>
            <Route
              path="/app/productions"
              render={() => (
                <ListProductions
                  permissionsAccess={permissionsAccessProductions}
                />
              )}
            ></Route>
            <Route
              path="/app/production"
              component={RegisterProductionView}
            ></Route>
            <Route path="/app/flavors">
              <FlavorRoutes permissionsAccess={permissionsAccessProductions} />
            </Route>
            <Route path="/app/flavorTypes">
              <FlavorTypeRoutes
                permissionsAccess={permissionsAccessProductions}
              />
            </Route>
          </>
        );
      }

      // ------------------------------------ FRANCHISES --------------------------------------
      const permissionFranchises = permissions.find(
        (option) => option === "Franquicias"
      );
      let franchises;
      if (permissionFranchises === "Franquicias") {
        let permissionsAccessFranchises = props.accesses[5];
        franchises = (
          <>
            <Route
              path="/app/franchises"
              render={() => (
                <Franchises permissionsAccess={permissionsAccessFranchises} />
              )}
            ></Route>
            <Route path={WHOLESALE_PAGE}>
              <WholeSaleRoutes
                permissionsAccess={permissionsAccessFranchises}
                user={props.user}
              />
            </Route>
            <Route
              path="/app/newFranchise"
              component={RegisterFranchise}
            ></Route>
          </>
        );
      }

      // ---------------------------------- SALES REPORTS --------------------------------------
      let reportsSales;
      const permissionReportsSales = permissions.find(
        (option) => option === "Reportes Ventas"
      );
      if (permissionReportsSales === "Reportes Ventas") {
        let permissionsAccessSalesReports = props.accesses[6];
        reportsSales = (
          <>
            <Route
              path="/app/salesReport"
              render={() => (
                <SalesReports
                  permissionsAccess={permissionsAccessSalesReports}
                />
              )}
            ></Route>
            <Route
              path="/app/productSalesReport"
              render={() => (
                <ProductSalesReport
                  permissionsAccess={permissionsAccessSalesReports}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/flavorsSalesReport"
              render={() => (
                <ConsuptionsOfFlavorsReport
                  permissionsAccess={permissionsAccessSalesReports}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/stockFlavorsReport"
              render={() => (
                <FlavorsStockReport
                  permissionsAccess={permissionsAccessSalesReports}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/totalSalesReport"
              render={() => (
                <TotalSalesReport
                  permissionsAccess={permissionsAccessSalesReports}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/onsiteSalesReport"
              render={() => (
                <OnsiteSalesInform
                  permissionsAccess={permissionsAccessSalesReports}
                  user={props.user}
                />
              )}
            />
          </>
        );
      }

      const permissionReportsHumanResources = permissions.find(
        (option) => option === "Reportes Recursos Humanos"
      );
      let reportHumanResources;
      if (permissionReportsHumanResources === "Reportes Recursos Humanos") {
        reportHumanResources = (
          <>
            <Route
              path="/app/RRHHReport"
              render={() => (
                <RRHHReports
                  permissionsAccess={permissionReportsHumanResources}
                />
              )}
            ></Route>
            <Route
              path="/app/salariesReport"
              render={() => (
                <SalariesReport
                  permissionsAccess={permissionReportsHumanResources}
                  user={props.user}
                />
              )}
            ></Route>
          </>
        );
      }

      // -------------------------------------- PURCHASES -------------------------------------
      const permissionPurchases = permissions.find(
        (option) => option === "Compras"
      );
      let purchases;
      if (permissionPurchases === "Compras") {
        let permissionAccessPurchases = props.accesses[2];
        purchases = (
          <>
            <Route
              path="/app/purchaseSupplies"
              render={() => (
                <PurchaseSuppliesRoutes
                  permissionsAccess={permissionAccessPurchases}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/newPurchaseSupplies"
              component={RegisterPurchaseSupplies}
            ></Route>
          </>
        );
      }

      // ----------------------------------- EMPLOYEES -------------------------------------
      const permissionEmployees = permissions.find(
        (option) => option === "Empleados"
      );
      let employees;
      if (permissionEmployees === "Empleados") {
        let permissionAccessEmployees = props.accesses[7];
        employees = (
          <>
            <Route
              path="/app/advances"
              render={() => (
                <ListAdvances
                  permissionsAccess={permissionAccessEmployees}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/assistanceEmployees"
              render={() => (
                <ListEmployeesAssistance
                  permissionsAccess={permissionAccessEmployees}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/employees"
              render={() => (
                <EmployeesView permissionsAccess={permissionAccessEmployees} />
              )}
            ></Route>
            <Route
              path="/app/licenses"
              render={() => (
                <Licenses
                  permissionsAccess={permissionAccessEmployees}
                  user={props.user}
                />
              )}
            ></Route>
            <Route
              path="/app/employeesSchedules"
              render={() => (
                <EmployeesSchedulesView
                  permissionsAccess={permissionAccessEmployees}
                />
              )}
            ></Route>
            <Route
              path="/app/registerEmployees"
              component={RegisterEmployee}
            ></Route>
            <Route
              path="/app/registerAssistance"
              component={RegisterAssistance}
            ></Route>
            <Route
              path="/app/registerAdvances"
              component={RegisterAdvances}
            ></Route>
            <Route
              path="/app/salary"
              render={() => (
                <Salary permissionsAccess={permissionAccessEmployees} />
              )}
            ></Route>
          </>
        );
      }

      // ----------------------------------- USERS ---------------------------------------
      const permissionUser = permissions.find(
        (option) => option === "Usuarios"
      );
      let permissionsAdministrator;
      if (permissionUser === "Usuarios") {
        let permissionAccessUsers = props.accesses[8];
        permissionsAdministrator = (
          <>
            <Route
              path="/app/users"
              render={() => (
                <ListUsers permissionsAccess={permissionAccessUsers} />
              )}
            ></Route>
            <Route path="/app/registerUser" component={RegisterUser}></Route>
          </>
        );
      }

      return (
        <>
          {products} {productions} {franchises} {reportsSales} {purchases}{" "}
          {employees} {permissionsAdministrator} {reportHumanResources}
        </>
      );
    } else if (validateRouting === false) return <NotPermissionPage />;
    else return <SesionPage />;
  };

  return <div>{showOptionsWithPermissions()}</div>;
}
