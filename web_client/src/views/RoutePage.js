import React from 'react';
import { Route } from 'react-router-dom';
import { decrypt } from '../utils/EncryptDecryptCookies/EncryptDecrypt';
import RegisterProductView from './RegisterProduct/RegisterProductView';
import ListProducts from './ListProducts/ListProducts';
import RegisterFranchise from './Franchises/RegisterFranchise';
import Franchises from './Franchises/FranchiseTable';
import RegisterPurchaseSupplies from './RegisterPurchaseSupplies/RegisterPurchaseSupplies';
import RegisterProductionView from './Productions/RegisterProduction';
import SalesReports from './Reports/Menu/SalesReports';
import RRHHReports from './Reports/Menu/RRHHReports';
import ProductSalesReport from './Reports/ProductSales/ProductSalesReport';
import EmployeesView from './Employees/EmployeesView';
import RegisterEmployee from './Employees/components/RegisterEmployee';
import Licenses from './Licenses/components/Licenses';
import ListEmployeesAssistance from './EmployeeAssistance/ListEmployeeAssistance';
import RegisterAssistance from './EmployeeAssistance/components/RegisterAssistanceEmployee/RegisterAssistance';
import EmployeesSchedulesView from './EmployeesSchedules/EmployeesSchedulesView';
import ListAdvances from './Advances/ListAdvances';
import RegisterAdvances from './Advances/components/RegisterAdvances';
import ListProductions from './Productions/ListProductions';
import FlavorRoutes from './Flavors/FlavorRoutes';
import ListUsers from './Users/ListUsers';
import RegisterUser from './Users/components/RegisterUser';
import Salary from './Salary/components/Salary';
import NotPermissionPage from '../common/NotPermissionPage';
import SesionPage from '../common/SesionPage';
import validationRouters from './validationRouters';
import ProductTypesView from './ProductTypes/components/ProductTypesView';
import SupplyRoutes from './Supplies/SupplyRoutes';
import FlavorTypeRoutes from './FlavorTypes/FlavorTypeRoutes';
import RegisterTypeProductView from './RegisterTypeProduct/RegisterTypeProductView';

