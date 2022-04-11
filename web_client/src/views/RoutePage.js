import React from 'react';
import { Route } from 'react-router-dom';
import { decrypt } from '../utils/EncryptDecryptCookies/EncryptDecrypt';
import RegisterProductView from './RegisterProduct/RegisterProductView';
import RegisterTypeProductView from './RegisterTypeProduct/RegisterTypeProductView';
import RegisterSupplyView from './RegisterSupply/RegisterSupplyView';
import ListProducts from './ListProducts/ListProducts';
import RegisterFranchise from './Franchises/RegisterFranchise';
import Franchises from './Franchises/FranchiseTable';
import RegisterPurchaseSupplies from './RegisterPurchaseSupplies/RegisterPurchaseSupplies';
import RegisterProductionView from './Productions/RegisterProduction';
import SalesReport from './Reports/Sales/SalesReport';
import ListEmployees from './Employees/ListEmployees';
import RegisterEmployee from './Employees/components/RegisterEmployee';
import Licenses from './Licenses/components/Licenses';
import ListEmployeesAssistance from './EmployeeAssistance/ListEmployeeAssistance';
import RegisterAssistance from './EmployeeAssistance/components/RegisterAssistanceEmployee/RegisterAssistance';
import EmployeesSchedulesView from './EmployeesSchedules/EmployeesSchedulesView';
import ListAdvances from './Advances/ListAdvances';
import RegisterAdvances from './Advances/components/RegisterAdvances';
import ListProductions from './Productions/ListProductions';
import ListUsers from './Users/ListUsers';
import RegisterUser from './Users/components/RegisterUser';
import NotPermissionPage from '../common/NotPermissionPage';

export default function RouterPage(props) {

    const showOptionsWithPermissions = () => {
        let permissions = []
        props.options.forEach((option) => { permissions.push(decrypt(option)) })

        const permissionProducts = permissions.find(option => option === "Productos");
        let products;
        if (permissionProducts === "Productos") {
            products =
                <>
                    <Route path='/app/products' component={ListProducts}></Route>
                    <Route path='/app/registerProducts' component={RegisterProductView}></Route>
                    <Route path='/app/typeProducts' component={RegisterTypeProductView}></Route>
                    <Route path='/app/supplies' component={RegisterSupplyView}></Route>
                </>
        }

        const permissionProduction = permissions.find(option => option === "Producciones");
        let productions;
        if (permissionProduction === 'Producciones') {
            productions =
                <>
                    <Route path='/app/production' component={RegisterProductionView}></Route>
                    <Route path='/app/productions' component={ListProductions}></Route>
                </>
        }

        const permissionFranchises = permissions.find(option => option === "Franquicias");
        let franchises;
        if (permissionFranchises === "Franquicias") {
            franchises =
                <>
                    <Route path='/app/newFranchise' component={RegisterFranchise}></Route>
                    <Route path='/app/franchises' component={Franchises}></Route>
                </>
        }


        let reportsSales;
        const permissionReportsSales = permissions.find(option => option === "Reportes Ventas");
        if (permissionReportsSales === 'Reportes Ventas') {
            reportsSales =
                <Route path='/app/salesReport' component={SalesReport}></Route>
        }


        // else reportsSales = <NotPermissionPage />

        // const permissionReportsHumanResources = permissions.find(option => option === "Reportes Recursos Humanos");
        // let reportHumanResources;
        // if(permissionReportsHumanResources === "Reportes Recursos Humanos"){
        //     reportHumanResources = 

        // }

        const permissionPurchases = permissions.find(option => option === "Compras")
        let purchases
        if (permissionPurchases === "Compras") {
            purchases =
                <Route path='/app/purchaseSupplies' component={RegisterPurchaseSupplies}></Route>
        }


        const permissionEmployees = permissions.find(option => option === "Empleados")
        let employees;
        if (permissionEmployees === "Empleados") {
            employees =
                <>
                    <Route path='/app/employees' component={ListEmployees}></Route>
                    <Route path='/app/employeesSchedules' component={EmployeesSchedulesView}></Route>
                    <Route path='/app/registerEmployees' component={RegisterEmployee}></Route>
                    <Route path='/app/licenses' component={Licenses}></Route>
                    <Route path='/app/assistanceEmployees' component={ListEmployeesAssistance}></Route>
                    <Route path='/app/registerAssistance' component={RegisterAssistance}></Route>
                    <Route path='/app/advances' component={ListAdvances}></Route>
                    <Route path='/app/registerAdvances' component={RegisterAdvances}></Route>
                </>
        }


        const permission = permissions.find(option => option === "Usuarios")
        let permissionsAdministrator;
        if (permission === "Usuarios") {
            permissionsAdministrator =
                <>
                    <Route path='/app/users' component={ListUsers}></Route>
                    <Route path='/app/registerUser' component={RegisterUser}></Route>
                </>
        }


        // let pageNotPermission;

        // if (!products && !productions && !franchises && !reportsSales && !purchases && !employees && !permissionsAdministrator) {
        //     pageNotPermission = <NotPermissionPage />
        // }

        return (
            <>
                {products}
                {productions}
                {franchises}
                {reportsSales}
                {purchases}
                {employees}
                {permissionsAdministrator}
            </>
        )
    };


    return (
        <div>
            {showOptionsWithPermissions()}
        </div>
    );
}

