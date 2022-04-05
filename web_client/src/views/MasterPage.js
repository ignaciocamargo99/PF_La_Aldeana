import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import Login from './LoginUser/Login';
import './MasterPage.css';
import RegisterProductView from './RegisterProduct/RegisterProductView';
import RegisterTypeProductView from './RegisterTypeProduct/RegisterTypeProductView';
import RegisterSupplyView from './RegisterSupply/RegisterSupplyView';
import '../assets/Footer.css';
import Cookies from 'universal-cookie';
import BeShowed from '../common/BeShowed';
import ListProducts from './ListProducts/ListProducts';
import RegisterFranchise from './Franchises/RegisterFranchise';
import Franchises from './Franchises/FranchiseTable';
import '../assets/Views.css';
import '../assets/Forms.css';
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
import ListPermissions from './Permissions/components/ListPermissions';
import ListUsers from './Users/ListUsers';

const cookies = new Cookies();

export default function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar options={cookies.get('permissions') === undefined ? ['Inicio'] : cookies.get('permissions')} />
      </header>
      <BrowserRouter>
        <div className="viewContainer">
          {(window.location.pathname === '/app/index' || window.location.pathname === '/' || window.location.pathname === '/index')
            ?
            <Route path='/' component={Login}></Route>
            :
            <BeShowed show={cookies.get('nick_user') !== undefined}>
              <Route path='/app/products' component={ListProducts}></Route>
              <Route path='/app/typeProducts' component={RegisterTypeProductView}></Route>
              <Route path='/app/newFranchise' component={RegisterFranchise}></Route>
              <Route path='/app/registerProducts' component={RegisterProductView}></Route>
              <Route path='/app/supplies' component={RegisterSupplyView}></Route>
              <Route path='/app/purchaseSupplies' component={RegisterPurchaseSupplies}></Route>
              <Route path='/app/production' component={RegisterProductionView}></Route>
              <Route path='/app/salesReport' component={SalesReport}></Route>
              <Route path='/app/employees' component={ListEmployees}></Route>
              <Route path='/app/employeesSchedules' component={EmployeesSchedulesView}></Route>
              <Route path='/app/registerEmployees' component={RegisterEmployee}></Route>
              <Route path='/app/licenses' component={Licenses}></Route>
              <Route path='/app/assistanceEmployees' component={ListEmployeesAssistance}></Route>
              <Route path='/app/registerAssistance' component={RegisterAssistance}></Route>
              <Route path='/app/advances' component={ListAdvances}></Route>
              <Route path='/app/registerAdvances' component={RegisterAdvances}></Route>
              <Route path='/app/franchises' component={Franchises}></Route>
              <Route path='/app/productions' component={ListProductions}></Route>
              {/* <Route path='/app/permissions' component={ListPermissions}></Route> */}
              <Route path='/app/users' component={ListUsers}></Route>
            </BeShowed>
          }
        </div>
      </BrowserRouter>
      <footer className="footer text-center">
        <Footer />
      </footer>
    </div>
  );
}