export default function RouterPage(props) {

    const showOptionsWithPermissions = () => {
        let permissions = []
        props.options.forEach((option) => { permissions.push(decrypt(option)) });
        let validateRouting = validationRouters(window.location.pathname, props.accesses);
        if (validateRouting) {
            // -------------------------------------- PRODUCTS ----------------------------------------
            const permissionProducts = permissions.find(option => option === "Productos");
            let products;
            if (permissionProducts === "Productos") {
                let permissionsAccessProducts = props.accesses[3]
                products =
                    <>
                        <Route path='/app/products' render={() => <ListProducts permissionsAccess={permissionsAccessProducts} />}></Route>
                        <Route path='/app/registerProducts' component={RegisterProductView}></Route>
                        <Route path='/app/productTypes' render={() => <ProductTypesView permissionsAccess={permissionsAccessProducts} />}></Route>
                        <Route path={'/app/registerProductTypes'} component={RegisterTypeProductView}></Route>
                        <Route path='/app/supplies'>
                            <SupplyRoutes permissionsAccess={permissionsAccessProducts} />
                        </Route>
                    </>
            }

            // ------------------------------------- PRODUCTIONS -------------------------------------
            const permissionProduction = permissions.find(option => option === "Producciones");
            let productions;
            if (permissionProduction === 'Producciones') {
                let permissionsAccessProductions = props.accesses[4]
                productions =
                    <>
                        <Route path='/app/productions' render={() => <ListProductions permissionsAccess={permissionsAccessProductions} />}></Route>
                        <Route path='/app/production' component={RegisterProductionView}></Route>
                        <Route path='/app/flavors'>
                            <FlavorRoutes permissionsAccess={permissionsAccessProductions} />
                        </Route>
                        <Route path='/app/flavorTypes'>
                            <FlavorTypeRoutes permissionsAccess={permissionsAccessProductions} />
                        </Route>
                    </>
            }

            // ------------------------------------ FRANCHISES --------------------------------------
            const permissionFranchises = permissions.find(option => option === "Franquicias");
            let franchises;
            if (permissionFranchises === "Franquicias") {
                let permissionsAccessFranchises = props.accesses[5]
                franchises =
                    <>
                        <Route path='/app/franchises' render={() => <Franchises permissionsAccess={permissionsAccessFranchises} />}></Route>
                        <Route path='/app/newFranchise' component={RegisterFranchise}></Route>
                    </>
            }

            // ---------------------------------- SALES REPORTS --------------------------------------
            let reportsSales;
            const permissionReportsSales = permissions.find(option => option === "Reportes Ventas");
            if (permissionReportsSales === 'Reportes Ventas') {
                let permissionsAccessSalesReports = props.accesses[6];
                reportsSales =
                    <>
                        <Route path='/app/salesReport' render={() => <SalesReports permissionsAccess={permissionsAccessSalesReports} />}></Route>
                        <Route path='/app/productSalesReport' render={() => <ProductSalesReport permissionsAccess={permissionsAccessSalesReports} />}></Route>
                    </>
            }

            const permissionReportsHumanResources = permissions.find(option => option === "Reportes Recursos Humanos");
            let reportHumanResources;
            if (permissionReportsHumanResources === "Reportes Recursos Humanos") {
                reportHumanResources =
                    <Route path='/app/RRHHReport' render={() => <RRHHReports permissionsAccess={permissionReportsHumanResources} />}></Route>
            }

            // -------------------------------------- PURCHASES -------------------------------------
            const permissionPurchases = permissions.find(option => option === "Compras")
            let purchases
            if (permissionPurchases === "Compras") {
                // let permissionAccessPurchases = props.accesses[2];
                purchases =
                    <>
                        <Route path='/app/purchaseSupplies' component={RegisterPurchaseSupplies}></Route>
                    </>
            }

            // ----------------------------------- EMPLOYEES -------------------------------------
            const permissionEmployees = permissions.find(option => option === "Empleados")
            let employees;
            if (permissionEmployees === "Empleados") {
                let permissionAccessEmployees = props.accesses[7];
                employees =
                    <>
                        <Route path='/app/employees' render={() => <EmployeesView permissionsAccess={permissionAccessEmployees} />}></Route>
                        <Route path='/app/licenses' render={() => <Licenses permissionsAccess={permissionAccessEmployees} />}></Route>
                        <Route path='/app/assistanceEmployees' render={() => <ListEmployeesAssistance permissionsAccess={permissionAccessEmployees} />}></Route>
                        <Route path='/app/advances' render={() => <ListAdvances permissionsAccess={permissionAccessEmployees} />}></Route>
                        <Route path='/app/employeesSchedules' render={() => <EmployeesSchedulesView permissionsAccess={permissionAccessEmployees} />}></Route>
                        <Route path='/app/registerEmployees' component={RegisterEmployee}></Route>
                        <Route path='/app/registerAssistance' component={RegisterAssistance}></Route>
                        <Route path='/app/registerAdvances' component={RegisterAdvances}></Route>
                        <Route path='/app/salary' render={() => <Salary permissionsAccess={permissionAccessEmployees} />}></Route>
                    </>
            }

            // ----------------------------------- USERS ---------------------------------------
            const permissionUser = permissions.find(option => option === "Usuarios")
            let permissionsAdministrator;
            if (permissionUser === "Usuarios") {
                let permissionAccessUsers = props.accesses[8];
                permissionsAdministrator =
                    <>
                        <Route path='/app/users' render={() => <ListUsers permissionsAccess={permissionAccessUsers} />}></Route>
                        <Route path='/app/registerUser' component={RegisterUser}></Route>
                    </>
            }

            return (
                <>
                    {products} {productions} {franchises} {reportsSales} {purchases} {employees} {permissionsAdministrator} {reportHumanResources}
                </>
            )
        }
        else if (validateRouting === false) return <NotPermissionPage />
        else return <SesionPage />
    };

    return (
        <div>{showOptionsWithPermissions()}</div>
    );
}

